import { useParams } from "react-router-dom";
import { useOrders } from "./useOrders";
import OrderBox from "../ui/OrderBox";
import Spinner from "../ui/Spinner";
import ShippingAddress from "./ShippingAddress";
import OrderPriceTotal from "./OrderPriceTotal";

function OrderedItems() {
    const {orderId} = useParams();
    const {orders, isLoading} = useOrders();
    
    if(isLoading) return <Spinner />

    const latestOrder = orders?.filter((order) => order.orderid === orderId)
    
    return (
        <>
            <div className="orderedItemsList">
                {latestOrder?.map((order) => <OrderBox key={order.id} order={order} />)}
            </div>
            <hr className="line-sep"/>
            <ShippingAddress order={latestOrder?.[0]}/>
            <hr className="line-sep"/>
            <OrderPriceTotal order={latestOrder}/>
        </>
    )
}

export default OrderedItems
