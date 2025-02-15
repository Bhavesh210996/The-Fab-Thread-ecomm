/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import toast from "react-hot-toast";
import { useState } from "react";
import { useLogin } from "../Authentication/useLogin";
import Spinner from "./Spinner";
import Logo from "../Header/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import SignUpForm from "../Account/SignUpForm";
import { useQueryClient } from "@tanstack/react-query";

function LoginForm({isPopupSession, onCloseModal}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpOpen, setSignUpOpen] = useState(false);
    const {loginFn, isLoggingIn} = useLogin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSignupForm =()=>{
      setSignUpOpen(!signUpOpen)
    }
    function handleSubmit(e) {
      e.preventDefault();
      if(!email || !password) return null;

      // if(password){
      //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      //   if(!passwordRegex.test(password)){
      //    return document.querySelector(".error-box").innerText = "Please enter valid password"
      //   }
      // }
      loginFn({email, password}, {
        onSuccess: (user) => {
          queryClient.setQueryData(["user"], user.user)
          console.log("user login successfully")
          if(!isPopupSession) navigate("/")
        },
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
      <>
      {!signUpOpen && <div className="login-section">
        <Logo />
        <h2 className="login-text">Login to your account</h2>
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
        <div className="signup-link auth-link">
          {isPopupSession === "true" ? 
                <button onClick={handleSignupForm}>New to FabThread? Create an account</button>
            :
            <NavLink to="/signup">New to FabThread? Create an account</NavLink>
          }
        </div>
      </div>}
      {signUpOpen && <SignUpForm isPopupSession={isPopupSession} onClose={onCloseModal}/>}
      </>
    )
  }

export default LoginForm
