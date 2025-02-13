import { NavLink } from "react-router-dom"
import Logo from "../components/Header/Logo"
import LoginForm from "../components/ui/LoginForm"
import "../style/authentication.css"
import UpdatePasswordForm from "../components/Authentication/UpdatePasswordForm"
import { useState } from "react"
function Login() {
    const [isResetFormOpen, setIsResetFormOpen] = useState(false);

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>
                <div className="login-section">
                    <Logo />
                    <h2 className="login-text">{isResetFormOpen ? "Reset Password" : "Login to your account"}</h2>
                    {!isResetFormOpen && <LoginForm />}
                    {isResetFormOpen && <UpdatePasswordForm />}
                    {/* {!isResetFormOpen && <div className="forgot-pass auth-link">
                        <NavLink onClick={() => setIsResetFormOpen(true)}>Forgot Password?</NavLink>
                    </div>} */}
                    <div className="signup-link auth-link">
                        <NavLink to="/signup">New to FabThread? Create an account</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
