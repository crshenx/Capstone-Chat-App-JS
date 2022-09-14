import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Profile from "./view/Profile";
import Login from "./view/Login";
import Signup from "./view/Signup";
import Chat from "./view/Chat";
import { ThemeProvider } from "react-bootstrap";
// import { ProvideAuth, useAuth } from "./hooks/use-auth";
import Rooms from "./view/Rooms";
function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!auth.user) {
  //     navigate("login");
  //   }
  // }, [auth.user]);

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
          {/* <Route path="rooms" element={<Rooms />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
