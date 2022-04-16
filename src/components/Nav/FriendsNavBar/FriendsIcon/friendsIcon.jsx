import React from "react";
import classes from "./friendsIcon.module.css";

const FriendIcon = (props) => {
return (
    <div className={classes.friend_icon}>
              <img
                className={classes.img}
                src={props.friendIcon.src}
              />
              <div className={classes.name}>{props.friendIcon.name}</div>
            </div>
);

}

export default FriendIcon;