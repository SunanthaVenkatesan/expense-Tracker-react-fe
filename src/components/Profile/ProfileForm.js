import { useContext, useState, Fragment } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { Prompt, useHistory } from "react-router-dom";
import database from "../firebase";

const ProfileForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const addUserHandler = (event) => {
    event.preventDefault();

    props.onAddUser(name, url);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: name,
          photoUrl: url,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((user) => {
      //history.push("/");
      console.log(user);
      database
      .ref("user")
      .set({
        name: name,
        url: url,
      })

      if (user.ok) {
        return user.json();
      } else {
        return user.json().then((data) => {
          let errorMsg = "Cannot update user details";

          throw new Error(errorMsg);
        });
      }
    });
  };

  const fetchDataHandler = (event) => {
    event.preventDefault();

  //   //props.onfetchUser(name, url);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //history.push("/");
      console.log(res);


      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMsg = "Cannot fetch user details";

          throw new Error(errorMsg);
        });
      }
    });
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };
  const formUpdateHandler=()=>{
    setName('')
    setUrl('')
  }

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave the page?All your data will be lost!"
        }
      />
      <form
        className={classes.form}
        onFocus={formFocusedHandler}
        onSubmit={addUserHandler}
      >
        <div className={classes.control}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="profilePhoto">Profile photo URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <button onClick={addUserHandler}>Update</button>
          <button onClick={fetchDataHandler} >Edit</button>
        </div>
      </form>
    </Fragment>
  );
};

export default ProfileForm;
