import { createContext, useContext, useEffect, useState } from "react";
import { useCartEntries } from "../components/Cart/useCartEntries";
import Spinner from "../components/ui/Spinner";
import { useUser } from "../components/Authentication/useUser";

const CartEntryCountContextApi = createContext();

function CartEntryCountProvider({children}){
    const [cartCount, setCartCount] = useState(0);
    const {cartEntries, isEntriesLoading} = useCartEntries();
    const {user} = useUser();

    const currentUserEntries = cartEntries?.filter((entry) => entry.userId === user?.id);

    useEffect(() => {
        const count = currentUserEntries?.reduce((acc, curr) => acc + curr.quantity, 0)
        setCartCount(count);
    }, [currentUserEntries])

    if(isEntriesLoading) return <Spinner />
    return (
        <CartEntryCountContextApi.Provider value={{cartCount, setCartCount}} >
            {children};
        </CartEntryCountContextApi.Provider>
    )
}

function useCartCount(){
    const context = useContext(CartEntryCountContextApi)
    if(context === undefined) throw new Error("Context was used outside provider");
    return context;
}

export {CartEntryCountProvider, useCartCount};