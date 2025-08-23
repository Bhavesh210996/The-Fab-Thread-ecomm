import { useQuery } from "@tanstack/react-query";
import { getAddreses } from "../../services/apiAddress";

export function useAddreses(currentUseradd){
    const {data: addreses, isLoading:isAddressLoading} = useQuery({
        queryKey: ["addreses", currentUseradd],
        queryFn: () => getAddreses(currentUseradd),
        staleTime: 1000 * 60 * 2,
        enabled: !!currentUseradd.value
    })

    return {addreses, isAddressLoading};
}