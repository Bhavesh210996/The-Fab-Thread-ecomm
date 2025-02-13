import Button from "./Button"

function ReviewBox({reviewRef, handleReview, onCloseModal, orderReview}) {
    return (
        <div className="review-section">
            <span className="review-title">Write review</span>
            <div className="review-product-info-box">
                <div className="review-product-img">
                    <img src="" alt="" />
                </div>
                <div className="review-product-title">
                    <span></span>
                    <div className="ratingStars"></div>
                </div>
            </div>
            <div className="review-text-box">
                <textarea className="review-text-area" ref={reviewRef} placeholder="Please write product review here">{orderReview}</textarea>
            </div>
            <div className="review-submit-btn-box">
                <Button onClick={() => {handleReview(); onCloseModal()}}>Submit</Button>
            </div>
            
        </div>
    )
}

export default ReviewBox
