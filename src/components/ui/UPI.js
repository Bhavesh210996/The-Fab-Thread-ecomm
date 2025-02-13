function UPI({setUpiRadioSelected, upiRadioSelected}) {
    return (
        <div className="upi-container">
            <span className="upi-heading">UPI</span>
            <div className="upi-radio-box">
                <div className="phonePay-radio radio-box">
                    <input type="radio" className="upi-radio" value="phonepay" checked={upiRadioSelected === "phonepay"} onChange={(e) => setUpiRadioSelected(e.target.value)}/>Phone Pay
                </div>
                <div className="googlePay-radio radio-box">
                    <input type="radio" className="upi-radio" value="googlepay" checked={upiRadioSelected === "googlepay"} onChange={(e) => setUpiRadioSelected(e.target.value)}/>Google Pay
                </div>
            </div>
        </div>
    )
}

export default UPI
