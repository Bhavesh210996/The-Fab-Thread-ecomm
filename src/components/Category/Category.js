import Spinner from "../ui/Spinner";
import CategoryCard from "./CategoryCard";
import { useCategory } from "./useCategory"
import "../Category/category.css";
import { useEffect, useState } from "react";
import { usePreloadImages } from "../../Hooks/usePreloadImages";

function Category({genderType}) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const {categories, isCategoriesLoading} = useCategory();
    const { preloadImages } = usePreloadImages();
    const filteredCategories = genderType ? categories?.filter((category) => category.gender === genderType) : 
                                categories?.filter((category) => !category.gender);

    useEffect(() => {
        if(filteredCategories){
            preloadImages(filteredCategories).then(() => setImagesLoaded(true));
        }
    }, [filteredCategories])

    if(!imagesLoaded) return <Spinner />

    return (
        <div className="category-base-container">
            <div className="row-compo">
                {filteredCategories?.map((category) => <CategoryCard key={category.id} category={category} />)}
            </div>
        </div>
    )
}

export default Category
