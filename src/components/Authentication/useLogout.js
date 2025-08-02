import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../context/CartSlice";

export function useLogout(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {mutate: logout, isPending: userLoggingOut} = useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            navigate("/login")
            dispatch(getUser())
        }
    })

    return useMemo(() => ({logout, userLoggingOut}), [logout, userLoggingOut])
}