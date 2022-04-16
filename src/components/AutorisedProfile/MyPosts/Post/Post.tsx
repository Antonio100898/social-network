import React from "react";
import classes from "./Post.module.css";

type PropsType = {
  message: string
  likes_count: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={classes.post}>{props.message}</div>
      <div className={classes.likes}>
        <span>Likes {props.likes_count}</span>
      </div>
    </div>
  );
};

export default Post;
