import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

function Login() {
  const [formData, setformData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const auth = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .login(formData)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
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
