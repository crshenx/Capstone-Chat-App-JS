export const AUTH_TOKEN_ID = "jwt";
export const protocol = "http";
export const PORT = "3000";
export const HOST = window.location.host.split(":")[0];
export const BASE_URL = `${protocol}://${HOST}:${PORT}`;
export const loginEndpoint = "/api/v1/login";
export const signupEndpoint = "/api/v1/users";
