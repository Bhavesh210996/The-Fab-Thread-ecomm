function CashOnDelivery({setCodRadioSelected}) {
    return (
        <div>
            <div className="cod-heading">
                Cash on Delivery (Cash/UPI)
            </div>
            <div className="cod-payment-option">
                <input type="radio" id="code-radio" value="cod" onChange={(e) => setCodRadioSelected(e.target.value)} aria-label="cash on delivery"/>
                <span>Cash On Delivery</span>
            </div>
        </div>
    )
}

export default CashOnDelivery
