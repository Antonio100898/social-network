import React from "react";
import classes from "./profile_info.module.css";


const ProfileInfo = (props) => {
  let photo = (props.currentProfile.photos.large || props.currentProfile.photos.small)? props.currentProfile.photos.large || props.currentProfile.photos.small : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png";
    return (
        <div className={classes.profile_content}>
        <img
          className={classes.profile_picture}
          src={photo}
          alt="avatar"
        />
        <div className={classes.profile_info}>
          <div className={classes.item + " " + classes.name}>Name | {props.currentProfile.fullName} </div>
          <div className={classes.item + " " + classes.age}>Looking for a job: {props.currentProfile.lookingForAJob? "yes" : "no"}</div>
          <div className={classes.item + " " + classes.interests}>Status| {props.status}</div>
        </div>
      </div>
    );
}

export default ProfileInfo;