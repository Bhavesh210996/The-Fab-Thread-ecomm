import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Spinner from "../ui/Spinner";
import ProductCard from "./ProductCard"
import { useSearchQuery } from "../../context/SearchProductContextApi";

function ProductBox() {
    const [imagesLoaded, setImagesLoaded] = useState();
    const {searchQuery} = useSearchQuery();
    const {categoryName} = useParams();

    const {productsList, isProductsListLoading} = useSelector((store) => store.products);

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
