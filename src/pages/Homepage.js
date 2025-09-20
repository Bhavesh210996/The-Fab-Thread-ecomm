import Category from "../components/Category/Category"
import OfferBanner from "../components/ui/OfferBanner"

function Homepage() {
    return (
        <div className="homepage mobile-mainContent">
            <div className="top-canvas-container">
                <div className="homepage-welcome-note">
                    <span className="homepage-welcome-text">
                        Stay ahead of the trends with <span className="fab-text">Fab</span>Thread!
                    </span>
                    <span className="text-home firstLine">Your One-Stop Destination for Trendy & Timeless Fashion!</span>
                    <span className="text-home secondLine">Shop the latest styles with ease and elegance.</span>
                </div>
            </div>
            <OfferBanner />
            <div className="category-text">Shop By Category</div>
            <Category />
        </div>
    )
}

export default Homepage
