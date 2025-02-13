import FilterBox from "../../components/ui/FilterBox"
import ProductBox from "../../components/Product/ProductBox"
import "../../components/Product/products.css"

function MensCasualWear() {
    return (
        <div className="category-page">
            <FilterBox />
            <ProductBox />
        </div>
    )
}

export default MensCasualWear
