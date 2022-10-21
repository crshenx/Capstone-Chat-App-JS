export const AUTH_TOKEN_ID = "jwt";
// export const protocol = "http";
// changed to https instead of http
export const protocol = "https";
//port changed for heroku
// export const PORT = "3000";
export const PORT = "443";
export const HOST = window.location.host.split(":")[0];
// export const BASE_URL = `${protocol}://${HOST}:${PORT}`;
export const BASE_URL = `${protocol}://capstonechatapp.herokuapp.com`;
export const API_VER = `/api/v1/`;
export const LOGIN_ENDPOINT = `${API_VER}login`;
export const SIGNUP_ENDPOINT = `${API_VER}users`;
export const ROOMS_ENDPOINT = `${API_VER}rooms`;
export const MESSAGES_ENDPOINT = `${API_VER}messages`;
