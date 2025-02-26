import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../components/Authentication/useUser";
import { useCartEntries } from "../components/Cart/useCartEntries";
import { useEffect } from "react";
import { setCartCount } from "../context/CartSlice";

function useCartCount() {
    const {cartCount} = useSelector((store) => store.cartStates)
    const {cartEntries, isEntriesLoading} = useCartEntries();
    const {user} = useUser();
    const dispatch = useDispatch();

    
    useEffect(() => {
        if(!cartEntries) return;
        const currentUserEntries = cartEntries?.filter((entry) => entry.userId === user?.id);
        const count = currentUserEntries?.reduce((acc, curr) => acc + curr.quantity, 0)
        dispatch(setCartCount(count));
    }, [dispatch, cartEntries, user])

    return {cartCount, isEntriesLoading}
}

export default useCartCount
