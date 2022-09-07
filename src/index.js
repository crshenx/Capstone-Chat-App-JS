import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth } from "./hooks/use-auth";
import { saveJwtAsCookie } from "./utils/util";

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
