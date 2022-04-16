import React from "react";
import ProfileSettingsForm from "../Forms/profileSettingsForm";

const Settings = ({currentProfile, updateProfile, userId}) => {
  return (
    <div>
      Have to fill every field here in every small change, except concatcs fields.
      <ProfileSettingsForm currentProfile={currentProfile} updateProfile={updateProfile} userId={userId}/>
    </div>
  );
};

export default Settings;
