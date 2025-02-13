import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCartEntry } from "../../services/apiCart";

export function useAddToCart(){
    const queryClient = useQueryClient();
    const {mutate: addToCartFn, isPending: isAddingCart} = useMutation({
        mutationFn: ({entry, id}) => createNewCartEntry(entry, id),
        onSuccess: () => {
            console.log("product added to cart")
            queryClient.invalidateQueries({
                queryKey: ["entries"]
            })
        },
        onError: (error) => console.log(error.message)
    })

    return {addToCartFn, isAddingCart};
}