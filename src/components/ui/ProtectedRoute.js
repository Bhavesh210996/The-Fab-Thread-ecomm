import { useEffect } from "react";
import { useUser } from "../Authentication/useUser"
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    // const {isUserLoading, isAuthenticated} = useUser();
    const {isUserLoading, isAuthenticated} = useSelector((store) => store.cartStates);

    useEffect(() => {
        if(!isAuthenticated && !isUserLoading) navigate("/login");
    }, [isAuthenticated, isUserLoading, navigate])

    if(isUserLoading){
        return <Spinner />
    }

    if(isAuthenticated) return children;
}

export default ProtectedRoute
