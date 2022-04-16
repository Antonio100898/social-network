import React from "react";
import { Form, Field } from "react-final-form";
import classes from "./form.module.css";
import { Input } from "./formControl";
import {onlyEngNoDigits, onlyDigits, required} from "./Utils/Validators/index";

const TestForm = () => {
  const onSubmit = (values) => {
    window.alert(JSON.stringify(values));
  };

  const composeValidators = (...validators) => (value) => (
    validators.reduce((error, validator) => error || validator(value), undefined));

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, submitting, form }) => (
        <div className={classes.form_wrapper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Field validate={composeValidators(required, onlyEngNoDigits)} name="firstname">
              {({ input, meta }) => (
                <Input
                  placeholder="First name"
                  type="text"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>
            <Field validate={composeValidators(required, onlyEngNoDigits)} name="lastname">
              {({ input, meta }) => (
                <Input
                  placeholder="Last name"
                  type="text"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>
            <Field validate={composeValidators(required, onlyDigits)} name="age">
              {({ input, meta }) => (
                <Input
                  placeholder="Age"
                  type="text"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>
            <Field validate={composeValidators(required, onlyDigits)} name="phone">
              {({ input, meta }) => (
                <Input
                  placeholder="+(972) 54 908 2507"
                  type="text"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>
            <Field validate={required} name="email">
              {({ input, meta }) => (
                <Input
                  placeholder="E-mail"
                  type="text"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>

            <div>
              <button className={classes.buttons} type="submit">
                Submit
              </button>
              <button onClick={form.reset} disabled={submitting || pristine} type="button">Reset</button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
export default TestForm;
