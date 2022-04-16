import React from "react";
import {Form, Field} from "react-final-form";
import classes from "./form.module.css";

const MessageForm = (props) => {
    const onSubmit = (value) => {
        props.onSubmit(value.message);
        value.message = "";
    }
    
    
    return ( <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field  name="message" >
                        {({input}) => (
                            <textarea maxLength={300} className={classes.messageArea} {...input} placeholder="write a message" type="text" />
                        )}
                    </Field>
                    <button className={classes.buttons} type="submit">Send</button>
                </form>
            
                
                )}



        />

    );
}

export default MessageForm;