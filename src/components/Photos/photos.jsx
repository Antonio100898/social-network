import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setPathName } from "../../redux/app-reducer";
import { withRouter } from "../hoc/withRouter";

const Photos = () => {
  return (
    <div>
      Photos
    </div>
  );
};
class PhotosContainer extends Component {
  componentDidMount() {
    this.props.setPathName(this.props.router.location.pathname)
  }
  componentWillUnmount(){
    this.props.setPathName("");
  }
  render() {
    return <Photos/>
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
)(PhotosContainer);
