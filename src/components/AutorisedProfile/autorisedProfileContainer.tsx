import { Component } from "react";
import MyPostsContainer from "./MyPosts/myPostsContainer";
import AuthorisedProfileInfo from "./authorisedProfileInfo";
import {
  getProfile,
  getUserStatus,
  ProfileType,
  setProfilePhoto,
  setStatus,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { withRouter } from "../hoc/withRouter";
import { setPathName } from "../../redux/app-reducer";
import Preloader from "../common/Preloader/preloader";
import { InitialStateType } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type WithRouterProps = {
  router: RouterPropsType
}
type RouterPropsType = {
  location : {
    pathname: string
  }
}
type MapStatePropsType = {
  currentProfile: ProfileType
  authorisedUser: InitialStateType
  status: string | undefined
}
type MapDispatchPropsType = {
  setProfilePhoto: (file: any) => void
  setPathName: (pathName: string) => void
  getProfile: (userId: number | null) => void
  getUserStatus: (userId: number | null) => void
  setStatus: (status: string | undefined) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouterPropsType & WithRouterProps

class AuthorisedProfileClassContainer extends Component<PropsType> {
  onSubmit(file: any) {
    this.props.setProfilePhoto(file);
  }
  updatingPictureModeOn() {
    this.setState({ updatingPictureMode: true });
  }
  updatingPictureModeOff() {
    this.setState({ updatingPictureMode: false });
  }

  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname);
    let userId = this.props.authorisedUser.userId;
    this.props.getProfile(userId);
    this.props.getUserStatus(userId);
  }
  componentWillUnmount() {
    this.props.setPathName("");
  }

  render() {
    if (this.props.currentProfile.userId === this.props.authorisedUser.userId) {
      return (
        <>
          <AuthorisedProfileInfo
            onSubmit={this.onSubmit.bind(this)}
            setStatus={this.props.setStatus}
            status={this.props.status}
            currentProfile={this.props.currentProfile}
          />
          <MyPostsContainer />
        </>
      );
    } else return <Preloader />;
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    currentProfile: state.profilePage.currentProfile,
    authorisedUser: state.auth,
    status: state.profilePage.status,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, WithRouterProps, AppStateType>(mapStateToProps, {
    getProfile,
    getUserStatus,
    setStatus,
    setPathName,
    setProfilePhoto,
  }),
  withAuthRedirect,
  withRouter
)(AuthorisedProfileClassContainer);
