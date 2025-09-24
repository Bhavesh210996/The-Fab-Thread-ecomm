import { useParams, useSearchParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import Filter from "../ui/Filter";
import { useSearchQuery } from "../../context/SearchProductContextApi";
import React, { useMemo } from "react";
import { SearchFilter } from "./SearchFilter";

const FilterBox = React.memo(function FilterBox() {
    const [searchParams] = useSearchParams();
    const {searchQuery} = useSearchQuery();
    const {categoryName} = useParams();

    //Filter
    const brandParamRaw = searchParams.get("brand");
    const colorParamRaw = searchParams.get("color");
    const brandParam = useMemo(() => {
        return brandParamRaw?.split("%")?.map(b => b.toLowerCase());
    }, [brandParamRaw])
    const colorParam = useMemo(() => {
        return colorParamRaw?.split("%")?.map(c => c.toLowerCase());
    }, [colorParamRaw]);

    //fetch the product data
    const {productsList} = useSelector((store) => store.products);

    const productData = useMemo(() => {
        const categoryFilter = productsList?.filter(item => item.categoryName === categoryName?.toLowerCase());
        let data = categoryFilter?.length > 0 ? categoryFilter : productsList;
        return data;
    }, [productsList, categoryName]);

    const filteredData = productData?.length > 0 ? productData : productsList;

    //filter by brand
    let selectedBrandProducts;
    let brandKey;
    if(colorParam){
        selectedBrandProducts = filteredData?.filter((item) => colorParam?.includes(item.color?.toLowerCase()))
        brandKey = [...new Set(selectedBrandProducts?.map((item) => item?.brand))]
    }else{
        brandKey = [...new Set(filteredData?.map((item) => item?.brand))]    
    }
    
    //filter by color
    let selectedColorProducts;
    let colorsKey;
    if(brandParam){
        selectedColorProducts = filteredData?.filter((item) => brandParam?.includes(item.brand?.toLowerCase()));
        colorsKey = [...new Set(selectedColorProducts?.map((item) => item?.color))]
    }else{
        colorsKey = [...new Set(filteredData?.map((item) => item?.color))]
    }

    return (
        <div className="filterBox">
            <div className="filter-heading">
             <p>Filters</p>
            </div>
            <div className="filters-container">
                <SearchFilter />
                <Filter type="brand" filterData={brandKey} filterField="brand" products={selectedBrandProducts ? selectedBrandProducts : filteredData}/>
                <Filter type="color" filterData={colorsKey} filterField="color" products={selectedColorProducts ? selectedColorProducts : filteredData}/>
            </div>
        </div>
    )
})

export default FilterBox;
