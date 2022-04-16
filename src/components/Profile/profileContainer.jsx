import React, { Component } from "react";
import Profile from "./profile";
import { connect } from "react-redux";
import { getProfile, getUserStatus } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withRouter } from "../hoc/withRouter";
import { withLoader } from "../hoc/withLoading";
import Preloader from "../common/Preloader/preloader";

class ProfileContainer extends Component  {
  
  componentDidMount(){
    this.props.getProfile(this.props.router.params.userId);
    this.props.getUserStatus(this.props.router.params.userId);
  }
  
  render(){
    if(this.props.currentProfile.userId == this.props.router.params.userId) return <Profile {...this.props} />
    else return  <Preloader/>;
  }
  
}
let mapStateToProps = (state) => ({
  currentProfile: state.profilePage.currentProfile,
  status: state.profilePage.status
});

export default compose(
  connect(mapStateToProps, { getProfile, getUserStatus }), 
  withRouter,
  withLoader
)(ProfileContainer);
