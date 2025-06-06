import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useResponsiveQuery } from "../../context/MediaQueryContextApi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import "../../components/Product/products.css";
import "../../components/Category/category.css";
import FilterBox from "../../components/ui/FilterBox";
import ProductBox from "../../components/Product/ProductBox";
import { productsLoading } from "../../context/ProductsSlice";
import MobileFilterBox from "../../components/Product/MobileFilterBox";
import { toggleFilterSideBar } from "../../context/CartSlice";

function ProductListingPage() {
    const dispatch = useDispatch();
    const {isMobile} = useResponsiveQuery();

    //Filter
    useEffect(() => {
        dispatch(productsLoading())
    }, [])

    return (
        <div className="category-page mobile-mainContent">
            {!isMobile ? <FilterBox /> : <MobileFilterBox />}
            <ProductBox />
            {isMobile && <div className="select-filter-btn">
                <button type="button" onClick={() => dispatch(toggleFilterSideBar(true))}>
                    <HiOutlineAdjustmentsHorizontal /> 
                    <span>Filter</span>
                </button>
            </div>}
        </div>
    )
}

export default ProductListingPage
