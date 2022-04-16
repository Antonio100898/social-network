import React from "react";
import { useLocation, useParams, useResolvedPath, } from "react-router-dom";

export const withRouter = (Component: any) => {
    const ComponentWithRouter = (props: any) => {
        let params = useParams();
        let location = useLocation();
        return (
            <Component {...props} router={{params, location}} />
        );
    }
    return ComponentWithRouter;
} 