import { useEffect, useRef } from "react";
import { useNewAddress } from "./useNewAddress";
import { useUser } from "../Authentication/useUser";
import { useEditAddress } from "./useEditAddress";
import { usePinCodeData } from "../Cart/usePinCodeData";
import SpinnerMini from "../ui/SpinnerMini";
import Spinner from "../ui/Spinner";
import useFocus from "../../Hooks/useFocus";
import useBlur from "../../Hooks/useBlur";
import Input from "../ui/Input";
import FormRow from "../ui/FormRow";
import FormError from "../ui/FormError";

function AddressForm({editFormData = {}, setFormData, editId, onCloseModal}) {
    const pincodeRef = useRef(null);
    const ref = useRef([]);

    const {pincodeDataFn, isPinCodeLoading, data: pincodeData} = usePinCodeData();
    const {addNewAddressFn, isPending: isAddressAdding} = useNewAddress();
    const {user} = useUser();
    const {editAddress, isAddressEditing} = useEditAddress();

    const editSession = Boolean(editId);

    const {userName, userMobNo, houseNo, city, state, pincode, locality} = editFormData;

    //custom hooks for focus and blur
    useFocus(ref)
    useBlur(ref)

    // to get the pincode data for selected pincode
    useEffect(() => {
        function handleBlur(){
            const value = pincodeRef.current.value;
            const sibling = pincodeRef.current.nextElementSibling
            if(!value){
                if(sibling) sibling.classList.remove("hide");
            }
            if(value?.length === 6 ){
                pincodeDataFn(value, {
                    onSuccess: (data) => {
                        console.log("pincodeData", data)
                        if(editSession){
                            setFormData((prevData) => ({
                                ...prevData, city: data?.[0].PostOffice[0].Block, state: data?.[0].PostOffice[0].State
                            }))
                        }
                    }})
            }
        }
        const inputEle = pincodeRef.current
        if(inputEle){
            inputEle.addEventListener("blur", handleBlur)
        }

        return () => {
            if(inputEle){
                inputEle.removeEventListener("blur", handleBlur)
            }
        }

    }, [pincodeDataFn, setFormData, editSession])

    //to handle the change of input fields
    const handleChange = (e) => {
        if(!editSession) return null
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    //form submit for edit or new address
    function handleFormSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = [...formData.entries()].reduce((acc, [key, value]) => {
            acc[key] = value
            return acc;
        }, {})

        const {userName, userMobNo, pincode, houseNo, locality} = formValues;

        if(!userName || !userMobNo || !pincode || !houseNo || !locality) return null;

        const addressData = {
            userId: user?.id,
            userName: user?.user_metadata.fullName,
            address: formValues
        }
        if(editSession){
            editAddress({editData: {address: formValues}, id: editId}, {
                onSettled: () => {
                    onCloseModal();
                }
            })
        }else{
            addNewAddressFn(addressData, {
                onSettled: () => {
                    onCloseModal();
                }
            });
        }
    }

    return (
        <form className="new-address-form" onSubmit={handleFormSubmit}>
            <div className="address-header">
                <h3>Add New Address</h3>
            </div>
            <div className="address-contact-details">
                <label className="label-text">Contact Deatils</label>
                <FormRow>
                    <Input type="text" name="userName" placeholder="Name*" elRef={(el) => (ref.current[0] = el)} value={userName} onChange={handleChange}/>
                    <FormError>Required</FormError>
                </FormRow>

                <FormRow>
                    <Input type="text" name="userMobNo" placeholder="Mobile No*" elRef={(el) => (ref.current[1] = el)} value={userMobNo} onChange={handleChange}/>
                    <FormError>Required</FormError>
                </FormRow>
            </div>
            <div className="address-details">
                <label className="label-text">Address</label>

                <FormRow className="pincode-box">
                    <Input type="text" name="pincode" placeholder="Pincode*" elRef={pincodeRef} value={pincode} onChange={handleChange}/>
                    <FormError>Required</FormError>
                    {isPinCodeLoading && <SpinnerMini />}
                </FormRow>

                <FormRow>
                    <Input type="text" name="houseNo" placeholder="Address(House No, Building, Street, Area)*" elRef={(el) => (ref.current[2] = el)} value={houseNo} onChange={handleChange}/>
                    <FormError>Required</FormError>
                </FormRow>

                {!pincodeData ? (
                    <FormRow>
                    <Input type="text" name="locality" placeholder="Locality/Town*" elRef={(el) => (ref.current[3] = el)} value={locality} onChange={handleChange}/>
                    <FormError>Required</FormError>
                    </FormRow>
                ) : (
                <select id="locality-drpdwn" className="add-input-field" name="locality" placeholder="Locality/Town*">
                    {pincodeData?.[0].PostOffice.map((town, index) => 
                        <option key={index}>{town.Name}</option>
                        )}
                </select>
                )}

                <div className="add-city-state">
                    <FormRow>
                        <Input type="text" name="city" elRef={(el) => (ref.current[4] = el)} value={city ? city : pincodeData?.[0].PostOffice[0].Block || ""} placeholder="City/District*" readOnly />
                        <FormError>Required</FormError>
                    </FormRow>
                    
                    <FormRow>
                        <Input type="text" name="state" elRef={(el) => (ref.current[5] = el)} value={state? state : pincodeData?.[0]?.PostOffice[0].State || ""} placeholder="State*" readOnly/>
                        <FormError>Required</FormError>
                    </FormRow>
                </div>
            </div>
            <div className="add-new-add-btn">
                <button type="submit" id="new-add-submit-btn">
                    Add Address
                </button>
            </div>
            {(isAddressAdding || isAddressEditing) && <Spinner type="address"/>}
        </form>
    )
}

export default AddressForm
