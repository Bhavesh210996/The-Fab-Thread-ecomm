import { Link } from "react-router-dom"

function ProductCard({item}) {
    const {id, itemName, itemImage, brand, price, discountPrice, discount, itemType, userRatings} = item;

    const totalRating = userRatings?.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = Math.ceil((totalRating / userRatings?.length) * 10) / 10;
    
    const productUrl = `/${itemType}/${brand}/${itemName.replace(/ /g, '-')}/${id}`;

    return (
        <div className="item-column">
            <Link className="item-url" to={productUrl}>
                <img src={itemImage ? itemImage : "imgNotFound.webp"} alt={itemName} />
                <span className="item-brand">{brand}</span>
                <span className="item-name">{itemName}</span>
                <div className="itemPriceBox">
                    <span className="item-price">Rs.{price}</span>
                    <span className="item-discountPrice">Rs.{discountPrice}</span>
                    <span className="item-discount">({discount})</span>
                </div>
                {userRatings?.length && <div className="rating-wrapper">
                    <span className="avg-rating">{avgRating}</span>
                    <svg
                        className="rating-level-star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#fcc419"
                        stroke="#fcc419"
                        >
                        <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                </div>}
            </Link>
        </div>
    )
}

export default ProductCard
