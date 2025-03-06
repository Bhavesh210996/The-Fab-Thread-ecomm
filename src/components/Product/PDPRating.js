import RatingBar from "./RatingBar";

function PDPRating({productData}) {
    const {userRatings} = productData;

    const noOfRating = userRatings?.length;
    const totalRating = userRatings?.reduce((acc, curr) => acc + Number(curr.rating), 0);
    const avgRating = Math.ceil((totalRating / noOfRating) * 10) / 10

    
    const oneStar = userRatings?.filter((star) => star.rating === 1).length;
    const twoStar = userRatings?.filter((star) => star.rating === 2).length;
    const threeStar = userRatings?.filter((star) => star.rating === 3).length;
    const fourStar = userRatings?.filter((star) => star.rating === 4).length;
    const fiveStar = userRatings?.filter((star) => star.rating === 5).length;
    const ratingLevelArray = {
        1: oneStar,
        2: twoStar,
        3: threeStar,
        4: fourStar,
        5: fiveStar,
    }
    
    return (
        <div className="pdp-rating-section">
            <div className="ave-rating-container">
                <div className="avg-rating-box">
                    <span className="avg-rating">{avgRating}</span>
                    <span>
                    <svg
                        className="avg-rating-star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#fcc419"
                        stroke="#fcc419"
                        >
                        <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    </span>
                </div>
                <div className="total-buyers">{noOfRating} Buyers</div>
            </div>
            <div className="line-separator"></div>
            <div className="ratingBar-container">
                {Object.entries(ratingLevelArray).reverse().map(([key, value]) => <RatingBar key={key}  ratingLevel={key} ratingValue={value} totalNoOfRating={noOfRating}/>)}
            </div>
        </div>
    )
}

export default PDPRating
