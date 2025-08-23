import Modal from "../ui/Modal"
import AddressForm from "./AddressForm"
import { useAddreses } from "./useAddreses";
import { useUser } from "../Authentication/useUser";
import Spinner from "../ui/Spinner";
import AddressBox from "./AddressBox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../../context/CartSlice";

function AddressList() {
    // const {user} = useUser();
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store.cartStates);

    const currentUseradd = {field:"userId" , value: user?.id}
    const {addreses, isAddressLoading} = useAddreses(currentUseradd);

    if(isAddressLoading) return <Spinner />

    const defaultAddress = addreses?.[0]?.id;
    dispatch(setSelectAddress(defaultAddress));

    return (
        <div className="addressList-box">
            <Modal>
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
