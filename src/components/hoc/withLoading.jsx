import React from "react";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/preloader";
let mapStateToProps = (state) => ({
  isFetching: state.usersPage.isFetching,
});
export const withLoader = (Component) => {
  const LoadingComponent = (props) => {
    if (props.isFetching) return <Preloader />
    return <Component {...props}/>;
  };
  let ConnectedLoadingComponent = connect(mapStateToProps)(LoadingComponent);
  return ConnectedLoadingComponent;
};
