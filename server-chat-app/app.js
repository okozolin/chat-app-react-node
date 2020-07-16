const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const randomcolor = require("randomcolor");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

const { addUser, removeUser, getUser } = require("./helpers/users");
// const moment = require("moment");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);

io.on("connection", (socket) => {
  // const { id } = socket.client;
  const id = socket.id;
  const adminColor = "purple";
  console.log(`User connected: ${id}`);

  // user joined the chat
  socket.on("join", ({ nickname, room }, callback) => {
    console.log(`just joined : ${id}: ${nickname}`);
    socket.color = randomcolor();
    const { error, user } = addUser({
      id,
      nickname,
      room,
      color: socket.color,
    });

    if (error) return callback({ error });

    if (user) {
      socket.join(user.room);
      console.log(`${nickname} - joined room --${user.room}`);
    }
    // welcomes user to the chat
    socket.emit("message", {
      user: "admin",
      text: `${user.nickname}, welcome to the chat.`,
      color: adminColor,
      time: new Date(),
    });
    console.log(`sending welcome message to ${user.nickname}`);

    // informing averybody else except the user that a new user has joined the chat
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.nickname} has joined!`,
      color: adminColor,
      time: new Date(),
    });
    console.log(
      `welcome message to everyone that - ${nickname} - joined room --${user.room}`
    );
    callback();
  });

  socket.on("msgSend", (message, callback) => {
    const user = getUser(id);
    console.log("msgSend", user, message);
    if (user) {
      console.log("msgSend --user--message: ", user.nickname, message);
      io.to(user.room).emit("message", {
        user: user.nickname,
        text: message,
        color: user.color,
        time: new Date(),
      });
    }
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(id);

    if (user) {
      console.log(`${user.nickname} user had left`);
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.nickname} has left.`,
        color: adminColor,
        time: new Date(),
      });
    }
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

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
// OR:
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// try {
//   await sequelize.authenticate();
//   server.listen(PORT, () => console.log(`Server listen on *: ${PORT}`));
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = app;
