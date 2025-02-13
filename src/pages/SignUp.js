import { NavLink } from "react-router-dom"
import SignUpForm from "../components/Account/SignUpForm"
import Logo from "../components/Header/Logo"

function SignUp() {
    return (
        <div className="signup-page">
            <div className="signup-form-container">
                <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>
                <div className="signup-section">
                    <Logo />
                    <h2>Sign up to FabThread</h2>
                    <SignUpForm />
                    <div className="signup-link auth-link">
                        <NavLink to="/login">Existing user? Please Log in</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
