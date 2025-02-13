function Banner({type}) {
    var bannerImg;
    bannerImg = type === "male" ? "fashion-banner-men.jpg" : "female-banner.webp"
    return (
        <div className="offer-banner">
            <img src={bannerImg} className="banner-img" alt="offer" />
        </div>
    )
}

export default Banner
