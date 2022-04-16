import React from "react";
import classes from "./../messages.module.css";
const Message = (props) => {
    return <div className={classes.message}> {props.message} </div>;
  };

  export default Message;