import classes from "./StartingPageContent.module.css";
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context'
import { useState } from "react";
import { useContext } from "react";

const StartingPageContent = (props) => {
  const authCtx = useContext(AuthContext);
  const VerifyMail = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU",
      {
        method: "POST",
        body:JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken:authCtx.token
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((user) => {
      console.log(user);

      if (user.ok) {
        return user.json();
      }
    });
  };

  return (
    <section className={classes.starting}>
      <h1>Welcome to Expense Tracker</h1>
      <button className={classes.button} onClick={VerifyMail}>
        Verify Email-Id
      </button>
      <p>
        Your profile is incomplete!
        <Link to={`/profile`}>
          <br />
          <br />
          Complete Now
        </Link>
      </p>
    </section>
  );
};

export default StartingPageContent;
