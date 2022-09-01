import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  // const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  function handleClick() {
    localStorage.removeItem("jwt");
    navigate("/");
  }
  return (
    <div>
      Profile
      <div>
        <Button onClick={handleClick}>Logout</Button>
      </div>
    </div>
  );
}

export default Profile;
