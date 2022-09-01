import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// window.createUser = function (name) {
//   const newUserData = {
//     username: name,
//     password: "fartpassword",
//     bio: "farts a lot",
//     avatar: "a fart",
//   };

//   fetch("http://localhost:3000/api/v1/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({ user: newUserData }),
//   })
//     .then((r) => r.json())
//     .then((data) => {
//       // save the token to localStorage for future access
//       // localStorage.setItem("jwt", data.jwt);
//       // save the user somewhere (in state!) to log the user in
//       // setUser(data.user);
//       console.log(data);
//     });
// };

window.createUser = function (name) {
  const newUserData = {
    username: name,
    password: "fartpassword",
    bio: "farts a lot",
    avatar: "a fart",
  };

  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: newUserData }),
  })
    .then((r) => r.json())
    .then((data) => {
      // save the token to localStorage for future access
      localStorage.setItem("jwt", data.jwt);
      // save the user somewhere (in state!) to log the user in
      // setUser(data.user);
      console.log(data);
    });
};

window.loginUser = function (name) {
  const newUserData = {
    username: name,
    password: "fartpassword",
  };

  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: newUserData }),
  })
    .then((r) => r.json())
    .then((data) => {
      // save the token to localStorage for future access
      localStorage.setItem("jwt", data.jwt);
      // save the user somewhere (in state!) to log the user in
      // setUser(data.user);
      console.log(data);
    });
};

// window.viewProfile = () => {
//   let token = localStorage.getItem("jwt");
//   console.log(token);
//   fetch("http://localhost:3000/api/v1/profile", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((r) => r.json())
//     .then((data) => {
//       // save the token to localStorage for future access
//       // localStorage.setItem("jwt", data.jwt);
//       // save the user somewhere (in state!) to log the user in
//       // setUser(data.user);
//       console.log(data);
//     });
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
