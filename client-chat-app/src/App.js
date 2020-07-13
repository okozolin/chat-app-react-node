import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Join from "./components/Join";

let socket;

function App() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    socket = io("http://localhost:3002");

    socket.on("connect", function () {
      console.log("Connected socket");
    });
  }, []);

  useEffect(() => {
    socket.on("message", ({ nickname, text }) => {
      // Add new messages to existing messages list
      // console.log("chat", chat);
      setChat([...chat, { nickname, text }]);
    });
  }, [chat]);

  const handleTextChange = (e) => {
    const _text = e.target.value;
    setText(_text);
  };
  const handleNicknameChange = (e) => {
    const _nickname = e.target.value;
    setNickname(_nickname);
  };

  const handleMessageSubmit = () => {
    console.log("message in handle message Submit", text);
    socket.emit("message", { nickname, text });
    setText("");
  };

  const renderChat = (
    <div>
      {chat.map(({ nickname, text }, idx) => (
        <div key={idx}>
          <span style={{ color: "green" }}>{nickname}: </span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <span>Nickname</span>
      <input onChange={handleNicknameChange} value={nickname} />
      <span>Message</span>
      <input onChange={handleTextChange} value={text} />
      {/* <input onChange={handleTextChange} value={text} /> */}
      <button onClick={handleMessageSubmit}>Send</button>
      {renderChat}
    </div>
  );
}

export default App;
