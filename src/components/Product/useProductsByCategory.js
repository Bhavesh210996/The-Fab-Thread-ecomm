import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductsListByCategory } from "../../services/apiMenProducts";

export function useProductsByCategory(){
    const {mutate: getProductsListByCategoryFn, isPending} = useMutation({
        mutationFn: (value) => getProductsListByCategory(value)
    })

    return {getProductsListByCategoryFn, isPending}
}