import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updatePassword } from "../../services/apiAuth"

export const useUpdatePassword = () => {
    const {mutate: updatePasswordFn, isPending} = useMutation({
        mutationFn: ({email, password}) => updatePassword(email, password),
        onSuccess: () => {
            toast.success("Your password is updated successfully. Please login for exciting deals")
        },
        onError: (err) => {
            console.log(err.message)
        }
    })

    return {updatePasswordFn, isPending}
}