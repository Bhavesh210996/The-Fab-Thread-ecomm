import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setRating } from "../../services/apiOrders";

export function useOrderRating(){
    const queryClient = useQueryClient();
    const {mutate: giveRatingFn, isPending} = useMutation({
        mutationFn: ({userRating, id}) => setRating(userRating, id),
        onSuccess: () => {
            console.log("rated successfully")
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            })
        }
    })

    return {giveRatingFn, isPending}
}