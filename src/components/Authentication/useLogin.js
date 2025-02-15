import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../services/apiAuth";

export function useLogin(){

    const {mutate: loginFn, isPending: isLoggingIn} = useMutation({
        mutationFn: ({email, password}) => userLogin({email, password})
    })

    return {loginFn, isLoggingIn};
}