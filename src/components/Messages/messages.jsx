import React from "react";
import classes from "./messages.module.css";
import Message from "./Message/message";
import Dialog from "./Dialogs/dialog";
import MessageForm from "../Forms/newMessageForm";


const Messages = (props) => {
  let sendMessage = (value) => {
    props.sendMessageActionCreator(value);
  };
  

  return (
    <div className={classes.messages_content}>
      <div className={classes.header}>DIALOGS</div>
      <div className={classes.dialogsList}>
        {props.messagesPage.dialogsData.map((d) => (
          <Dialog name={d.name} key={d.id} id={d.id} />
        ))}
      </div>
      <div className={classes.messages_window}>
        {props.messagesPage.messagesData.map((m) => (
          <Message message={m.message} key={m.id} />
        ))}
      </div>
      <div className={classes.addMessage}>
        <MessageForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default Messages;
