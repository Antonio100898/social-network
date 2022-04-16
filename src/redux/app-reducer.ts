import { getAuth } from "./auth-reducer";

const INITIALIZE = "app/INITIALIZE";
const SET_PATHNAME = "app/SET_PATHNAME";

type InitialStateType = typeof initialState;
type InitializeActionType = {
  type: typeof INITIALIZE,
  payload: 123
}
type SetPathNameActionType = {
  type: typeof SET_PATHNAME
  payload: string 
}


const initialState = {
  initialized: false,
  pathName:  ""
};

const appReducer = (state = initialState, action: InitializeActionType | SetPathNameActionType): InitialStateType => {
  switch (action.type) {
    case INITIALIZE:
      return  {
      ...state,
      initialized: true
    }
    case SET_PATHNAME:
      return {
        ...state,
        pathName: action.payload
      }
      
    default:
      return state;
  }

};

const initializeSucceed = (): InitializeActionType  => ({type: INITIALIZE, payload: 123});

export const setPathName = (pathName: string): SetPathNameActionType => ({type: SET_PATHNAME, payload:pathName})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => dispatch(initializeSucceed()));
}
export default appReducer;

