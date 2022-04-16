import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { profileApi } from "../components/API/api";
import { AppStateType } from "./redux-store";

const ADD_NEW_POST = "profile/ADD-NEW-POST";
const SET_CURRENT_PROFILE = "profile/SET_CURRENT_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_ISFETCHING = "profile/SET_ISFETCHING";
const SET_NEW_PHOTO = "SET_NEW_PHOTO";

export type PostType = {
  id: number
  message: string
  likes_count: number
}
type ContactsType = {
  github: string | undefined
  vk: string | undefined
  facebook: string | undefined
  instagram: string | undefined
  twitter: string | undefined
  website: string | undefined
  youtube: string | undefined
  mainLink: string | undefined
}
export type PhotosType = {
  small: string | undefined
  large: string | undefined
}
export type ProfileType = {
  userId: number | null
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
}
type InitialStateType = typeof initialState
let initialState = {
  postsData: [
    {
      id: 1,
      message: "Hello! I just got signed in for the first time.",
      likes_count: 15,
    },
    {
      id: 2,
      message: "I think it's cool app.",
      likes_count: 17,
    },
    {
      id: 3,
      message: "How do I upload my photos from iPhone??.",
      likes_count: 25,
    },
    {
      id: 4,
      message: "Anyone who wanna add me to friend dont be shy!!.",
      likes_count: 20,
    },
  ]as Array<PostType>,
  newPost: "",
  currentProfile: {} as ProfileType,
  status: "" as string | undefined,
  isFetching: false,
}
const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_ISFETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case ADD_NEW_POST: {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: 5, message: action.value, likes_count: 0 },
        ],
      };
    }
    case SET_CURRENT_PROFILE:
      return { ...state, currentProfile: { ...action.data } };
    case SET_STATUS:
      return { ...state, status: action.status };
      case SET_NEW_PHOTO:
        return {
          ...state,
          currentProfile: {...state.currentProfile, photos: action.photos}
        }
    default:
      return state;
  }
};

// ActionCreators:
type SetIsFetchingActionType = {
  type: typeof SET_ISFETCHING
  isFetching: boolean
}
type SetCurrentProfileActionType = {
  type: typeof SET_CURRENT_PROFILE
  data: ProfileType
}
type NewPostActionCreatorActionType = {
  type: typeof ADD_NEW_POST
  value: string
}
type SetUserStatusActionType = {
  type: typeof SET_STATUS
  status: string | undefined
}
type SetNewPhotoActionType = {
  type: typeof SET_NEW_PHOTO
  photos: PhotosType
}
type ActionTypes = SetIsFetchingActionType | SetCurrentProfileActionType | NewPostActionCreatorActionType | SetUserStatusActionType | SetNewPhotoActionType
const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: SET_ISFETCHING, isFetching });
export const setCurrentProfile = (data: ProfileType): SetCurrentProfileActionType => ({
  type: SET_CURRENT_PROFILE,
  data,
});
export const newPostActionCreator = (value: string): NewPostActionCreatorActionType => ({ type: ADD_NEW_POST, value });
export const setUserStatus = (status: string | undefined): SetUserStatusActionType => ({ type: SET_STATUS, status });
const setNewPhoto = (photos: PhotosType): SetNewPhotoActionType => ({
  type: SET_NEW_PHOTO,
  photos
})

//Thunk:
export const getProfile = (userId: number | null): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
  dispatch(setIsFetching(true));
  const response = await profileApi.getProfile(userId);
    dispatch(setIsFetching(false));
    dispatch(setCurrentProfile(response.data));
};
export const getUserStatus = (userId: number | null): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
  dispatch(setIsFetching(true));
  const response = await profileApi.getStatus(userId);
    dispatch(setIsFetching(false));
    dispatch(setUserStatus(response.data));
};
export const setStatus = (status: string | undefined): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
  dispatch(setIsFetching(true));
  const response = await profileApi.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setIsFetching(false));
    }
};
export const setProfilePhoto = (file: any): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
  const response = await profileApi.updateProfilePhoto(file);
  if (response.data.resultCode === 0) {
  dispatch(setNewPhoto(response.data.photos));
  }
}
export const updateProfile = (data: ProfileType): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
  await profileApi.putProfile(data);
}

export default profileReducer;
