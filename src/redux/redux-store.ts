import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth-reducer";
import messagesReducer from "./messages-reducer";
import navBarReducer from "./navBar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./app-reducer";


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


let rootReducer = combineReducers({
  navBar: navBarReducer,
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
// @ts-ignore
window._store = store;