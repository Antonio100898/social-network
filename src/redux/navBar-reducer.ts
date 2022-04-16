let SET_FRIENDS_LIST = "nav/SET_FRIENDS_LIST";


let initialState = {
  friendsNavBarData:[] as Array<object>,
}



const navBarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FRIENDS_LIST:
      return {...state, friendsNavBarData: [...state.friendsNavBarData, ...action.friendsNavBarData]};
    default:
      return state;
  }
};

export const setFriendsListAC = (friendsNavBarData: Array<object>) => ({type: SET_FRIENDS_LIST, friendsNavBarData});

export default navBarReducer;
