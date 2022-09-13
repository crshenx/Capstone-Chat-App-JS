import React, { useState, useEffect, useContext, createContext } from "react";
import {
  checkStatus,
  rmJwtAsCookie,
  getCookie,
  saveJwtAsCookie,
} from "../utils/util";
import {
  AUTH_TOKEN_ID,
  BASE_URL,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../config";

import consumer from "../channels/consumer";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function storeUsr(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

function getUsr() {
  try {
    return JSON.parse(sessionStorage.getItem("user"));
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
        sessionStorage.setItem(AUTH_TOKEN_ID, data.jwt);
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
        sessionStorage.setItem(AUTH_TOKEN_ID, data.jwt);
        saveJwtAsCookie();
        const user = { username, bio, avatar };
        setUser(user);
        storeUsr(user);
        return user;
      });
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN_ID);
    sessionStorage.removeItem("user");
    rmJwtAsCookie();
    setUser(null);
    consumer.disconnect();
  };

  const isAuthed = () => {
    return (
      user &&
      sessionStorage.getItem(AUTH_TOKEN_ID) &&
      getCookie("X-Authorization")
    );
  };

  return {
    user,
    isAuthed,
    login,
    logout,
    signup,
  };
}
