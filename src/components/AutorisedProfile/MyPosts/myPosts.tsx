import React from "react";
import { PostType } from "../../../redux/profile-reducer";
import PostsForm from "../../Forms/postsForm";
import classes from "./myPosts.module.css";
import Post from "./Post/Post";

type PropsType = {
  newPostActionCreator: (value: string) => void
  postsData: Array<PostType>
}

const MyPosts: React.FC<PropsType> = (props) => {
  let addPost = (value: string) => {
    props.newPostActionCreator(value);
  };
  
  return (
    <div className={classes.posts_area}>
      <h3> My posts </h3>
      <div className={classes.post_adding}>
        <PostsForm onSubmit={addPost}/>
      </div>
      <div className={classes.posts}>
        {props.postsData.map((p) => (
          <Post message={p.message} likes_count={p.likes_count} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
