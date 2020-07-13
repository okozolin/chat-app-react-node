import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket = io("http://localhost:3002");

    socket.on("connect", function () {
      console.log("Connected socket");
    });
  }, []);

  const handleTextChange = (e) => {
    const _text = e.target.value;
    setText(_text);
  };

  const handleMessageSubmit = () => {
    console.log("message in handle message Submit", text);
    socket.emit("message", text);
    setText("");
  };

  return (
    <div className="App">
      <input onChange={handleTextChange} value={text} />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default App;
