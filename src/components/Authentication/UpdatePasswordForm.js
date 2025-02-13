import { useEffect, useRef, useState } from "react"
import { useUpdatePassword } from "../Account/useUpdatePassword";

function UpdatePasswordForm() {
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const ref = useRef([]);
    const {updatePasswordFn, isPending} = useUpdatePassword();

    useEffect(() => {
        const handleFocus = (index) => {
            const sibling = ref.current[index].nextElementSibling;

            if(sibling) sibling.classList.add("hide");
        }
        const handleBlur = (index) => {
            const value = ref.current[index].value;
            const sibling = ref.current[index].nextElementSibling;

            if(!value){
                if(sibling) sibling.classList.remove("hide");
            }

            if(value && index === 1){
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                if(!passwordRegex.test(value)){
                    if(sibling) sibling.classList.remove("hide");
                    sibling.innerText = "Please use password with min length of 8 including special char"
                }else{
                    setPassword(() => value)
                }
            }
        }

        ref.current.forEach((inputEl, index) => {
            if(inputEl){
                inputEl.addEventListener("blur", () => handleBlur(index));
                inputEl.addEventListener("focus", () => handleFocus(index));
            }
        })

        return () => {
            ref.current.forEach((inputEl, index) => {
                if(inputEl){
                    inputEl.removeEventListener("blur", () => handleBlur(index));
                    inputEl.removeEventListener("focus", () => handleFocus(index));
                }
            })
        }
    }, [ref])
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = ref.current[2].value;
        const sibling = ref.current[2].nextElementSibling;
        if(value){
            if(value !== password){
                if(sibling) sibling.classList.remove("hide");
                sibling.innerText = "Password is not matching"
            }
        }
        updatePasswordFn({email, password})
        
    }

    return (
        <form id="password-reset-form" onSubmit={handleSubmit}>
            <div className="email-sec">
                    <input type="text" className="input-field" name="email" placeholder="Email Id" ref={(el) => (ref.current[0] = el)} onChange={(e) => setEmail(e.target.value)}/>
                    <span className="error-box hide">Required</span>
                </div>
            <div className="password-sec">
                <input type="password" className="input-field" name="password" value={password} placeholder="Password" ref={(el) => (ref.current[1] = el)}/>
                <span className="error-box hide">Required</span>
            </div>
            <div className="repeatPassword-sec">
                <input type="password" className="input-field" name="passwordConfirm" placeholder="Confirm Password" ref={(el) => (ref.current[2] = el)}/>
                <span className="error-box hide">Required</span>
            </div>
        <div className="error-block hide" >
            <span>Please enter valid credentials..!</span>
        </div>
        <div className="login-btn-block">
          <button id="login-btn" disabled={isPending}>Reset</button>
        </div>
      </form>
    )
}

export default UpdatePasswordForm
