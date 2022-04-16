import React from "react";
import { ProfileType } from "../../redux/profile-reducer";
import ProfileStatus from "./profileStatus";
import classes from "./profile_info.module.css";

type PropsType = {
  onSubmit: (file: any) => void
  currentProfile: ProfileType
  setStatus: (status: string | undefined) => void
  status: string | undefined
}

const AutorisedProfileInfo = (props: PropsType) => {
  const onFileChoosen = (e: any) => {
    props.onSubmit(e.target.files[0]);
    console.log("could not fix the error with a photo");
  };
  return (
    <div className={classes.profile_content}>
      <div>
        <img
          className={classes.profile_picture}
          src={
            (props.currentProfile.photos &&
              props.currentProfile.photos.large) ||
            props.currentProfile.photos.small
          }
          alt="avatar"
        />
        <div>
          <input
            onChange={onFileChoosen}
            type="file"
            placeholder="update photo"
          />
        </div>
        <div className={classes.status}>
          <ProfileStatus setStatus={props.setStatus} status={props.status} />
        </div>
      </div>

      <div className={classes.profile_info}>
        <div className={classes.item}>
          <b>Name</b> : {props.currentProfile.fullName}
        </div>
        <div className={classes.item}>
          <b>Looking for a job</b> :{" "}
          {props.currentProfile.lookingForAJob ? "yes" : "no"}
        </div>
        <div className={classes.item}>
          <b>Looking for a job</b> :{" "}
          {props.currentProfile.lookingForAJobDescription &&
            props.currentProfile.lookingForAJobDescription}
        </div>
        {Object.keys(props.currentProfile.contacts).map(
          (c) =>
          //@ts-ignore
            props.currentProfile.contacts[c] && (
              <Contact
                key={c}
                property={c}
                //@ts-ignore
                value={props.currentProfile.contacts[c]}
              />
            )
        )}
      </div>
    </div>
  );
};
  type ContactPropsType = {
    property: string | undefined
    value: string | undefined
  }

const Contact: React.FC<ContactPropsType> = ({ property , value }) => {
  return (
    <div>
      <div className={classes.item}>
        <b>{property}</b> : <span>{value}</span>
      </div>
    </div>
  );
};
export default AutorisedProfileInfo;
