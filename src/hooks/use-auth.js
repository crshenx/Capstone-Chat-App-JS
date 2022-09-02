import React, { useState, useEffect, useContext, createContext } from "react";
import { checkStatus } from "../utils/util";

const authContext = createContext();

const AUTH_TOKEN_ID = "jwt";
const protocol = "http";
const PORT = "3000";
const HOST = window.location.host.split(":")[0];
const BASE_URL = `${protocol}://${HOST}:${PORT}`;
const loginEndpoint = "/api/v1/login";
const signupEndpoint = "/api/v1/users";

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = ({ username, password }) => {
    return fetch(`${BASE_URL}${loginEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then(checkStatus)
      .then((data) => {
        localStorage.setItem(AUTH_TOKEN_ID, data.jwt);
        setUser(data.user);
        return data.user;
      });
  };

  const signup = ({ username, password, bio = "", avatar = "" }) => {
    return fetch(`${BASE_URL}${signupEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          bio,
          avatar,
        },
      }),
    })
      .then(checkStatus)
      .then((data) => {
        localStorage.setItem(AUTH_TOKEN_ID, data.jwt);
        const user = { username, bio, avatar };
        setUser(user);
        return user;
      });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_ID);
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    signup,
  };
}
