import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";

import { useDeletingEntry } from "./useDeletingEntry";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useAddToCart } from "./useAddToCart";
import SpinnerMini from "../ui/SpinnerMini";
import PriceBox from "../ui/PriceBox";
import useInView from "../../Hooks/useInView";

const CartEntry = memo(function CartEntry({item}) {
    const [itemQuantity, setItemQuantity] = useState(1)
    const queryClient = useQueryClient();
    const [ref, hasBeenInView] = useInView({ threshold: 0.2})
    const {id:itemId, productSize, quantity, products} = item;
    const {id, size, itemName, brand, price, discount, discountPrice, itemImage, itemType} = products;
    const {addToCartFn, isAddingCart} = useAddToCart();
    const {deleteEntry, isDeleting} = useDeletingEntry();

    const availableQty = Object.entries(size).find(([key, qty]) => key === productSize)?.[1];

    const productUrl = `/${itemType}/${brand}/${itemName.replace(/ /g, '-')}/${id}`;

    useEffect(() => {
        setItemQuantity(quantity)
    }, [quantity])

    const increaseQty = () => {
        setItemQuantity(() => itemQuantity + 1)
        addToCartFn({entry: {quantity: itemQuantity + 1}, id: itemId})
    }
    const decreaseQty = () => {
        setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1))
        if(itemQuantity > 1)
        addToCartFn({entry: {quantity: itemQuantity - 1}, id: itemId})
    }
    const handleDelete = () => {
        deleteEntry({id:itemId}, {onSuccess: () => {
            toast.success("Item is removed from your cart")
            queryClient.invalidateQueries({
                queryKey: ["entries"]
            })
        }})
    }

    return (
        <div className={`cart-entry ${hasBeenInView ? "visible" : ""}`} ref={ref}>
            <div className="item-img-box">
                <img src={itemImage ? itemImage : "imgNotFound.webp"} alt="itemImage" />
            </div>
            <div className="item-details-box">
                <div className="cart-itemName-info">
                    <span className="cart-brand">{brand}</span>
                    <Link to={productUrl} className="cart-name">{itemName}</Link>
                </div>
                <div className="cart-size-quantiy">
                    <div className="cart-item-size">
                        Size: {productSize}
                    </div>
                    <div className="cart-item-qty">
                        <button type="button" className="qty-minus-btn qty-update-btn" onClick={decreaseQty}>
                            -
                        </button>
                        {!isAddingCart ? <input type="text" className="qty-input-field" value={itemQuantity} disabled/> : <SpinnerMini />}
                        <button type="button" className="qty-plus-btn qty-update-btn" onClick={increaseQty} disabled={itemQuantity === availableQty}>
                            +
                        </button>
                    </div>
                </div>

                <PriceBox type="cart" price={price} discountPrice={discountPrice} discount={discount}/>
            
                <div className="item-return-text">
                    14 Days return available
                </div>
            </div>
            <Modal>
                <div className="remove-item">
                    <Modal.Open opens="delete">
                        <button type="button" className="cross-btn"> <HiMiniXMark /> </button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete resourceName="Item" onConfirm={handleDelete} disabled={isDeleting} spinner={isDeleting}/>
                    </Modal.Window>
                </div>
            </Modal>
        </div>
    )
})

export default CartEntry
