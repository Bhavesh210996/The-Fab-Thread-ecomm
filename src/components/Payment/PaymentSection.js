import { useState } from "react";
import Button from "../ui/Button"
import CashOnDelivery from "../ui/CashOnDelivery"
import CreditDebitCard from "../ui/Credit-Debit-Card"
import UPI from "../ui/UPI"
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { useSelectedAddress } from "../../context/SelectAddressContextApi";
import { useAddreses } from "../Address/useAddreses";
import { useCartEntries } from "../Cart/useCartEntries";
import { useCreateOrders } from "../Cart/useCreateOrders";
import { useDeletingEntry } from "../Cart/useDeletingEntry";
import { useOrders } from "../Orders/useOrders";
import { useNavigate } from "react-router-dom";
import { HiBanknotes, HiCreditCard } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../../context/CartSlice";

function PaymentSection({totalCartPrice}) {
    const [selectedOption, setSelectedOption] = useState("cod");
    const [codRadioSelcted, setCodRadioSelected] = useState("");
    const [upiRadioSelected, setUpiRadioSelected] = useState("");
    const [isCardData, setIsCardData] = useState(false);
    const navigate  = useNavigate();
    const queryClient = useQueryClient();

    // const {user} = useUser();
    const {user} = useSelector((store) => store.cartStates);
    // const {selectedAddress, setSelectAddress} = useSelectedAddress();
    const {selectedAddress} = useSelector((store) => store.cartStates)
    const dispatch = useDispatch();

    const {orders, isLoading} = useOrders();
    const {addreses} = useAddreses();
    const findSelectedAddress = addreses?.filter((addreses) => addreses.id === Number(selectedAddress));

    const {cartEntries, isEntriesLoading} = useCartEntries();
    const {createNewOrder, isPending} = useCreateOrders();
    const {deleteEntry} = useDeletingEntry();

    const userEntries = cartEntries?.filter((entry) => entry.userId === user.id);

    const generateOrderNumber = () => {
        const lastOrder = orders.length > 0 ? Number(orders.length) + 1000 : 1000;
        const newOrder = Number(lastOrder) + 1;
        return `ORD${newOrder}`;
    }

    function handlePlaceOrder(e){
        if(!codRadioSelcted && !upiRadioSelected && !isCardData) return null;
        e.preventDefault();
        const orderNumber = generateOrderNumber();
        const paymentOptSelected = selectedOption === "cod" ? selectedOption :
                                    selectedOption === "upi" ? upiRadioSelected :
                                    selectedOption === "card" ? selectedOption : null;
        let orderdataArray = []
        userEntries.forEach((entry) => {
        const orderdata = {
            userId: user?.id,
            address: findSelectedAddress?.[0]?.address,
            productDetails: {
                itemName: entry.products.itemName,
                brand: entry.products.brand,
                color: entry.products.color,
                gender: entry.products.gender,
                itemType: entry.products.itemType,
                quantity: entry.quantity,
                size: entry.productSize,
                price: entry.products.price,
                discountPrice: entry.products.discountPrice,
                itemImage: entry.products.itemImage
            },
            productId:entry.productId,
            totalPrice: totalCartPrice,
            paymentMethod: paymentOptSelected,
            isPaid: selectedOption === "cod" ? false : true,
            orderid: orderNumber
        }
        orderdataArray.push(orderdata)
        })
        const entries = {field: "userId", value: user?.id}
        deleteEntry({id: "", entries}, {onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["entries"]
            })
        }})
        createNewOrder(orderdataArray, {
            onSuccess: (data) => {
                queryClient.setQueryData(["orders"], data)
                navigate(`/orderConfirmation/${orderNumber}`);
            }});
        dispatch(setSelectAddress(""));
    }

    return (
        <div className="paymentOptions-block table-base-bar">
            <div className="tabs-block">
                <div id="cod" className={`tabLabel ${selectedOption === "cod" ? "tab-selected" : ""}`} onClick={() => {setSelectedOption("cod"); setIsCardData(false); setUpiRadioSelected("")}}>
                    <HiBanknotes />
                    <p>Cash on delivery (Cash/UPI)</p>
                </div>
                <div id="upi" className={`tabLabel ${selectedOption === "upi" ? "tab-selected" : ""}`} onClick={() => {setCodRadioSelected(""); setIsCardData(false); setSelectedOption("upi")}}>
                    <img src="UPI-color.png" className="upi-img" alt="UPI" />
                    <p>UPI (Pay via any app)</p>
                </div>
                <div id="card" className={`tabLabel ${selectedOption === "card" ? "tab-selected" : ""}`} onClick={() => {setCodRadioSelected(""); setUpiRadioSelected(""); setSelectedOption("card")}}>
                    <HiCreditCard />
                    <p>Credit/Debit Card</p>
                </div>
            </div>
            <div className="content-block">
                {selectedOption === "cod" && <CashOnDelivery setCodRadioSelected={setCodRadioSelected}/>}
                {selectedOption === "upi" && <UPI setUpiRadioSelected={setUpiRadioSelected} upiRadioSelected={upiRadioSelected}/>}
                {selectedOption === "card" && <CreditDebitCard setIsCardData={setIsCardData}/>}

                {(codRadioSelcted || upiRadioSelected || isCardData) && 
                    <div className="placeOrder-btn-block">
                        <Button type="cart" onClick={handlePlaceOrder}>{!isCardData && !upiRadioSelected ? "Place Order" : "Pay Now"}</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PaymentSection
