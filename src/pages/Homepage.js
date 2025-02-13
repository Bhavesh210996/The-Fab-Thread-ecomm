import Category from "../components/Category/Category"
import OfferBanner from "../components/ui/OfferBanner"

function Homepage() {
    return (
        <div className="homepage">
            <OfferBanner />
            <div className="category-text">Shop By Category</div>
            <Category />
        </div>
    )
}

export default Homepage
