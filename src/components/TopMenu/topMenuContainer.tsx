import React from "react";
import TopMenu from "./topMenu";
import { connect } from "react-redux";
import { deleteLogin } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type MapDispatchPropsType = {
  deleteLogin: () => void
}
type MapStatePropsType = {
    isAuthorised: boolean
    nickName: string
    email: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class TopMenuContainer extends React.Component<PropsType> {
  render() {
    return (
      <TopMenu
        isAuthorised={this.props.isAuthorised}
        nickName={this.props.nickName}
        email={this.props.email}
        deleteLogin={this.props.deleteLogin}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuthorised: state.auth.isAuthorised,
  nickName: state.auth.login,
  email: state.auth.email
});

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { deleteLogin })(TopMenuContainer);
