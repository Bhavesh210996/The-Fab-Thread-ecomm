import SignUpForm from "../components/Account/SignUpForm"

function SignUp() {
    return (
        <div className="signup-page mobile-mainContent">
            <div className="signup-form-container">
                <div className="login-banner">
                    <img src="login-banner.webp" alt="banner" />
                </div>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp
