/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { useState } from "react";
import { useLogin } from "../Authentication/useLogin";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loginFn, isLoggingIn} = useLogin();
  
    function handleSubmit(e) {
      e.preventDefault();
      console.log("Form Submitted");
      console.log(e);
      if(!email || !password) return null;

      // if(password){
      //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      //   if(!passwordRegex.test(password)){
      //    return document.querySelector(".error-box").innerText = "Please enter valid password"
      //   }
      // }
  
      loginFn({email, password}, {
        onSettled: () => {
          setEmail(""),
          setPassword("")
        },
        onError: () =>{
          // document.querySelector(".error-block").classList.remove("hide")  
          toast.error("Login Failed due to invalid login credentials")
        }
      })
    }
    
    return (
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="email-block">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />
        </div>
        <div className="password-block">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />
          <span className="error-box"></span>
        </div>
        <div className="error-block hide" >
            <span>Please enter valid credentials..!</span>
        </div>
        <div className="login-btn-block">
          <button type="submit" id="login-btn">Login</button>
        </div>
        {isLoggingIn && <Spinner type="login"/>}
      </form>
    );
  }

export default LoginForm
