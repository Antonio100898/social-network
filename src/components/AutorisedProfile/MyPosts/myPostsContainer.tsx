import { connect } from "react-redux";
import {
  newPostActionCreator, PostType,
} from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import MyPosts from "./myPosts";

type MapStatePropsType = {
  postsData: Array<PostType>
}
let mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData
  }
};


const MyPostsContainer = connect(mapStateToProps, {newPostActionCreator})(MyPosts);

export default MyPostsContainer; 
