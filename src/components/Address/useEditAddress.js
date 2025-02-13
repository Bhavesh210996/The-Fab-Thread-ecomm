import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../services/apiAddress";
import toast from "react-hot-toast";

export function useEditAddress(){
    const queryClient = useQueryClient();

    const {mutate: editAddress, isPending: isAddressEditing} = useMutation({
        mutationFn: ({editData, id}) => updateAddress(editData, id),
        onSuccess: () => {
            toast.success("Address has been updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["addreses"]
            })
        },
        onError: () => {
            toast.error("There is some error while updating the error, try again")
        }
    })

    return {editAddress, isAddressEditing};
}