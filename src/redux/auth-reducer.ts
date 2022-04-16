import { ThunkAction } from "redux-thunk";
import { authApi } from "../components/API/api";
import { AppStateType } from "./redux-store";

const UNSUCCESSFUL_LOGIN = "auth/UNSUCCESSFUL_LOGIN";
const LOGUOT = "auth/LOGUOT";
const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";

export type InitialStateType = typeof initialState
type LogoutActionType = {
  type: typeof LOGUOT
}
type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  data: {
    userId: number 
    email: string 
    login: string 
  }
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
type UnsuccessfulLoginActionType = {
  type: typeof UNSUCCESSFUL_LOGIN
  errorMessage: Array<string>
}
type ActionsType = SetAuthUserDataActionType | LogoutActionType | UnsuccessfulLoginActionType
let initialState = {
  userId: null as number | null,
  email: '',
  login: '',
  isAuthorised: false,
  errorMessage: [] as Array<string> | Array<any>,
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        userId: action.data.userId,
        email: action.data.email,
        login: action.data.login,
        isAuthorised: true
      }
    case LOGUOT:
      return {
        ...state,
        userId: null,
        email: '',
        login: '',
        isAuthorised: false
      }
    case UNSUCCESSFUL_LOGIN:
      return {
        ...state,
        errorMessage: [...action.errorMessage]
      }

    default:
      return state;
  }
};

//ActionCreators

const loguot = (): LogoutActionType => ({ type: LOGUOT });
const setAuthUserData = (userId: number, email: string, login: string): SetAuthUserDataActionType => ({ type: SET_AUTH_USER_DATA, data: { userId, email, login } });
const hangleErrorMessage = (errorMessage: Array<string>): UnsuccessfulLoginActionType => ({ type: UNSUCCESSFUL_LOGIN, errorMessage });

//Thunk: 
export const getAuth = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch: any) => {
  const response = await authApi.authMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login));
  }

}
export const getLogin = (data: LoginDataType): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch: any) => {
  const response = await authApi.login(data)
  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else { dispatch(hangleErrorMessage(response.data.messages)) }

}
export const deleteLogin = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch: any) => {
  const response = await authApi.logout()
  if (response.data.resultCode === 0) {
    dispatch(loguot());
  }


}

export default authReducer;

