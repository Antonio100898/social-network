import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { userApi } from "../components/API/api";
import { PhotosType } from "./profile-reducer";

interface InitialState {
  usersData: Array<any> | Array<UserType>
  currentPage: number
  totalUsersCount: number
  pageSize: number
  isFetching: boolean
  isFollowingInProgress:  Array<number> | Array<any>
}
export type UserType = {
  name: string;
  id: number;
  photos: PhotosType;
  status: string | null;
  followed: boolean;
};

let initialState = {
  usersData: [],
  currentPage: 1,
  totalUsersCount: 0,
  pageSize: 10,
  isFetching: false,
  isFollowingInProgress: []
} as InitialState
// const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
//   switch (action.type) {
//     case FOLLOW:
//       return {
//         ...state,
//         usersData: state.usersData.map((u) => {
//           if (u.id == action.userId) {
//             return { ...u, followed: true }
//           }
//           return u
//         })
//       };
//     case UNFOLLOW:
//       return {
//         ...state,
//         usersData: state.usersData.map((u) => {
//           if (u.id == action.userId) {
//             return { ...u, followed: false };
//           }
//           return u;
//         }),
//       };
//     case SET_USERS:
//       return { ...state, usersData: [...action.userData] };

//     case SET_CURRENT_PAGE:
//       return { ...state, currentPage: action.currentPage };

//     case SET_TOTAL_USERS:
//       return { ...state, totalUsersCount: action.totalUsersCount };

//     case SET_IS_FETCHING:
//       return { ...state, isFetching: action.isFetching };
//     case FOLLOWING_PROGRESS:
//       return {
//         ...state,
//         isFollowingInProgress: action.inProgress
//           ? [...state.isFollowingInProgress, action.userId]
//           : [state.isFollowingInProgress.filter((id) => id != action.userId)],
//       };

//     default:
//       return state;
//   }
// };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setTotalUsersCount(state, action: PayloadAction<number>) {
      state.totalUsersCount = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setUsers(state, action: PayloadAction<Array<UserType>>) {
      state.usersData = [...action.payload]
    },
    followUser(state, action: PayloadAction<number>) {
      state.usersData = state.usersData.map((u) => {
        if (u.id == action.payload) {
          return {...u, followed: true}
        }
        return u
      })
    },
    unFollowUser(state, action: PayloadAction<number>) {
      state.usersData = state.usersData.map((u) => {
        if (u.id == action.payload) {
          return {...u, followed: false}
        }
        return u
      })
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
    followingInProgress(state, action: PayloadAction<FollowingProgress>) {
      state.isFollowingInProgress = action.payload.inProgress
        ? [...state.isFollowingInProgress, action.payload.userId]
        : [state.isFollowingInProgress.filter((id) => id != action.payload.userId)]
    }
  }
})
type FollowingProgress = {
  userId: number
  inProgress: boolean
}
// ActionCreators:
// export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
//   type: SET_TOTAL_USERS,
//   totalUsersCount: totalUsersCount,
// });

// export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
//   type: SET_CURRENT_PAGE,
//   currentPage: currentPage,
// });

// export const setUsers = (usersData: Array<UserType>): SetUsersActionType => ({
//   type: SET_USERS,
//   usersData: usersData,
// });

// const followUser = (userId: number): FollowUserActionType => ({ type: FOLLOW, userId });

// const unFollowUser = (userId: number): UnFollowUserActionType => ({ type: UNFOLLOW, userId });

// export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
//   type: SET_IS_FETCHING,
//   isFetching: isFetching,
// });
// export const FollowingInProgress = (userId: number, inProgress: boolean): FollowingInProgressActionType => ({
//   type: FOLLOWING_PROGRESS,
//   userId,
//   inProgress,
// });

 const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
   dispatch(followingInProgress({userId: userId, inProgress: true}));
   const response = await apiMethod(userId);
   if (response.data.resultCode === 0) {
     dispatch(actionCreator(userId));
   }
   dispatch(followingInProgress({userId: userId, inProgress: false}));
 };
export const {followingInProgress, setIsFetching, setCurrentPage, setUsers, setTotalUsersCount, followUser, unFollowUser} = userSlice.actions

//Thunk:
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch(setIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  const response = await userApi.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
};

 export const postFollow = (userId: number) => async (dispatch: any) => {
  let actionCreator = followUser;
   let apiMethod = userApi.followUser.bind(userApi);
   followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
 };
 export const deleteFollow = (userId: number) => async (dispatch: any) => {
   let actionCreator = unFollowUser;
   let apiMethod = userApi.unfollowUser.bind(userApi);
   followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
 };

export default userSlice.reducer;