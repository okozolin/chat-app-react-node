import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: 22.5,
    padding: "2px 4px",
    width: 300,
    height: 45,
    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.14)",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingLeft: theme.spacing(2),
    fontSize: 14,
  },
}));

const Join = (props) => {
  const classes = useStyles();
  // const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");

  // // update parent component when nickname set
  // useEffect(() => {
  //   if (props.handler) {
  //     props.handler(nickname);
  //   }
  // }, [nickname]);

  // const handleOnClick = (e) => {
  //   setNickname(text);
  //   console.log(`${nickname} -- clicked to join the chat`);
  // };

  const handleOnChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter your Nickname to join the chat"
          inputProps={{ "aria-label": "join chat" }}
          onChange={handleOnChange}
        />
      </Paper>
      <Link
        onClick={(e) => (!nickname ? e.preventDefault() : null)}
        to={`/chat?name=${nickname}`}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#DA0063", marginTop: "15px" }}
        >
          Join
        </Button>
      </Link>
    </>
  );
};

export default Join;
