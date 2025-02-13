import { useMutation } from "@tanstack/react-query";
import { deleteCartEntry } from "../../services/apiCart";
import toast from "react-hot-toast";

export function useDeletingEntry(){
    const {mutate: deleteEntry, isPending: isDeleting} = useMutation({
        mutationFn: ({id, entries}) => deleteCartEntry(id, entries),
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    return {deleteEntry, isDeleting}
}