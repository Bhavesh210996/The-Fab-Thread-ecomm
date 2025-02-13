import { useEffect, useRef, useState } from "react";
import { useSignup } from "../Authentication/useSignup";
import Spinner from "../ui/Spinner";
import useFocus from "../../Hooks/useFocus";
import { emailValidationFn, passwordValidationFn } from "../../Utils/helpers";

function SignUpForm() {
    const [password, setPassword] = useState();
    const ref = useRef([])
    const {signupFn, isSigningUp} = useSignup();

    //custom hook for focusing on input field
    useFocus(ref)

    //validation logic
    useEffect(() => {
        const handleBlur = (index) => {
            const value = ref.current[index].value;
            const sibling = ref.current[index].nextElementSibling;

            if(!value){
                if(sibling) {sibling.classList.remove("hide");}
            }

            if(value && index === 1){
                emailValidationFn(sibling, value)
            }
            if(value && index === 3){
                passwordValidationFn(sibling, value, setPassword);
            }
        }

        ref.current.forEach((inputEl, index) => {
            if(inputEl){
                inputEl.addEventListener("blur", () => handleBlur(index))
            }
        })

        return () => {
            ref.current.forEach((inputEl, index) => {
                if(inputEl){
                    inputEl.removeEventListener("blur", () => handleBlur(index))
                }
            })
        }
    }, [ref])

    //sign up form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = [...formData.entries()].reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {})
        const {email, password, fullName, phone} = formValues;
        if(!email || !password || !fullName || !phone) return null;

        const value = ref.current[4].value;
        const sibling = ref.current[4].nextElementSibling;

        if(value){
            if(value !== password){
                if(sibling){
                    sibling.classList.remove("hide");
                    sibling.innerText = "Password is not matching"
                }
            }
        }
        signupFn({email, password, 
                optionData: {fullName, phone}})
    }

    return (
        <form className="signup-form" onSubmit={handleFormSubmit}>
            <div className="signup-box">
                <div className="fullName-sec">
                    <input type="text" className="input-field" name="fullName" placeholder="Full Name" ref={(el) => (ref.current[0] = el)}/>
                    <span className="error-box hide">Required</span>
                </div>
                <div className="email-sec">
                    <input type="text" className="input-field" name="email" placeholder="Email Id" ref={(el) => (ref.current[1] = el)}/>
                    <span className="error-box hide">Required</span>
                </div>
                <div className="mobNum-sec">
                    <input type="text" className="input-field" name="phone" placeholder="Mobile Number" ref={(el) => (ref.current[2] = el)}/>
                    <span className="error-box hide">Required</span>
                </div>
                <div className="password-sec">
                    <input type="password" className="input-field" name="password" placeholder="Password" ref={(el) => (ref.current[3] = el)}/>
                    <span className="error-box hide">Required</span>
                </div>
                <div className="repeatPassword-sec">
                    <input type="password" className="input-field" name="passwordConfirm" placeholder="Repeat Password" ref={(el) => (ref.current[4] = el)}/>
                    <span className="error-box hide">Required</span>
                </div>
                <button className="signup-btn">Sign Up</button>
                {isSigningUp && <Spinner type="signup"/>}
            </div>
        </form>
    )
}

export default SignUpForm
