import toast from "react-hot-toast";
import { useUser } from "../Authentication/useUser";
import { useOrderRating } from "../Orders/useOrderRating";
import { useSetItemRating } from "../Product/useSetItemRating";
import Rating from "./Rating";
import { useQueryClient } from "@tanstack/react-query";

function OrderBox({order}) {
    const {id: orderId, productDetails, userRating, productId} = order;
    const {user} = useUser();
    const queryClient = useQueryClient();

    const {brand, itemName, size, quantity, price, itemImage} = productDetails;
    
    const {giveRatingFn, isPending} = useOrderRating();
    const {setItemRatingFn, isRating} = useSetItemRating();
    
    //pushing rating to order as well as product level
    function setUserRating(rating){
        let itemRatingData = {
            userId: user.id,
            rating: rating,
            userName: user.user_metadata.fullName,
        }
        const orderRatingData = {
            orderRating: rating,
            orderReview: userRating?.orderReview,
            date: userRating?.date
        }
        giveRatingFn({userRating: orderRatingData, id: orderId})
        setItemRatingFn({userRating: itemRatingData, id: productId})
    }
    
    function setUserReview(review){
        let itemRatingData = {
            userId: user.id,
            review: review ? review : "",
            date: new Date()
        }
        const orderRatingData = {
            orderRating: userRating?.orderRating,
            orderReview: review,
            date: new Date()
        }
        giveRatingFn({userRating: orderRatingData, id: orderId})
        setItemRatingFn({userRating: itemRatingData, id: productId}, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["orders"]
                })
                toast.success("Your review is submitted successfully")

            }
        })
    }

    return (
        <div className="order-box">
            <div className="item-img-box">
                <img src={itemImage ? itemImage : "imgNotFound.webp"} alt="itemImage" />
            </div>
            <div className="item-details-box">
                <div className="cart-itemName-info">
                    <span className="cart-brand">{brand}</span>
                    <span className="cart-name">{itemName}</span>
                </div>
                <div className="cart-size-quantiy">
                    <div className="cart-item-size">
                        Size: {size}
                    </div>
                    <div className="cart-item-qty">
                        Qty: {quantity}
                    </div>
                </div>
                <div className="cart-item-PriceBox">
                    <span className="cart-item-price">Price: Rs.{price}</span>
                </div>
                <Rating onSetRating={setUserRating} onSetReview={setUserReview} userRating={userRating}/>
            </div>
        </div>
    )
}

export default OrderBox
