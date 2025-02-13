import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAddress } from "../../services/apiAddress";
import toast from "react-hot-toast";

export function useRemoveAddress(){
    const queryClient = useQueryClient();

    const {mutate: deletetingAddressFn, isPending:  isDeleting} = useMutation({
        mutationFn: removeAddress,
        onSuccess: () => {
            toast.success("Address is removed from your account")
            queryClient.invalidateQueries({
                queryKey: ["addreses"]
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return{deletetingAddressFn, isDeleting}
}