import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOrders } from "../../services/apiOrders";

export function useOrders(){
    const {data: orders, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: getCurrentUserOrders
    })

    return {orders, isLoading};
}