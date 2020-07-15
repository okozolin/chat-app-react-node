import React from "react";

// import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

const Messages = ({ messages, nickname }) => (
  //   <ScrollToBottom className="messages">
  <div>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} nickname={nickname} />
      </div>
    ))}
  </div>

  //   </ScrollToBottom>
);

export default Messages;
