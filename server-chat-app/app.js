const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const { addUser, removeUser, getUser } = require("./helpers/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);

  // user joined the chat
  socket.on("join", ({ nickname, room }, callback) => {
    console.log(`just joined : ${id}: ${nickname}`);
    const { error, user } = addUser({ id, nickname, room });

    if (error) return callback({ error });

    socket.join(user.room);

    // welcomes user to the chat
    socket.emit("message", {
      user: "admin",
      text: `${user.nickname}, welcome to the chat.`,
    });
    // informing averybody else except the user that a new user has joined the chat
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.nickname} has joined!`,
    });
    callback();
  });

  socket.on("msgSend", (message, callback) => {
    const user = getUser(id);
    console.log("msgSend", user, message);
    if (user) {
      console.log("msgSend --user--message: ", user.nickname, message);
      io.to(user.room).emit("message", { user: user.nickname, text: message });
    }
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(id);

    console.log("user had left");
    io.to(user.room).emit("message", {
      user: "admin",
      text: `${user.nickname} has left.`,
    });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`Server listen on *: ${PORT}`));

module.exports = app;
