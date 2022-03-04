import * as R from "ramda";

/**
 *
 * @param {string} id - socket id
 * @param {string} nickname - nickname to join
 * @param {string} room - chat room
 * @param {string} users - all users
 * @returns {Array<Object>}
 */

const addUser = (id, nickname, room, users) => {
  const user = { id, nickname, room };
  users = R.append(user, users);
  return users;
}

/**
 *
 * @param {string} id - socket id
 * @param {Array<Object>} users - all users
 * @returns {object}
 */

const getUser = (id, users) => {
  return R.find(R.propEq("id", id))(users);
}

/**
 *
 * @param {string} id  - socket id
 * @param {Array<Object>} users - all users
 * @returns {{users: Array<Object; user: object}}
 */

const removeUser = (id, users) => {
  const user = R.find(R.propEq("id", id), users);
  if (user) {
    users = R.reject(R.propEq("id", user.id))(users);
  }
  return { users, user };
}

/**
 *
 * @param {string} room - chat room
 * @param {Array<Object>} users - all users
 * @returns {Array<Object>}
 */

const getUsersByRoom = (room, users) => {
  return R.filter(R.propEq("room", room))(users);
}

/**
 *
 * @param {string} name - user's name
 * @param {string} room - chat room
 * @param {Array<Object>} users - all users
 * @returns {object}
 */

const findUserByRoomAndName = (name, room, users) => {
  const matchNickname = R.propEq("nickname", name);
  const matchRoom = R.propEq("room", room);
  const preds = R.allPass([matchNickname, matchRoom]);
  return R.filter(preds)(users)[0];
}

export { addUser, getUser, removeUser, getUsersByRoom, findUserByRoomAndName };
