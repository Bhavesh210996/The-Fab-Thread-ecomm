import { useUser } from "../components/Authentication/useUser";
import "../components/Cart/cart.css"
import CartItemList from "../components/Cart/CartItemList"
import CartPriceBox from "../components/Cart/CartPriceBox"
import EmptyCart from "../components/Cart/EmptyCart";
import { useCartEntries } from "../components/Cart/useCartEntries";
import Spinner from "../components/ui/Spinner";
function Cart() {
    const {cartEntries, isEntriesLoading} = useCartEntries();
    const {user} = useUser();

    if(isEntriesLoading) return <Spinner />

    const currentUserEntries = cartEntries.filter((entry) => entry.userId === user.id);

    return (
        <div className="cart-page mobile-mainContent">
            <div className="cart-container">
                {currentUserEntries.length > 0 ? 
                    (
                        <>
                            <CartItemList currentUserEntries={currentUserEntries}/>
                            <CartPriceBox type="address"/>
                        </>
                    ) : (
                       <EmptyCart />
                    )
                }
            </div>
        </div>
    )
}

export default Cart
