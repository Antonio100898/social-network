import React from "react";
import classes from "./../messages.module.css";
import { NavLink } from "react-router-dom";



const Dialog = (props) => {
    let path = "/dialogs/" + props.id;
    return (
      <div className={classes.item}>
        <NavLink className={classes.link} to={path}>
          {props.name}
        </NavLink>
      </div>
    );
  };


  export default Dialog;