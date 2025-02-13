import Category from "../components/Category/Category"
import "../components/Category/category.css"
import Banner from "../components/ui/Banner"

function MenFashion() {
    return (
        <div className="menFashion-page">
            <Banner type="male" />
            <div className="category-text">Shop By Category</div>
            <Category genderType="men"/>
        </div>
    )
}

export default MenFashion
