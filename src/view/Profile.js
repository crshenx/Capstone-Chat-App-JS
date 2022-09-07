import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.isAuthed()) {
      navigate("login");
    }
  }, [auth]);

  function handleClick(e) {
    e.stopPropagation();
    auth.logout();
  }

  function handleToChat() {
    navigate("/chat");
  }
  return (
    <div>
      Profile
      <div>
        <Button onClick={handleClick}>Logout</Button>
        <Button onClick={handleToChat}>To Chat</Button>
      </div>
    </div>
  );
}

export default Profile;
