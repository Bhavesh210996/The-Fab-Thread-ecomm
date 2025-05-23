import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate: signupFn, isPending: isSigningUp} = useMutation({
        mutationFn: ({email, password, optionData}) => createNewUser({email, password, optionData}),
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {signupFn, isSigningUp}
}