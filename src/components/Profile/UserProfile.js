import ProfileForm from "./ProfileForm";
import React,{useState} from "react";
import classes from "./UserProfile.module.css";
import UserList from "./UserList";


const UserProfile = (props) => {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (fullName, profilePhotoUrl) => {
    setUsersList((prev) => {
      const updatedUsersList= [...prev];
      updatedUsersList.unshift( { name: fullName, url: profilePhotoUrl })
      return updatedUsersList

    });
  };
  return (
    <section className={classes.profile}>
      <h1>Contact Details</h1>
      <ProfileForm onAddUser={addUserHandler} />
      <UserList users={usersList}/>

     
    </section>
  );
};

export default UserProfile;
