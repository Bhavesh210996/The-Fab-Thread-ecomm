import { useAddreses } from "../Address/useAddreses"
import { useUser } from "../Authentication/useUser";
import Spinner from "../ui/Spinner";

function SelectPincode({setSelectedPin, selectedPin, onCloseModal}) {
    const {user} = useUser();
    const currentUseradd = {field:"userId" , value: user?.id}
    const {addreses, isAddressLoading} = useAddreses(currentUseradd);

    if(isAddressLoading) return <Spinner />
    // const {address} = addreses;

    return (
        <section className="pdp-address-container">
            <header className="address-title">
                Use pincode to check delivery info
            </header>
            <div className="address-pincode-input">
                <input className="pincode-input" placeholder="Enter a Pin code" />
            </div>
            <div className="or-text"><span>OR</span></div>
            <header className="address-title">
                Select a saved address to check delivery info
            </header>
            <ul className="address-list">
                {addreses.map((adres) => (
                    <li className="address-row" key={adres.id} onClick={() => {setSelectedPin(adres.id); onCloseModal()}}>
                        <div className="address-row-title">{adres.address.userName}, {adres.address.pincode}</div>
                        <br/>
                        <p className="pdp-address-details">
                            {adres.address.houseNo}
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={selectedPin === adres.id ? "#FF3F6C" : "#D4D5D9"} class="svg-tick-icon">
                            <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>

                    </li>
                ))}
            </ul>
        </section>
    )
}

export default SelectPincode




