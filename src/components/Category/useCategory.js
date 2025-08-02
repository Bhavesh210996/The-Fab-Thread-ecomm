import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategory";

export function useCategory(){
    const {data:categories, isLoading: isCategoriesLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    })
    return {categories, isCategoriesLoading}
}