import { useQuery } from "@tanstack/react-query";
import { getAddreses } from "../../services/apiAddress";

export function useAddreses(currentUseradd){
    const {data: addreses, isLoading:isAddressLoading} = useQuery({
        queryKey: ["addreses"],
        queryFn: () => getAddreses(currentUseradd)
    })

    return {addreses, isAddressLoading};
}