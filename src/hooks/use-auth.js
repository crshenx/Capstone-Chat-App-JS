import React, { useState, useEffect, useContext, createContext } from "react";
import { checkStatus, rmJwtAsCookie, saveJwtAsCookie } from "../utils/util";
import {
  AUTH_TOKEN_ID,
  BASE_URL,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../config";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function storeUsr(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getUsr() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.warn("no user");
    console.info(err);
    return null;
  }
}

function useProvideAuth() {
  const [user, setUser] = useState(getUsr());

  const login = ({ username, password }) => {
    return fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
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
        saveJwtAsCookie();
        setUser(data.user);
        storeUsr(data.user);
        return data.user;
      });
  };

  const signup = ({ username, password, bio = "", avatar = "" }) => {
    return fetch(`${BASE_URL}${SIGNUP_ENDPOINT}`, {
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
        storeUsr(user);
        return user;
      });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_ID);
    localStorage.removeItem("user");
    rmJwtAsCookie();
    setUser(null);
  };

  const isAuthed = () => {
    return user && localStorage.getItem(AUTH_TOKEN_ID);
  };

  return {
    user,
    isAuthed,
    login,
    logout,
    signup,
  };
}
