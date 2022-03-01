/**
 * users model
 * @type {Array<Object>} - list of users
 */
export let users = [];

/**
 * set users
 * @param {Array<Object>} list - list of users
 * @returns {void}
 */
export const setUsers = (list) => (users = list);

/**
 * get users
 * @returns {Array<Object>} - list of users
 */
export const getUsers = () => users;
