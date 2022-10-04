import React from "react";

import classes from "./UserList.module.css";

const UserList = (props) => {
  // const fetchData=()=>{
  //   fetch(
  //   "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       idToken: authCtx.token,
        
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // ).then((res) => {
  //   //history.push("/");
  //   console.log(res);

  //   if (res.ok) {
  //     return res.json();
  //   }})

  return (

    

    <ul  className={classes.control} >
      {props.users.map((user) => (
       
        <li key={user.id} className={classes.li} >
          <span className={classes.label}>Full Name: {user.name}</span>
          
          <span className={classes.label}>Profile Photo Url:{user.url}</span>
         
          
        </li>
      ))}
    </ul>

  );
};
export default UserList;
