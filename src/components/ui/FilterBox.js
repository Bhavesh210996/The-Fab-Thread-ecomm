import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Filter from "./Filter";
import { useSearchQuery } from "../../context/SearchProductContextApi";

function FilterBox() {
    const [searchParams] = useSearchParams();
    const {searchQuery} = useSearchQuery();
    const {categoryName} = useParams();

    //Filter
    const brandParam = searchParams.get("brand")?.split("%");
    const colorParam = searchParams.get("color")?.split("%");

    //fetch the product data
    const {productsList} = useSelector((store) => store.products);

    let productData;
    //category results
    const categoryFilter = productsList?.filter(item => item.categoryName === categoryName.toLowerCase());
    productData = categoryFilter?.length > 0 ? categoryFilter : productsList;

    if(categoryFilter?.length <= 0){
        productData = categoryName ? productData?.filter((item) => {
            const querySplit = categoryName.toLowerCase()
                                .replace(/-/g, ' ') 
                                .replace(/\s+/g, ' ')
                                .trim();
            const queryTerms = querySplit.replace(/\bt\s?shirt\b/g, 't-shirt').split(" ").map(term => term.trim());

            return queryTerms.every((term) => {
                return(
                    item.gender.toLowerCase() === term ||
                    item.itemType.toLowerCase() === term
                )
            })
        }) : "";
    }

    //search results
    const searchQueryData = searchQuery ? productsList?.filter((item) => {
    const queryTerms = searchQuery.toLowerCase().split(" ").map(term => term.trim());
    
      return queryTerms.every((term) => {
        return (
          item.gender.toLowerCase() === term ||
          item.categoryName.toLowerCase().split("-")[1] === term ||
          item.itemType.toLowerCase() === term
        );
      });
    }) : productData;

    const filteredData = searchQueryData?.length > 0 ? searchQueryData : productData?.length > 0 ? productData : productsList;

    //filter by brand
    let selectedBrandProducts;
    let brandKey;
    if(colorParam){
        selectedBrandProducts = filteredData?.filter((item) => colorParam.includes(item.color))
        brandKey = [...new Set(selectedBrandProducts?.map((item) => item.brand))]
    }else{
        brandKey = [...new Set(filteredData?.map((item) => item.brand))]    
    }
    
    //filter by color
    let selectedColorProducts;
    let colorsKey;
    if(brandParam){
        selectedColorProducts = filteredData?.filter((item) => brandParam.includes(item.brand));
        colorsKey = [...new Set(selectedColorProducts?.map((item) => item.color))]
    }else{
        colorsKey = [...new Set(filteredData?.map((item) => item.color))]
    }

    //filter by price


    //filter by discount

    // if(!isMenProductsLoading) return <Spinner />

    return (
        <div className="filterBox">
            <div className="filter-heading">
             <p>Filters</p>
            </div>
            <div className="filters-container">
                <Filter type="brand" filterData={brandKey} filterField="brand" products={selectedBrandProducts ? selectedBrandProducts : filteredData}/>
                <Filter type="color" filterData={colorsKey} filterField="color" products={selectedColorProducts ? selectedColorProducts : filteredData}/>

                {/* <div className="filter-price">
                    Price Range
                </div>

                <div className="filter-discount">
                    Discount
                </div> */}
            </div>
        </div>
    )
}

export default FilterBox
