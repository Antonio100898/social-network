import React from "react"
import { UserType } from "../../redux/users-reducer"
import Preloader from "../common/Preloader/preloader"
import Paginator from "./paginator"
import User from "./User/user"
import classes from "./users.module.css"

type PropsType = {
  pageSize: number,
   currentPage: number, 
   onPageChanged: (p: number) => void, 
   totalItemsCount: number, 
   portionSize?: number,
   isFetching: boolean,
   usersData: Array<UserType>,
   unFollowUser: (id: number) => void,
   followUser: (id: number) => void,
   isFollowingInProgress: Array<number>,
}

const Users: React.FC<PropsType> = (props) => {
 
  return (
    <div className={classes.usersWrapper}>
      <div className={classes.header}>Users</div>
      <Paginator pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalItemsCount={props.totalItemsCount}/>
      {props.isFetching ? (
        <div>
          <Preloader/>
        </div>
      ) : (
        <div className={classes.usersList}>
          {props.usersData.map((u) => (
            <User
              unFollowUser={props.unFollowUser}
              followUser={props.followUser}
              isFollowingInProgress={props.isFollowingInProgress}
              photoSmall={u.photos.small}
              photoLarge={u.photos.large}
              followed={u.followed}
              id={u.id}
              name={u.name}
              status={u.status}
              key={u.id}
              isFetching={props.isFetching}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
