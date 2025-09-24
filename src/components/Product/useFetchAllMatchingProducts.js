import { useMutation } from "@tanstack/react-query"
import { fetchAllMAtchingProducts } from "../../services/apiMenProducts"

export const useFetchAllMatchingProducts = () => {
        const {mutate: fetchAllMAtchingProductsFn, isPending: productsLoading} = useMutation({
        mutationFn: (query) => fetchAllMAtchingProducts(query),
        onSuccess: (data) => {
            console.log("suggestions", data)
        }
    })

    return {fetchAllMAtchingProductsFn, productsLoading}
}
