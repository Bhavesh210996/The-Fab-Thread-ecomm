import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "../../services/apiMenProducts";

export function useProductList(filterValue){
    const {data: productsList, isLoading: isProductsListLoading} = useQuery({
        queryKey: ["productsList", filterValue],
        queryFn: () => getProductsList(filterValue)
    })

    return {productsList, isProductsListLoading}
}