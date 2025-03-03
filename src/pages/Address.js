
import AddressList from "../components/Address/AddressList"
import CartPriceBox from "../components/Cart/CartPriceBox"
import "../components/Cart/cart.css"

function Address() {
    return (
        <div className="address-page mobile-mainContent">
            <div className="address-container">
                <AddressList />
                <CartPriceBox type="payment"/>
            </div>
        </div>
    )
}

export default Address
