import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./profile_info.module.css";

type PropsType = {
  status: string | undefined
  setStatus: (status: string | undefined) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setLocalStatus] = useState(props.status);
  useEffect(() => {
    setLocalStatus(props.status);
  }, [props.status]);

  const onHandleValueChange = (e: any) => {
    setLocalStatus(e.target.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    if (status !== props.status) {
      props.setStatus(status);
    }
    setEditMode(false);
  };
  return (
    <div>
      <div>
        <span className={classes.status_main}> Status : </span>
        {!editMode && (
          <span onClick={activateEditMode} className={classes.status_value}>
            {status}
          </span>
        )}
        {editMode && (
          <span>
            <input
              className={classes.status_input}
              autoFocus={true}
              onBlur={deactivateEditMode}
              value={status}
              onChange={onHandleValueChange}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileStatus;
