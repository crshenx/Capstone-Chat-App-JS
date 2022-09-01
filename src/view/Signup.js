import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function checkStatus(res) {
  if (res.status > 199 && res.status < 300) {
    console.log("status is OK", res.status);
    return res.json();
  }

  return Promise.reject(res.statusText);
}

function Signup() {
  const [newUser, setNewUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const newUserData = (data, value) => {
    console.log("newUser:", newUser);
    console.log("data:", data);
    console.log("value:", value);

    setNewUser({
      ...newUser,
      [data]: value,
    });
  };

  function findFormErrors() {
    const { userName, password, password_confirmation } = newUser;
    const newErrors = {};

    if (!userName || userName === "") newErrors.name = "must choose username";
    else if (userName.length > 30 || userName.length < 3)
      newErrors.name = "wrong username length";
    if (password !== password_confirmation)
      newErrors.password = "password must match confirmation";

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      const user = {
        username: newUser.userName,
        password: newUser.password,
        failure: "fail",
      };
      fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user: user }),
      })
        .then(checkStatus)
        .then((data) => {
          // save the token to localStorage for future access
          // localStorage.setItem("jwt", data.jwt);
          // save the user somewhere (in state!) to log the user in
          console.log("resolved.json", data);
          localStorage.setItem("jwt", data.jwt);
          // setUser(data.user);
          console.log(data);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <Form>
      <Form.Group className="userNameSignup" controlId="formUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter Username"
          onChange={(e) => newUserData("userName", e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="passwordSignup" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          onChange={(e) => newUserData("password", e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className="passwordSignupConfirm"
        controlId="formPasswordConfirm"
      >
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => newUserData("password_confirmation", e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Signup;
