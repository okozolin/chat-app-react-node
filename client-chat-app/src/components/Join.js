import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Paper, InputBase, Typography } from "@material-ui/core";
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
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3bc9e0",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e82c82",
    color: theme.palette.common.white,
    marginTop: "15px",
    fontWeight: 600,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "coral",
    },
  },
  link: {
    textDecoration: "none",
  },
  title: {
    color: "#374446",
    textAlign: "center",
    padding: "0px 0px 50px 0px",
  },
}));

const Join = (props) => {
  const classes = useStyles();
  // const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");

  const handleOnChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h4" classes={{ root: classes.title }}>
          Welcome to Orit's chat app
        </Typography>
      </div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter your Nickname to join the chat"
          inputProps={{ "aria-label": "join chat" }}
          onChange={handleOnChange}
        />
      </Paper>
      <Link
        className={classes.link}
        onClick={(e) => (!nickname ? e.preventDefault() : null)}
        to={`/chat?name=${nickname}`}
      >
        <Button variant="contained" className={classes.button}>
          Join
        </Button>
      </Link>
    </div>
  );
};

export default Join;
