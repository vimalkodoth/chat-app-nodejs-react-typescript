import "regenerator-runtime/runtime";
import {
  addUser,
  getUser,
  removeUser,
  getUsersByRoom,
  findUserByRoomAndName,
} from "./users.js";

describe("Testing users", () => {
  test("add user", async () => {
    const users = [];
    const user = {
      id: "id-123",
      nickname: "nickname",
      room: "room",
    };
    expect(addUser(user.id, user.nickname, user.room, users)).toMatchObject([
      user,
    ]);
  });

  test("get user", async () => {
    const user = {
      id: "id-123",
      nickname: "nickname",
      room: "room",
    };
    const initialUsers = [user];
    expect(getUser(user.id, initialUsers)).toMatchObject(user);
  });

  test("remove user", async () => {
    const initialUsers = [
      {
        id: "id-123",
        nickname: "nickname",
        room: "room",
      },
    ];
    const { users, user } = removeUser("id-123", initialUsers);
    expect(users).toStrictEqual([]);
    expect(user).toMatchObject(initialUsers[0]);
  });

  test("getUsersByRoom", async () => {
    const user = {
      id: "id-123",
      nickname: "nickname",
      room: "room",
    };
    const initialUsers = [user];
    const users = getUsersByRoom("room", initialUsers);
    expect(users).toStrictEqual(initialUsers);
  });

  test("findUserByRoomAndName", async () => {
    const user = {
      id: "id-123",
      nickname: "nickname",
      room: "room",
    };
    const initialUsers = [user];
    const users = findUserByRoomAndName("nickname", "room", initialUsers);
    expect(users).toStrictEqual(user);
  });
});
