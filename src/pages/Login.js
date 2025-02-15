import LoginForm from "../components/ui/LoginForm"
import "../style/authentication.css"
function Login() {

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
