import { getUsers, setUsers } from "../models/users.js";
import { getFormattedInfoMessage } from "../utils/formatter.js";
import {
  addUser,
  getUser,
  removeUser,
  getUsersByRoom,
} from "../utils/users.js";

export default function chat(io) {
  io.on("connection", (socket) => {
    console.info(`User Connected : ${socket.id}`);

    socket.on("join_room", ({ room, nickname }) => {
      let users = getUsers();
      users = addUser(socket.id, nickname, room, users);
      setUsers(users);
      socket.join(room);
      socket.emit(
        "receive_message",
        getFormattedInfoMessage({
          message: `Welcome to chat server!`,
        })
      );
      console.info(`User ${socket.id} Joined ${room}`);
      io.to(room).emit(
        "receive_message",
        getFormattedInfoMessage({
          nickname,
          message: `${nickname} has joined the room`,
        })
      );
      io.to(room).emit("room_users", {
        room: room,
        users: getUsersByRoom(room, users),
      });
    });

    socket.on("send_message", (data) => {
      const { room } = data;
      const users = getUsers();
      const user = getUser(socket.id, users);
      console.info(`User ${user.nickname} has sent ${JSON.stringify(data)}`);
      socket.to(room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.info("User Disconnected", socket.id);
      const currentUsers = getUsers();
      const { users, user } = removeUser(socket.id, currentUsers);
      setUsers(users);
      console.log(users);
      console.info(user);
      if (user) {
        io.to(user.room).emit("room_users", {
          room: user.room,
          users: getUsersByRoom(user.room, users),
        });
        io.to(user.room).emit(
          "receive_message",
          getFormattedInfoMessage({
            user,
            message: `${user.nickname} has left the room`,
          })
        );
      }
    });
  });
}
