import { useQuery } from "@tanstack/react-query";
import { getCartEntries } from "../../services/apiCart";

export function useCartEntries(){
    const {data: cartEntries, isLoading: isEntriesLoading} = useQuery({
        queryKey: ['entries'],
        queryFn: getCartEntries,
        staleTime: 1000 * 60 * 2
    })

    return {cartEntries, isEntriesLoading};
}