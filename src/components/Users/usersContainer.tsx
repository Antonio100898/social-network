import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setPathName } from "../../redux/app-reducer";
import { AppStateType } from "../../redux/redux-store";
import { getCurrentPage, getIsFetching, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsersData } from "../../redux/Selectors/users-selectors";
import {
  getUsers,
  postFollow,
  deleteFollow,
  UserType,
} from "../../redux/users-reducer";
import { withRouter } from "../hoc/withRouter";
import Users from "./users";

type WithRouterPropsType = {
  router: RouterPropsType,
}
type RouterPropsType = {
  location : {
    pathname: string
  }
}

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFollowingInProgress:  Array<number>   
  totalUsersCount: number
  usersData: Array<UserType>
  isFetching: boolean
  pathName: string
}
type MapDispatchPropsType = {
  setPathName: (pathname: string) => void
  getUsers: (pageNumber: number, pageSize: number) => void
  postFollow: (id: number) => void
  deleteFollow: (id: number) => void
}


type PropsType = MapStatePropsType & MapDispatchPropsType & RouterPropsType & WithRouterPropsType
  

class UsersAPIComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname)
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  componentWillUnmount() {
    this.props.setPathName("");
  }
  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        <Users
          postFollow={this.props.postFollow}
          deleteFollow={this.props.deleteFollow}
          isFollowingInProgress={this.props.isFollowingInProgress}
          totalItemsCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          usersData={this.props.usersData}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          isFetching={this.props.isFetching}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  usersData: getUsersData(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  isFollowingInProgress: getIsFollowingInProgress(state),
  isFetching: getIsFetching(state),
  pathName: state.app.pathName,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, WithRouterPropsType, AppStateType>(mapStateToProps, {
    getUsers,
    postFollow,
    deleteFollow,
    setPathName
  }),
  withRouter
)(UsersAPIComponent);
