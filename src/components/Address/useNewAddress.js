import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewAddress } from "../../services/apiAddress";
import toast from "react-hot-toast";

export function useNewAddress(){
    const queryClient = useQueryClient();
    const {mutate: addNewAddressFn, isPending} = useMutation({
        mutationFn: addNewAddress,
        onSuccess: () => {
            toast.success("new address added")
            queryClient.invalidateQueries({
                queryKey: ['addreses']
            })
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    return {addNewAddressFn, isPending};
}