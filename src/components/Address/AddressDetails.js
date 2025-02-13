function AddressDetails({addressDetails}) {
    const {userName, houseNo, city, state, pincode, userMobNo, locality} = addressDetails;
    return (
        <>
            <div className="display-add-details">
                <div className="userName">{userName}</div>
                    <div className="address-details">
                        {houseNo}, {locality}
                    </div>
                <span>{city}, {state} - </span>
                <span>{pincode}</span>
            </div>
            <div className="display-contact-details">
                <span>Mobile No:</span>
                <span>{userMobNo}</span>
            </div>
        </>
    )
}

export default AddressDetails
