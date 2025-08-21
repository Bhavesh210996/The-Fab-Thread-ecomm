import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
function OfferBanner() {
    const navigate = useNavigate()
    return (
        <div className="homepage-offer-banner">
            <img src="home-banner.webp" className="img-banner" width={1200} height={500} alt="offer" />
            <div className="him-container" onClick={() => navigate("/men")}></div>
            <div className="him-box">
                <button type="button" className="him-btn" onClick={() => navigate("/men")}>
                    <span>Him</span>
                    <FcBusinessman />
                </button>
            </div>
            <div className="her-container" onClick={() => navigate("/women")}></div>
            <div className="her-box">
                <button type="button" className="her-btn" onClick={() => navigate("/women")}>
                    <span>Her</span>
                    <FcBusinesswoman />
                </button>
            </div>
        </div>
    )
}

export default OfferBanner
