import React from "react";
import { Button } from "react-bootstrap";
import { useRequireAuth } from "../hooks/use-require-auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = useRequireAuth();

  return (
    <div>
      Profile
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            auth.logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
        <Button onClick={() => navigate("/chat")}>To Chat</Button>
      </div>
    </div>
  );
}

export default Profile;
