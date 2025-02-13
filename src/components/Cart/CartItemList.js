import CartEntry from "./CartEntry";

function CartItemList({currentUserEntries}) { 
    return (
        <div className="cartItem-box">
            <div className="cartItem-list">
                <div>
                    {currentUserEntries.map((item) => <CartEntry key={item.id} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default CartItemList
