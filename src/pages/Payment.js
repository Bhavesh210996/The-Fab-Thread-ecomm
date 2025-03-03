import { useEffect, useState } from "react"

import CartPriceBox from "../components/Cart/CartPriceBox"
import PaymentSection from "../components/Payment/PaymentSection";

function Payment() {
    const [totalCartPrice, setTotalCartPrice] = useState();

    useEffect(() => {
        document.querySelector(".mobile-search-box")?.classList.add("hide");
    }, [])

    return (
        <div className="payment-page">
            <div className="payment-container">
                <PaymentSection totalCartPrice={totalCartPrice}/>
                <CartPriceBox type="order" setTotalCartPrice={setTotalCartPrice}/>
            </div>
        </div>
    )
}

export default Payment
