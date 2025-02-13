import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../services/apiCart";

export function useCreateOrders(){
    const {mutate: createNewOrder, isPending} = useMutation({
        mutationFn: createOrder
    })

    return {createNewOrder, isPending};
}