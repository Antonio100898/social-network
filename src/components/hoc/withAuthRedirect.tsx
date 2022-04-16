import { Navigate} from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  isAuthorised: boolean
}

let mapStateToProps = (state: AppStateType) => {
    return {
      isAuthorised: state.auth.isAuthorised,
    };
  };

export const withAuthRedirect = (Component: any) => {
  
    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
         
            if (!props.isAuthorised) return <Navigate to={"/login"}/>
            return <Component {...props}/>
        }
    
    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}