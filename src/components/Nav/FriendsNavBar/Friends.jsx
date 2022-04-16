import React from "react";
import classes from "./friends.module.css"
import FriendIcon from "./FriendsIcon/friendsIcon";


const Friends = (props) => {
  const friendsNavBarData = [
    {
      id: "1",
      name: "Anton",
      src: "https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "2",
      name: "Alex",
      src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      id: "3",
      name: "Sasha",
      src: "https://s.ws.pho.to/img/index/ai/source.jpg",
    },
    {
      id: "4",
      name: "Dima",
      src: "https://www.canon.fr/media/quality-photo-240_tcm79-1178372.png",
    },
  ];
  if (props.friendsNavBarData.length === 0) {
    props.setFriendsList(friendsNavBarData);
  }
    return (
        <div className={classes.friends}>
          <h4 className={classes.friends_word}>Friends</h4>
          <div className={classes.nav_friends_list}>
          {props.friendsNavBarData.map( f => <FriendIcon friendIcon={f} key={f.id}/>)}
          </div>
        </div>
    );
}
export default Friends;