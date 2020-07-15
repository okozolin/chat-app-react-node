const users = [];

const addUser = ({ id, nickname, room }) => {
  nickname = nickname ? nickname.trim().toLowerCase() : null;

  const existingUser = users.find(
    (user) => user.room === room && user.nickname === nickname
  );

  if (existingUser) {
    return { error: "Nickname already taken" };
  }

  const user = { id, nickname, room };
  users.push(user);
  console.log("{user}", { user });
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, removeUser, getUser };
