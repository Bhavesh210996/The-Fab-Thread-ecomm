import { useState } from "react"

import CartPriceBox from "../components/Cart/CartPriceBox"
import PaymentSection from "../components/Payment/PaymentSection";

function Payment() {
    const [totalCartPrice, setTotalCartPrice] = useState();

    return (
        <div className="payment-page mobile-mainContent">
            <div className="payment-container">
                <PaymentSection totalCartPrice={totalCartPrice}/>
                <CartPriceBox type="order" setTotalCartPrice={setTotalCartPrice}/>
            </div>
        </div>
    )
}

export default Payment
