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
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
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
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
    }
  ) {
    fetch(url, {
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
  getRooms() {
    return this.get(BASE_URL + ROOMS_ENDPOINT);
  },
  getMessages(roomID) {
    const url = `${MESSAGES_ENDPOINT}?${new URLSearchParams({
      roomID: roomID,
    })}`;
    return this.get(BASE_URL + url);
  },
};

export default API;

window.API = API;
