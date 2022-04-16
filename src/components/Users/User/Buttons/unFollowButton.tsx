import React from "react"
//import classes from "./buttons.module.css"
const classes = require("./buttons.module.css")

type PropsType = {
    id: any
    isFollowingInProgress: Array<number> 
    onUnFollowClick: any
}

const UnfollowButton = (props: PropsType) => {
    return (
        <button className={classes.button} disabled={props.isFollowingInProgress.some(id => id == props.id)} id={props.id} onClick={props.onUnFollowClick}>Unfollow</button>
    )
}

export default UnfollowButton
