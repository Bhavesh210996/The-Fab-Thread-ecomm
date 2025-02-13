import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup(){
    const navigate = useNavigate();
    const {mutate: signupFn, isPending: isSigningUp} = useMutation({
        mutationFn: ({email, password, optionData}) => createNewUser({email, password, optionData}),
        onSuccess: () => {
            toast.success("Your user is created successfully. Lets have fun")
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {signupFn, isSigningUp}
}