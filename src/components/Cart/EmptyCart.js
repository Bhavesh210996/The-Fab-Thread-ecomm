const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <img src="/shopping-cart.webp" className="empty-cart-img" alt="empty cart" />
            <span>Your cart is empty. Lets add some items</span>
        </div>
    )
}

export default EmptyCart;