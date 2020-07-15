import React from "react";
// import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, nickname }) => {
  let isSentByCurrentUser = false;

  const trimmedName = nickname.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        {/* <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p> */}
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        {/* <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> */}
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
