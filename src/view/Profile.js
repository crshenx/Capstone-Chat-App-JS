import React, { useState } from "react";
// import { Button, FormControl } from "react-bootstrap";
import { useRequireAuth } from "../hooks/use-require-auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { InputAdornment } from "@mui/material";
import { Container } from "@mui/system";

function Profile() {
  const navigate = useNavigate();
  const auth = useRequireAuth();
  const [userEdit, setuserEdit] = useState(false);
  console.log(auth.user.username);

  function toggleEdit() {
    setuserEdit(!userEdit);
  }

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
        <Button onClick={() => navigate("/")}>To Chat</Button>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="username"
            label="UserName"
            defaultValue={auth.user.username}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />
          <TextField
            id="bio"
            label="Bio"
            defaultValue={auth.user.bio}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />

          <TextField
            id="username"
            label="Change Password"
            defaultValue={auth.user.username}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />
        </Box>
        <IconButton aria-label="toggle editability" onClick={toggleEdit}>
          {userEdit ? <EditIcon /> : <EditOffIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default Profile;
