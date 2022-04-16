import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setPathName } from "../../redux/app-reducer";
import { getProfile, updateProfile } from "../../redux/profile-reducer";
import { withRouter } from "../hoc/withRouter";
import Settings from "./settings";

class SettingsContainer extends Component {
  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname);
    this.props.getProfile(this.props.userId);
  }
  componentWillUnmount(){
    this.props.setPathName("");
  }
  render() {
    if (this.props.userId == this.props.currentProfile.userId) return <Settings userId={this.props.userId} updateProfile={this.props.updateProfile} currentProfile={this.props.currentProfile}/> 
    else  { 
      return <div>"Loading"</div>
    }
  }
}

let mapStateToProps = (state) => {
  return {
    pathName: state.app.pathName,
    currentProfile: state.profilePage.currentProfile,
    userId: state.auth.userId
  };
};
export default compose(
  connect(mapStateToProps, {setPathName, getProfile, updateProfile}), 
  withRouter
)(SettingsContainer);

