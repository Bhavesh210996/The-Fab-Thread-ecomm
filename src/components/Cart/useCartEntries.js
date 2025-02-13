import { useQuery } from "@tanstack/react-query";
import { getCartEntries } from "../../services/apiCart";

export function useCartEntries(){
    const {data: cartEntries, isLoading: isEntriesLoading} = useQuery({
        queryKey: ['entries'],
        queryFn: getCartEntries
    })

    return {cartEntries, isEntriesLoading};
}