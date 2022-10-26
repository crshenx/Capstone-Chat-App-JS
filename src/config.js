export const AUTH_TOKEN_ID = "jwt";

// export const protocol = "http";
// changed to https instead of http

// export const protocol = "https";

//port changed for heroku
// export const PORT = "3000";
// hacky and gross
// export const PORT = "443";
export const HOST = window.location.host.split(":")[0];
let PORT = HOST.includes("local") ? 3000 : 443;
let PROTOCOL = HOST.includes("local") ? "http" : "https";
let WS_PROTO = HOST.includes("local") ? "ws" : "wss";
export const WS_BASE_URL = `${WS_PROTO}://${HOST}:${PORT}`;
export const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}`;
export const API_VER = `/api/v1/`;
export const LOGIN_ENDPOINT = `${API_VER}login`;
export const SIGNUP_ENDPOINT = `${API_VER}users`;
export const ROOMS_ENDPOINT = `${API_VER}rooms`;
export const MESSAGES_ENDPOINT = `${API_VER}messages`;
