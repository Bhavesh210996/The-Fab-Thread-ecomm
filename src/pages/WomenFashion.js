import Category from "../components/Category/Category"
import Banner from "../components/ui/Banner"

function WomenFashion() {
    return (
        <div className="menFashion-page">
            <Banner type="female"/>
            <div className="category-text">Shop By Category</div>
            <Category genderType="women"/>
        </div>
    )
}

export default WomenFashion
