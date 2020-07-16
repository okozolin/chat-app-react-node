import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
// import ReactEmoji from 'react-emoji';

const useStyles = makeStyles((theme) => ({
  rootDark: {
    background: "#2979FF",
    borderRadius: 10,
    boxShadow: "none",
    color: "white",
    padding: "0px 20px",
    maxWidth: "80%",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    width: "fit-content",
    lineHeight: "1.5",
    fontSize: "13px",
  },
  rootLight: {
    background: "#F3F3F3",
    borderRadius: 10,
    boxShadow: "none",
    color: "black",
    padding: "0px 20px",
    maxWidth: "80%",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    width: "fit-content",
    lineHeight: "1.5",
    fontSize: "13px",
  },
  avatar: {
    color: theme.palette.common.white,
  },
  wrapper: {
    display: "flex",
    padding: "10px 12px 16px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px 0px 16px",
  },
  header: {
    margin: "0px 0px 10px",
  },
  sender: {
    fontSize: "15px",
    fontWeight: "500",
    textTransform: "capitalize",
    color: "rgb(88, 88, 88)",
    letterSpacing: "0.3px",
    paddingLeft: "10px",
  },
  time: {
    fontSize: "11px",
    fontWeight: "300",
    marginLeft: "14px",
    color: "rgb(88, 88, 88)",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Message = ({ message: { text, user, color, time }, nickname }) => {
  const classes = useStyles();
  let isSentByCurrentUser = false;

  const trimmedName = nickname.trim().toLowerCase();
  const firstLetter = user.charAt(0).toUpperCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };

  return isSentByCurrentUser ? (
    <div className={classes.justifyEnd}>
      <div className={classes.wrapper}>
        <div className={classes.body} style={{ alignItems: "flex-end" }}>
          <div className={classes.header}>
            <Moment calendar={calendarStrings} className={classes.time}>
              {time}
            </Moment>
          </div>
          <Paper classes={{ root: classes.rootDark }}>
            <div className="messageBox backgroundBlue">
              {/* <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p> */}
              <p className="messageText colorWhite">{text}</p>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.justifyStart}>
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
          {firstLetter}
        </Avatar>
        <div className={classes.body}>
          <div className={classes.header}>
            <span className={classes.sender}>{user}</span>
            <Moment calendar={calendarStrings} className={classes.time}>
              {time}
            </Moment>
          </div>
          <Paper classes={{ root: classes.rootLight }}>
            {/* <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> */}
            <p className="messageText colorDark">{text}</p>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Message;
