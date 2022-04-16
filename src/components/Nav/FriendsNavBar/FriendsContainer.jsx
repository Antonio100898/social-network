import { connect } from "react-redux";
import { setFriendsListAC } from "../../../redux/navBar-reducer";
import Friends from "./Friends";

let mapStateToProps = (state) => ({
  friendsNavBarData: state.navBar.friendsNavBarData,
});
let mapDispatchToProps = (dispatch) => ({
  setFriendsList: (friendsNavBarData) => dispatch(setFriendsListAC(friendsNavBarData))
})

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);


export default FriendsContainer;
