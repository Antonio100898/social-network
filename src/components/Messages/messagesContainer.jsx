import {
  sendMessageActionCreator,
} from "./../../redux/messages-reducer";
import Messages from "./messages";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { Component } from "react";
import { setPathName } from "../../redux/app-reducer";
import { withRouter } from "../hoc/withRouter";


class MessagesContainer extends Component{
  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname);
  }
  componentWillUnmount(){
    this.props.setPathName("");
  }
  render() {
    return <Messages {...this.props}/>
    
  }
}

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    pathName: state.app.pathName
  }
};

export default compose(
  connect( mapStateToProps, { sendMessageActionCreator, setPathName} ),
  withAuthRedirect,
  withRouter
)(MessagesContainer);
