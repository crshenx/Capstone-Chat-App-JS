export const AUTH_TOKEN_ID = "jwt";
export const HOST = window.location.host.split(":")[0];
let WS_PROTO = HOST.includes("local") ? "ws" : "wss";
export const WS_BASE_URL = `${WS_PROTO}://${window.location.host}`;
export const API_VER = `/api/v1/`;
export const LOGIN_ENDPOINT = `${API_VER}login`;
export const SIGNUP_ENDPOINT = `${API_VER}users`;
export const ROOMS_ENDPOINT = `${API_VER}rooms`;
export const MESSAGES_ENDPOINT = `${API_VER}messages`;
