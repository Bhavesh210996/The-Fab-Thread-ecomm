import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import ProductCard from "./ProductCard"
import { useProductList } from "./useProductList"
import { useSearchQuery } from "../../context/SearchProductContextApi";
import React, { useEffect, useMemo, useState } from "react";
import { useCategory } from "../Category/useCategory";
import useSEO from "../../Hooks/useSEO";
import { usePreloadImages } from "../../Hooks/usePreloadImages";
import { useSelector } from "react-redux";

const ProductBox = React.memo(function ProductBox() {
    const [imagesLoaded, setImagesLoaded] = useState();
    const [searchParams] = useSearchParams();
    const {searchQuery} = useSearchQuery();
    const {categoryName} = useParams();
    const { preloadImages } = usePreloadImages();
    const {filterSearchQuery} = useSelector((store) => store.products);
    //Filter
    const brandParam = searchParams.get("brand")?.split("%");
    const colorParam = searchParams.get("color")?.split("%");

    const filters = useMemo(() => {
        const result = [];
        if(brandParam) result.push({field: "brand", value: brandParam});
        if(colorParam) result.push({field: "color", value: colorParam});
        return result;
    }, [brandParam, colorParam]);

    const {productsList, isProductsListLoading} = useProductList(filters);
    const {categories} = useCategory();
    const category = useMemo(() => categories?.filter((category) => category.page === categoryName?.toLowerCase()), [categories, categoryName]);

    //SEO logic
    const seoData = useMemo(() => {
        return{
            description: category?.[0]?.description,
            title: category?.[0]?.name
        }
    }, [category]);
    useSEO(seoData);
    
    //category results
    const productData = useMemo(() => {
        const categoryFilter = productsList?.filter(item => item.categoryName === categoryName?.toLowerCase());
        let data = categoryFilter?.length > 0 ? categoryFilter : productsList;

        if(categoryFilter?.length <= 0){
            data = categoryName ? data?.filter((item) => {
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
        return data;
    }, [productsList, categoryName]);

    //search results
    const searchQueryData = useMemo(() => {
        const data = searchQuery ? productsList?.filter((item) => {
        const queryTerms = searchQuery.toLowerCase().split(" ").map(term => term.trim());
    
        return queryTerms.every((term) => {
            return (
              item.gender?.toLowerCase() === term ||
              item.categoryName?.toLowerCase().split("-")[1] === term ||
              item.itemType?.toLowerCase() === term
            );
          });
        }) : productData;
        return data;
    }, [productsList, searchQuery, productData]);

    //search filter results
    const filteredProducts = useMemo(() => {
        let data = filterSearchQuery ?  productData?.filter((item) => {
            const queryTerms = filterSearchQuery.toLowerCase().split(" ").map(term => term.trim());

            return queryTerms.every((term) => {
                return(
                    item.gender.toLowerCase().includes(term) ||
                    item.color.toLowerCase().includes(term) ||
                    item.brand.toLowerCase().includes(term) ||
                    item.itemType.toLowerCase().includes(term) ||
                    item.categoryName.toLowerCase().split("-")[1].includes(term)
                )
            })
        }) : productData;
        return data;
    }, [filterSearchQuery, productData]);

    const filteredData = useMemo(() =>
        filteredProducts?.length > 0 ? 
        filteredProducts :
        searchQueryData?.length > 0 ? 
        searchQueryData : 
        productData?.length > 0 ? 
        productData : productsList,
        [searchQueryData, productData, productsList, filteredProducts]
    );

    useEffect(() => {
        if(filteredData)
            preloadImages(filteredData).then(() => setImagesLoaded(true))
    }, [filteredData, preloadImages])

    if(isProductsListLoading || !imagesLoaded) return <Spinner />

    return (
        <div className="productBox">
            <div className="items-row">
                {filteredData?.map((item) => <ProductCard key={item.id} item={item}/>)}
            </div>
        </div>
    )
})

export default ProductBox
