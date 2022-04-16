const SEND_MESSAGE = "messages/SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "messages/UPDATE-MESSAGE-TEXT";

type InitialStateType = {
  dialogsData: Array<DialogsDataType>
  messagesData: Array<MessagesDataType>
}
type DialogsDataType = {
  name: string
  id: string
}
type MessagesDataType = {
  id: number
  message: string
}
type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE
  value: string
}
type UpdateMessageTextActionCreatorType = {
  type: typeof UPDATE_MESSAGE_TEXT
  chengedMessageArea: string
}

let initialState = {
  dialogsData: [
    {
      name: "Anton",
      id: "1",
    },
    {
      name: "Dima",
      id: "4",
    },
    {
      name: "Alex",
      id: "2",
    },
    {
      name: "Sasha",
      id: "3",
    },
    {
      name: "Ilya",
      id: "5",
    },
  ],
  messagesData: [
    {
      id: 1,
      message: "Hello",
    },
    {
      id: 2,
      message: "How are you",
    },
    {
      id: 3,
      message: "Good",
    },
    {
      id: 4,
      message: "I'll talk to you later",
    },
  ],
}
const messagesReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
     
      return {
        ...state,
      messagesData : [...state.messagesData, {id: 5, message: action.value}],
      }
    }
    default:
      return state;
  }
};
 

export const sendMessageActionCreator = (value: string): SendMessageActionCreatorType => ({ type: SEND_MESSAGE, value });

export const updateMessageTextActionCreator = (newMessageText: string): UpdateMessageTextActionCreatorType => {
  return {
    type: UPDATE_MESSAGE_TEXT,
    chengedMessageArea: newMessageText,
  };
};



export default messagesReducer;
