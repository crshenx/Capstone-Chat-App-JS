import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Profile from "./view/Profile";
import Login from "./view/Login";
import Signup from "./view/Signup";

//test commit

function App() {
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
  }, [token]);

  //yet another changes

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

// another change

export default App;
