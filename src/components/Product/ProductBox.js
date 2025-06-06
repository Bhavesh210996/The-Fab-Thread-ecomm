import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import ProductCard from "./ProductCard"
import { useProductList } from "./useProductList"
import { useSearchQuery } from "../../context/SearchProductContextApi";
import { useEffect, useState } from "react";
import { useCategory } from "../Category/useCategory";
import useSEO from "../../Hooks/useSEO";

function ProductBox() {
    const [imagesLoaded, setImagesLoaded] = useState();
    const [searchParams] = useSearchParams();
    const {searchQuery} = useSearchQuery();
    const {categoryName} = useParams();
        
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

    const {productsList, isProductsListLoading} = useProductList(filters);
    const {categories} = useCategory();
    const category = categories?.filter((category) => category.page === categoryName.toLowerCase());

    useSEO({description: category?.[0]?.description, title: category?.[0]?.name})

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

    
    const preloadImages = (products) => {
        return Promise.all(
            products?.map((product) => 
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = product.itemImage;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
            )
        )
    }
    
    useEffect(() => {
        if(filteredData)
            preloadImages(filteredData).then(() => setImagesLoaded(true))
    }, [filteredData])

    if(isProductsListLoading || !imagesLoaded) return <Spinner />

    return (
        <div className="productBox">
            <div className="items-row">
                {filteredData?.map((item) => <ProductCard key={item.id} item={item}/>)}
            </div>
        </div>
    )
}

export default ProductBox
