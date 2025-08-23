import AddressDetails from "../Address/AddressDetails"

function ShippingAddress({order}) {
    const addressDetails = order?.address || {};
    return (
        <div className="ship-payment-container">
            <div className="shipping-box">
                <h3>Shipping Address</h3>
                {Object.keys(addressDetails).length > 0 && <AddressDetails  addressDetails={addressDetails}/>}
            </div>
            <div className="paymentMethod-box">
                <h3>Payment Method</h3>
                <div className="payment-type">
                    {order?.paymentMethod === "cod" ? "Cash on delivery" : order?.paymentMethod}
                </div>
            </div>
        </div>
    )
}

export default ShippingAddress
