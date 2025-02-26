import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import FilterBox from "../../components/ui/FilterBox";
import ProductBox from "../../components/Product/ProductBox";
import "../../components/Product/products.css";
import { productsLoading } from "../../context/ProductsSlice";

function ProductListingPage() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    //Filter
    const brandParam = searchParams.get("brand")?.split("%");
    const colorParam = searchParams.get("color")?.split("%");
    const filters = [];

    if(brandParam){
        filters.push({field: "brand", value: brandParam})
    }
    if(colorParam){
        filters.push({field: "color", value: colorParam})
    }
    useEffect(() => {
        dispatch(productsLoading(filters))
    }, [filters])

    return (
        <div className="category-page">
            <FilterBox />
            <ProductBox />
        </div>
    )
}

export default ProductListingPage
