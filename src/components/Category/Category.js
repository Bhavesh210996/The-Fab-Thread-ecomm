import Spinner from "../ui/Spinner";
import CategoryCard from "./CategoryCard";
import { useCategory } from "./useCategory"
import "../Category/category.css";
import { useEffect, useState } from "react";

function Category({genderType}) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const {categories, isCategoriesLoading} = useCategory();
    
    const filteredCategories = genderType ? categories?.filter((category) => category.gender === genderType) : 
                                categories?.filter((category) => !category.gender);

    const preloadImages = (cards) => {
        return Promise.all(
            cards.map((card) => 
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = card.image;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
            )
        )
    }

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
