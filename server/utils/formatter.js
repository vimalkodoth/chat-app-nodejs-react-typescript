import { v4 } from "uuid";

/**
 *
 * @param {{user: object, message: string}}
 * @returns {object}
 */
export function getFormattedInfoMessage({ user, message }) {
  return {
    type: "info",
    id: v4(),
    ...(user && { nickname: user.nickname }),
    message: message,
    time: `${new Date(Date.now()).getHours()}:${new Date(
      Date.now()
    ).getMinutes()}`,
  };
}
