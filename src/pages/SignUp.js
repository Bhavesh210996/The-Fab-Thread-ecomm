import SignUpForm from "../components/Account/SignUpForm"
import { useResponsiveQuery } from "../context/MediaQueryContextApi";

function SignUp() {
    const {isMobile} = useResponsiveQuery();
    return (
        <div className="signup-page mobile-mainContent">
            <div className="signup-form-container">
                {!isMobile && <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>}
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp
