import React from "react";
import classes from "./form.module.css";

export const Input = ({input, meta, placeholder, type}) => {
    return <div className={classes.field}>
    <input className={meta.error && meta.touched? classes.input + " " + classes.error : classes.input}  {...input} type={type} placeholder={placeholder} />
    {meta.touched && meta.error && <div className={classes.errors}>{meta.error}</div>}
  </div>
}