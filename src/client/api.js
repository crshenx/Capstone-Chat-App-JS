import {
  AUTH_TOKEN_ID,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  BASE_URL,
  ROOMS_ENDPOINT,
  MESSAGES_ENDPOINT,
} from "../config";
import { checkStatus } from "../utils/util";

const API = {
  /**
   * HTTP GET
   * @param {String} url - api endpoint
   * @param {Object} [headers=DEFAULT_HEADERS] - request headers
   * @returns {Promise} request promise, rejects on bad status
   */
  get(
    url,
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AUTH_TOKEN_ID)}`,
    }
  ) {
    return fetch(url, {
      method: "GET",
      headers,
    }).then(checkStatus);
  },
  /**
   * HTTP POST
   * @param {String} url - api endpoint
   * @param {Object} payload - data payload
   * @param {Object} [headers=DEFAULT_HEADERS] - request headers
   * @returns {Promise} request promise, rejects on bad status
   */
  post(
    url,
    payload,
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AUTH_TOKEN_ID)}`,
    }
  ) {
    return fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    }).then(checkStatus);
  },
  /**
   * Create chat room
   * @param {String} name - chatroom name
   * @returns {Promise} request promise, rejects on bad status
   */
  createRoom(name, isPrivate = false) {
    return this.post(BASE_URL + ROOMS_ENDPOINT, {
      room: {
        name,
        is_private: isPrivate,
      },
    });
  },
  /**
   * Gets ALL public chat rooms
   * @returns {Promise<Array>} resolves array of rooms
   */
  getRooms() {
    return this.get(BASE_URL + ROOMS_ENDPOINT);
  },
  /**
   * Gets all messages for a given room
   * @param {String | Number} roomID - room ID number
   * @returns
   */
  getMessages(roomID) {
    const url = `${MESSAGES_ENDPOINT}?${new URLSearchParams({
      roomID: roomID,
    })}`;
    return this.get(BASE_URL + url);
  },
  /**
   * Authenticate with server
   * @param {String} username - username
   * @param {String} password - password
   * @returns {Promise}
   */
  login(username, password) {
    return this.post(
      `${BASE_URL}${LOGIN_ENDPOINT}`,
      { user: { username, password } },
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
  },
  /**
   * Authenticate with server
   * @param {String} username - username
   * @param {String} password - password
   * @param {String} bio - profile bio
   * @param {String} avatar - avatar placeholder
   * @returns {Promise}
   */
  signup(username, password, bio = "", avatar = "") {
    return this.post(
      `${BASE_URL}${SIGNUP_ENDPOINT}`,
      {
        user: {
          username,
          password,
          bio,
          avatar,
        },
      },
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
  },
};

export default API;

window.API = API;
