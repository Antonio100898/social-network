import React from "react";
import { Field, Form } from "react-final-form";
import { Navigate } from "react-router-dom";
import { Input } from "./formControl";
import { required } from "./Utils/Validators";
import classes from "./form.module.css";

const LoginForm = (props) => {
  if (props.isAuthorised) {
    return <Navigate to={"/profile"} />;
  }
  const onSubmit = (data) => {
    props.getLogin(data);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitError, submitFailed }) => (
        <div className={classes.form_wrapper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
              <Field
                validate={required}
                name="email"
                render={({ input, meta }) => (
                  <Input
                    placeholder="E-mail"
                    type="text"
                    input={input}
                    meta={meta}
                  />
                )}
              />
            </div>
            <div>
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <Input
                    placeholder="Password"
                    type="password"
                    input={input}
                    meta={meta}
                  />
                )}
              </Field>
            </div>
            <div>
              <Field name="checkbox" component={"input"} type="checkbox" />
              Remember me
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
          {submitFailed && <div> {submitError}</div>}
          <span className={classes.errors}>
            {props.errorMessage.length > 0 && props.errorMessage[0]}
          </span>
        </div>
      )}
    />
  );
};

export default LoginForm;
