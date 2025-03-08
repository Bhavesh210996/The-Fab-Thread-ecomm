import { useMutation } from "@tanstack/react-query"
import { updateProductQuantity } from "../../services/apiMenProducts"

export const useItemQtyUpdate = () => {
    const {mutate: qtyUpdateOnOrder, isPending: isQtyUpdating} = useMutation({
        mutationFn: (itemsQtyArray) => updateProductQuantity(itemsQtyArray),
        onError: (error) => {
            console.log(error.message)
        }
    })

    return {qtyUpdateOnOrder, isQtyUpdating}
}