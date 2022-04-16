import React from "react";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import classes from "./form.module.css";
import { Input } from "./formControl";


const ProfileSettingsForm = ({ updateProfile, currentProfile }) => {
  const onSubmit = (data) => {
    updateProfile(data);
  };
  const [changingContacts, setChangingcontacts] = useState(false);
  const onButtonClick = () => {
    setChangingcontacts(true);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit}) => (
        <div className={classes.form_wrapper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Field name="fullName">
              {({ input, meta }) => (
                <div>
                  <label>Name</label>
                  <Input
                    placeholder={currentProfile.fullName}
                    type="text"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <Field name="aboutMe">
              {({ input, meta }) => (
                <div>
                  <label>About you</label>
                  <Input
                    placeholder={currentProfile.aboutMe}
                    type="text"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <div>Contacts</div>{" "}
            <button className={classes.buttons} onClick={onButtonClick}>Update contacts</button>
            {changingContacts && (
              <div>
                 {Object.keys(currentProfile.contacts).map(c => <Field key={c} name={"contacts."+ c}>
                  {({ input, meta }) => (
                      <div>
                        
                        <b>{c}</b><Input placeholder={c} type="text" input={input} meta={meta} />
                      </div>
                  )}
                </Field>)}
              </div>
            )}
            <Field type="checkbox" name="lookingForAJob">
              {({ input, meta }) => (
                <div>
                  <label>Are you looking for a job?</label>
                  <Input type="checkbox" input={input} meta={meta} />
                </div>
              )}
            </Field>
            <Field name="lookingForAJobDescription">
              {({ input, meta }) => (
                <div>
                  <label>What kind of job do you search for?</label>
                  <Input
                    placeholder={currentProfile.lookingForAJobDescription}
                    type="text"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
            <div>
              <button className={classes.buttons} type="submit">
                Update profile
              </button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
export default ProfileSettingsForm;
