import UserReviewBox from "./UserReviewBox"

function PDPReview({productData}) {
    
    const customerReviews = productData.userRatings.filter((review) => review.review !== "").length;

    if(!customerReviews) return null;
    return (
        <div className="pdp-reviws-container">
            <div className="pdp-review-photos-box">

            </div>
            <div className="pdp-reviews-list">
                <span className="reviewList-title">Customer Reviews({productData?.userRatings.length})</span>
                {productData?.userRatings.map((review, index) => <UserReviewBox key={index} review={review}/>)}
            </div>
        </div>
    )
}

export default PDPReview
