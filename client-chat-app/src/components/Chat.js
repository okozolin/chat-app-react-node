import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Container } from "@material-ui/core";
import Messages from "./Messages";
import InputMsg from "./InputMsg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9bcac5",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  scroll: {
    height: "89vh",
    overflowY: "scroll",
  },
}));

let socket;

const Chat = ({ location }) => {
  const classes = useStyles();

  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:3002";

  // handling users joining chat
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setNickname(name);

    socket.on("connect", function () {
      console.log("Connected socket");
    });

    socket.emit("join", { nickname, room: "default" }, (error) => {
      console.log("nickname joined 'join'", nickname);
      // if (error) {
      //   alert(error.error);
      // }
    });

    //when user disconnects
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, nickname]);

  // handling messages in chat
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, [socket]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("msgSend", message, () => setMessage(""));
    }
  };

  return (
    <Container className={classes.wrapper}>
      <Container className={classes.container}>
        <div className={classes.scroll}>
          <Messages messages={messages} nickname={nickname} />
        </div>
        <InputMsg
          message={message}
          setMessage={setMessage}
          sendMessage={handleMessageSubmit}
        />
      </Container>
    </Container>
  );
};

export default Chat;
