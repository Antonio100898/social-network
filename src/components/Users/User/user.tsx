import { NavLink } from "react-router-dom"
import Preloader from "../../common/Preloader/preloader"
import FollowButton from "./Buttons/followButton"
import UnfollowButton from "./Buttons/unFollowButton"
import classes from "./../users.module.css"

type PropsType = {
  followUser: (userId: number) => void
  unFollowUser: (userId: number) => void
  isFollowingInProgress: Array<number> 
  isFetching: boolean
  photoSmall?: string | null
  photoLarge?: string | null
  id: number
  followed: boolean
  name: string
  status: string | null
}

const User = (props: PropsType) => {
  let onFollowClick = (e: any) => {
    let userId = e.target.id;
    props.followUser(userId);
  };

  let onUnFollowClick = (e: any) => {
    let userId = e.target.id;
    props.unFollowUser(userId);
  };
  if (props.isFetching) {
    return <Preloader />;
  }
  return (
    <div className={classes.user}>
      <div>
      <NavLink to={"/profile/" + props.id}>
        {props.photoSmall !== null ? (
          <img className={classes.ava} src={props.photoSmall} alt="small" />
        ) : (
          <img
            className={classes.ava}
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
            alt="avatar"
          />
        )}
  </NavLink>
        {props.followed ? (
          <UnfollowButton
            isFollowingInProgress={props.isFollowingInProgress}
            id={props.id}
            onUnFollowClick={onUnFollowClick}
          />
        ) : (
          <FollowButton
            isFollowingInProgress={props.isFollowingInProgress}
            id={props.id}
            onFollowClick={onFollowClick}
          />
        )}
      </div>
      <div className={classes.info}>
        <div className={classes.name_and_status_box}>
          
            <div className={classes.name}>{props.name}</div>
          
          <div className={classes.status}>{props.status}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
