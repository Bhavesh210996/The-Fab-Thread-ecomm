import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate: loginFn, isPending: isLoggingIn} = useMutation({
        mutationFn: ({email, password}) => userLogin({email, password}),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user)
            console.log("user login successfully")
            navigate("/")
        },
        onError: (error) => { 
            throw new Error(error.message) 
        }
    })

    return {loginFn, isLoggingIn};
}