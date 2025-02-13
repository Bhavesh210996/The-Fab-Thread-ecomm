import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setItemRating } from "../../services/apiMenProducts";

export function useSetItemRating(){
    const queryClient = useQueryClient();

    const {mutate: setItemRatingFn, isPending: isRating} = useMutation({
        mutationFn: ({userRating, id}) => setItemRating(userRating, id),
        onSuccess: () => {
            console.log("Setting item level rating")
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            })
        }
    })

    return {setItemRatingFn, isRating}
}