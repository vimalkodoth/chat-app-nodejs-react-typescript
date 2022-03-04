import { v4 } from "uuid";

/**
 *
 * @param {{user: object, message: string}}
 * @returns {object}
 */
const getFormattedInfoMessage = ({ user, message }) => {
  const hours = new Date(Date.now()).getHours().toString();
  const minutes = new Date(Date.now()).getMinutes().toString();
  return {
    type: "info",
    id: v4(),
    ...(user && { nickname: user.nickname }),
    message: message,
    time: new Date().toUTCString(),
  };
}

export { getFormattedInfoMessage };