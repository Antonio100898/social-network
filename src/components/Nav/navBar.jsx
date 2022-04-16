import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import FriendsContainer from "./FriendsNavBar/FriendsContainer";
import classes from "./navbar.module.css";

const NavBar = (props) => {
  const paths = {
    profile: "/profile",
    messages: "/messages",
    users: "/users",
    settings: "/settings",
    videos: "/videos",
    photos: "/photos",
    music: "/music",
  };
  
  return (
    <div className={classes.nav_bar}>
      <div>
        <div className={classes.nav_links}>
          <NavLink  className={(props.pathName === paths.profile)? (classes.link + " " + classes.selected) : classes.link} to={paths.profile}>
            <div > My Profile </div>
          </NavLink>
          <NavLink className={(props.pathName === paths.messages)? (classes.link + " " + classes.selected) : classes.link} to={paths.messages}>
            <div > Messages</div>
          </NavLink>
          <NavLink className={(props.pathName === paths.photos)? (classes.link + " " + classes.selected) : classes.link} to={paths.photos}>
            <div >Photos</div>
          </NavLink>
          <NavLink className={(props.pathName === paths.videos)? (classes.link + " " + classes.selected) : classes.link} to={paths.videos}>
            <div >Videos</div>
          </NavLink>
          <NavLink className={(props.pathName === paths.music)? (classes.link + " " + classes.selected) : classes.link} to={paths.music}>
            <div >Music</div>
          </NavLink>
          <NavLink className={(props.pathName === paths.users)? (classes.link + " " + classes.selected) : classes.link} to={paths.users}>
            <div >Users</div>
          </NavLink>
          <NavLink className={(props.pathName === paths.settings)? (classes.link + " " + classes.selected) : classes.link} to={paths.settings}>
            <div >Settings</div>
          </NavLink>
        </div>
        <FriendsContainer />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  pathName: state.app.pathName,
});
export default connect(mapStateToProps, null)(NavBar);
