import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const navigate = useNavigate()
    const {mutate: logout, isPending: userLoggingOut} = useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            navigate("/login")
        }
    })

    return {logout, userLoggingOut}
}