import Spinner from "../ui/Spinner";
import CategoryCard from "./CategoryCard";
import { useCategory } from "./useCategory"
import "../Category/category.css";

function Category({genderType}) {
    const {categories, isCategoriesLoading} = useCategory();

    if(isCategoriesLoading) return <Spinner />
    
    const filteredCategories = genderType ? categories?.filter((category) => category.gender === genderType) : 
                                categories?.filter((category) => !category.gender);

    return (
        <div className="category-base-container">
            <div className="row-compo">
                {filteredCategories?.map((category) => <CategoryCard key={category.id} category={category} />)}
            </div>
        </div>
    )
}

export default Category
