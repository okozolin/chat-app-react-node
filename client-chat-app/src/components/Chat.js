import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Container, InputBase, Button } from "@material-ui/core";

let socket;

const Chat = ({ location }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:3002";

  // handling users joining chat
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    console.log("name", name);
    socket = io(ENDPOINT);

    setNickname(name);

    socket.on("connect", function () {
      console.log("Connected socket");
    });

    socket.emit("join", { nickname, room: "default" }, (error) => {
      console.log("nickname", nickname);

      if (error) {
        alert(error);
      }
    });

    //when user disconnects
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, nickname]);

  // handling messages in chat
  useEffect(() => {
    socket.on("message", (message) => {
      console.log("message & messages1", message, messages);

      setMessages((messages) => [...messages, message]);
      console.log("message & messages2", message, messages);
    });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (message) {
      console.log("inside handleMessageSubmit ", message);
      socket.emit("msgSend", message, () => setMessage(""));
    }
  };

  console.log("message & messages", message, messages);
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <InputBase
        placeholder="Type your thoughts here...."
        inputProps={{ "aria-label": "join chat" }}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? handleMessageSubmit(e) : null)}
        value={message}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "#2D9BF0", marginTop: "15px" }}
      >
        Send
      </Button>
    </Container>

    // <div>
    //   <div>
    //     <input
    //       placeholder="Type your thoughts here...."
    //       onChange={(e) => setMessage(e.target.value)}
    //       onKeyPress={(e) =>
    //         e.key === "Enter" ? handleMessageSubmit(e) : null
    //       }
    //       value={message}
    //     />
    //   </div>
    // </div>
  );
};

export default Chat;
