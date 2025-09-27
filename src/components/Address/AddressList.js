import Modal from "../ui/Modal"
import AddressForm from "./AddressForm"
import { useAddreses } from "./useAddreses";
import Spinner from "../ui/Spinner";
import AddressBox from "./AddressBox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../../context/CartSlice";
import { useEffect } from "react";

function AddressList() {
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store.cartStates);

    const currentUseradd = {field:"userId" , value: user?.id}
    const {addreses, isAddressLoading} = useAddreses(currentUseradd);

    
    const defaultAddress = addreses?.[0]?.id;

    useEffect(() => {
        dispatch(setSelectAddress(defaultAddress));
    }, [defaultAddress, dispatch])
    
    if(isAddressLoading) return <Spinner />

    return (
        <div className="addressList-box">
            <Modal initialOpen={!addreses || addreses.length <= 0 ? "newadd" : ""}>
                <div className="add-new-address-box">
                    <h3>Select Delivery Address</h3>
                    <Modal.Open opens="newadd">
                        <button type="button" id="addNewAddress">Add New Address</button>
                    </Modal.Open>
                </div>
                <Modal.Window name="newadd">
                    <AddressForm />
                </Modal.Window>
            </Modal>

            <div className="address-list-box">
                {addreses.map((address) => <AddressBox key={address.id} address={address} defaultAddress={defaultAddress}/>)}
            </div>
        </div>
    )
}

export default AddressList
