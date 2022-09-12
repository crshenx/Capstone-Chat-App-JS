import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.isAuthed()) {
      navigate("login");
    }
  }, [auth]);

  return (
    <div>
      <SideBar />
      Profile
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            auth.logout();
          }}
        >
          Logout
        </Button>
        <Button onClick={() => navigate("/chat")}>To Chat</Button>
        <Button onClick={() => navigate("/rooms")}>To Rooms</Button>
      </div>
    </div>
  );
}

export default Profile;
