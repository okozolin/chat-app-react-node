import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;

function App() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:3002");

    socket.on("connect", function () {
      console.log("Connected socket");
    });
  }, []);

  useEffect(() => {
    socket.on("message", ({ id, msg }) => {
      // Add new messages to existing messages list
      console.log("chat", chat);
      setChat([...chat, { id, msg }]);
    });
  }, [chat]);

  const handleTextChange = (e) => {
    const _text = e.target.value;
    setText(_text);
  };

  const handleMessageSubmit = () => {
    console.log("message in handle message Submit", text);
    socket.emit("message", text);
    setText("");
  };

  const renderChat = (
    <div>
      {chat.map(({ id, msg }, idx) => (
        <div key={idx}>
          <span style={{ color: "green" }}>{id}: </span>

          <span>{msg}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="App">
      <input onChange={handleTextChange} value={text} />
      <button onClick={handleMessageSubmit}>Send</button>
      {renderChat}
    </div>
  );
}

export default App;
