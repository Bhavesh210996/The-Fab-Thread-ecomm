import Spinner from "../ui/Spinner";
import CategoryCard from "./CategoryCard";
import { useCategory } from "./useCategory"
import "../Category/category.css";
import { useMemo } from "react";

function Category({genderType}) {
    const {categories} = useCategory();
    const filteredCategories = useMemo(() => 
                                genderType ? categories?.filter((category) => category.gender === genderType) : 
                                categories?.filter((category) => !category.gender)
                            , [genderType, categories])

    return (
        <div className="category-base-container">
            {(!filteredCategories || filteredCategories?.length <= 0) ? <Spinner /> : 
            <div className="row-compo">
                {filteredCategories?.map((category) => <CategoryCard key={category.id} category={category} />)}
            </div>}
        </div>
    )
}

export default Category
