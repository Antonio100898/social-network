import React from "react";
import { NavLink } from "react-router-dom";
import  classes from "./topmenu.module.css"

type PropsType = {
  deleteLogin: () => void
  isAuthorised: boolean
  nickName: string
  email: string
}
const TopMenu: React.FC<PropsType> = (props) => {
  const deleteLogin = () => {
    props.deleteLogin();
  }
  return (
    <div className={classes.top_menu}>
      <div className={classes.logo}>FlexBook</div>

      {props.isAuthorised ? (
        <div className={classes.button}>{props.nickName} | {props.email} | <button className={classes.loginButton} onClick={deleteLogin}>Logout</button></div>
      ) : (
        <div className={classes.button}> 
          <NavLink className={classes.link} to="/login">
          <button className={classes.loginButton}>Login</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
