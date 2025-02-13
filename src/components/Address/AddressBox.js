import { useEffect, useState } from "react";
import { useSelectedAddress } from "../../context/SelectAddressContextApi"
import Modal from "../ui/Modal";
import AddressForm from "./AddressForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useRemoveAddress } from "./useRemoveAddress";
import AddressDetails from "./AddressDetails";

function AddressBox({address, defaultAddress}) {
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState();

    const {selectedAddress, setSelectAddress} = useSelectedAddress();
    const {deletetingAddressFn, isDeleting} = useRemoveAddress();

    const addressDetails = address?.address

    useEffect(() => {
        if(address){
            setFormData(address?.address)
            setEditId(address.id)
        }
    }, [address])

    function handleRemoveAddress(){
        deletetingAddressFn(address.id);
    }

    return (
        <div className="addressBlock">
            <div>
                <input type="radio" className="address-radio" checked={selectedAddress ? Number(selectedAddress) === address.id : false} value={address.id} onChange={() => setSelectAddress(address.id)}/>
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
