import React from "react";
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

const Messages = ({ messages, nickname }) => (
  <ScrollToBottom style={{ padding: "5% 0", overflow: "auto", flex: "auto" }}>
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} nickname={nickname} />
        </div>
      ))}
    </div>
  </ScrollToBottom>
);

export default Messages;
