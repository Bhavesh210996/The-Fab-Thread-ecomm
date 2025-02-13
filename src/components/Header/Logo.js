import { useNavigate } from "react-router-dom";

function Logo(){
    const navigate = useNavigate();
    return(
        <div className="logo-image">
            <img src="/fabThread.jpg" className="header__logo" alt="Logo" onClick={() => navigate("/")} />
        </div>
    )
}

export default Logo;