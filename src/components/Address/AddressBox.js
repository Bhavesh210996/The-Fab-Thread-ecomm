import { useEffect, useState } from "react";
import { useSelectedAddress } from "../../context/SelectAddressContextApi"
import Modal from "../ui/Modal";
import AddressForm from "./AddressForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useRemoveAddress } from "./useRemoveAddress";
import AddressDetails from "./AddressDetails";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../../context/CartSlice";

function AddressBox({address, defaultAddress}) {
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState();
    const dispatch = useDispatch();

    // const {selectedAddress, setSelectAddress} = useSelectedAddress();
    const {selectedAddress} = useSelector((store) => store.cartStates)
    const {deletetingAddressFn, isDeleting} = useRemoveAddress();

    const addressDetails = address?.address

    useEffect(() => {
        if(address){
            setFormData(address?.address)
            setEditId(address.id)
        }
    }, [address])

    const handleSelectAddress = (e) => {
        dispatch(setSelectAddress(e.target.value));
    }

    function handleRemoveAddress(){
        deletetingAddressFn(address.id);
    }

    return (
        <div className="addressBlock">
            <div>
                <input type="radio" className="address-radio" 
                    checked={Number(selectedAddress) === address.id} 
                    value={address.id} 
                    onChange={handleSelectAddress}
                    aria-label="Select address"
                />
            </div>
            <div>
                <AddressDetails addressDetails={addressDetails} />
                <Modal>
                    {Number(selectedAddress) === address.id && 
                        <div className="edit-remove-btn-box">
                            <Modal.Open opens="edit">
                                <button type="button" className="edit-btn">Edit</button>
                            </Modal.Open>

                            <Modal.Open opens="remove">
                                <button type="button" className="remove-btn">Remove</button>
                            </Modal.Open>

                            <Modal.Window name="edit">
                                <AddressForm editFormData={formData} setFormData={setFormData} editId={editId}/>
                            </Modal.Window>
                            <Modal.Window name="remove">
                                <ConfirmDelete resourceName="ADDRESS" onConfirm={handleRemoveAddress} disabled={isDeleting} spinner={isDeleting}/>
                            </Modal.Window>
                        </div>
                    }
                </Modal>
            </div>
        </div>
    )
}

export default AddressBox
