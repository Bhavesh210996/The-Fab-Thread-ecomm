import RatingWrapper from "../ui/RatingWrapper";

function UserReviewBox({review}) {
    const {rating, review: userReview, userName, date} = review;

    if(!userReview) return null;

    return (
        <div className="pdp-review-row">
            <RatingWrapper rating={rating} />
            <div className="user-review-msg">
                <span className="review-text">{userReview}</span>
                {userName && <div>
                    <span className="user-name">{userName}</span>
                    <span className="reviw-separator">|</span>
                    <span className="review-date">{date?.split("T")[0]}</span>
                </div>}
            </div>
        </div>
    )
}

export default UserReviewBox
