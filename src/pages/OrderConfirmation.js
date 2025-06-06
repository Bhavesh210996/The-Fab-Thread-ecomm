import { useParams } from "react-router-dom";
import OrderedItems from "../components/Orders/OrderedItems";
import "../components/Orders/OrderSummery.css";
import "../components/Cart/cart.css";
import { useEffect } from "react";

function OrderConfirmation() {
    const {orderId} = useParams();
    useEffect(() => {
        document.querySelector(".mobile-search-box")?.classList.add("hide");
    }, [])
    return (
        <div className="orderSummery-page">
            <div className="order-heading-container">
                <p className="title">It's on the way!</p>
                <p className="order-num">Your order #{orderId} has shipped and will be with you soon.</p>
                <OrderedItems />
            </div>
        </div>
    )
}

export default OrderConfirmation
