import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./view/Profile";
import Login from "./view/Login";
import Signup from "./view/Signup";
import Chat from "./view/Chat";
import { ThemeProvider } from "react-bootstrap";
function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
