import LoginForm from "../components/ui/LoginForm"
import { useResponsiveQuery } from "../context/MediaQueryContextApi"
import "../style/authentication.css"
function Login() {
    const {isMobile} = useResponsiveQuery();
    return (
        <div className="login-page mobile-mainContent">
            <div className="login-container">
                {!isMobile && <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>}
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
