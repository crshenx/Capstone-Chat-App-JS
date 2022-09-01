import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function checkStatus(res) {
  if (res.status > 199 && res.status < 300) {
    console.log("status is OK", res.status);
    return res.json();
  }

  return Promise.reject(res.statusText);
}

function Login() {
  const [formData, setformData] = useState({ username: "", password: "" });
  //   const [value, setValue] = useState('')
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: formData }),
    })
      .then(checkStatus)
      .then((data) => {
        // save the token to localStorage for future access
        localStorage.setItem("jwt", data.jwt);
        // save the user somewhere (in state!) to log the user in
        // setUser(data.user);
        console.log(data);
        navigate("/");
      });
  }

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    const newState = { ...formData };
    newState[key] = value;
    console.log(newState);
    setformData(newState);
  }
  return (
    <div>
      <div>Login</div>
      <form>
        <input
          name="username"
          type="text"
          style={{ margin: "10px" }}
          value={formData.name}
          onChange={handleChange}
        ></input>
        <input
          name="password"
          type="text"
          style={{ margin: "10px" }}
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default Login;
