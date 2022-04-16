import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setPathName } from "../../redux/app-reducer";
import { withRouter } from "../hoc/withRouter";


const Music = () => {
  return (
    <div >
      Music
    </div>
  );
};
class MusicContainer extends Component {
  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname)
  }
  componentWillUnmount(){
    this.props.setPathName("");
  }
  render() {
    return <Music/>
  }
}

let mapStateToProps = (state) => {
  return {
    pathName: state.app.pathName
  };
};
export default compose(
  connect(mapStateToProps, {setPathName}),
  withRouter
)(MusicContainer);

