import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth } from "./hooks/use-auth";
import { saveJwtAsCookie } from "./utils/util";
import { AUTH_TOKEN_ID, BASE_URL } from "./config";

import consumer from "./channels/consumer";

window.CONSUMER = consumer;

window.createConnection = () => {
  window.CHAT_CHANNEL = consumer.subscriptions.create(
    { channel: "ChatChannel", room: "Main" },
    {
      received(data) {
        console.log(data);
      },
    }
  );
};

window.SubRooms = () => {
  window.ROOMS_CHANNEL = consumer.subscriptions.create(
    { channel: "rooms" },
    {
      received(data) {
        console.log(data);
        console.log(JSON.stringify(data));
      },
    }
  );
};

window.CREATE_ROOM = (name) => {
  return fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
    },
    body: JSON.stringify({
      room: {
        name: name,
        is_private: false,
      },
    }),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};
window.SET_COOKIE = () => {
  saveJwtAsCookie();
};

window.SEND_MSG = (data) => {
  window.CHAT_CHANNEL.send({ body: data });
};

window.PERFORM_CUSTOM_EVENT = (data) => {
  window.CHAT_CHANNEL.perform("customevent", { body: data });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
