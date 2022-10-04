import { useState, useRef, useContext } from "react";
//this usehistory hook creates a history object
import { useHistory, Link } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //const confirmpasswordInputRef=useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,

        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = " Authentication-Failed";
            // if(data &&  data.error && data.error.message){
            //   errorMsg=data.error.message
            // }

            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        //this timestamp is called from authCtx connected to firebase where the timestamp expires after an
        //hour as default firebase expiration where it logs out after an hour
        const expirationTimer = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTimer.toISOString());
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const forgotPasswordHandler=()=>{
    const email=emailInputRef.current.value
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign-In" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email-Id</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
        )}
        {isLogin && (
          <p style={{ textDecoration: "none", color: "#777" }} onClick={forgotPasswordHandler}>
            Forgot Password?
          </p>
        )}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Sign-In" : " Sign-up"}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "New-User? Sign-Up" : "Already a user? Sign-in"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
