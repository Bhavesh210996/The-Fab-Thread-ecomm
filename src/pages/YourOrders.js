import { useUser } from "../components/Authentication/useUser";
import { useOrders } from "../components/Orders/useOrders"
import Spinner from "../components/ui/Spinner";
import OrderBox from "../components/ui/OrderBox";
import "../style/orders.css"

function YourOrders() {
    const {orders, isLoading} = useOrders();
    const {user} = useUser();
    const currentUserOrders = orders?.filter((order) => order.userId === user?.id);

    if(isLoading) return <Spinner />

    return (
        <div className="orders-page mobile-mainContent">
            <div className="orders-container">
                <div className="orders-headline">
                    <h2>Orders & Returns</h2>
                </div>
                <div className="orders-list">
                    {currentUserOrders.map((order) => <OrderBox key={order.id} order={order} />)}
                </div>
            </div>
        </div>
    )
}

export default YourOrders
