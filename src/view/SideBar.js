import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import consumer from "../channels/consumer";
import API from "../client/api";
import DeleteIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import { getSuggestedQuery } from "@testing-library/react";

const drawerWidth = 240;

export default function PermanentDrawerLeft({ onRoomClick }) {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", is_private: false });
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  useEffect(() => {
    API.getRooms()
      .then((data) => {
        console.log(data);
        setRooms(data.rooms);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const sub = consumer.subscriptions.create(
      { channel: "RoomsChannel" },
      {
        received(data) {
          console.log(data);
          setRooms(data.rooms);
        },
        connected() {
          console.log("connected");
        },
      }
    );

    return function cleanup() {
      console.log("unsubbing from rooms channel");
      sub.unsubscribe();
    };
  }, []);

  function handleChange(e) {
    const name = e.target.id;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = !formData.is_private;
    }
    setFormData({ ...formData, [name]: value });
  }

  function handleClick(e) {
    e.preventDefault();
    API.createRoom(formData.name, formData.is_private).then((data) => {
      console.log(data);
      setFormData({ name: "", is_private: false });
    });
  }

  function deleteClick(e) {
    let deleteRoomId = e.currentTarget.id;
    API.deleteRoom(deleteRoomId).then(() => {
      setRooms(
        rooms.filter((room) => {
          return room.id !== Number(deleteRoomId);
        })
      );
    });
  }

  return (
    <Box
      sx={{ mt: "1.5rem", display: "flex", position: "fixed", height: "100vh" }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Create Room
          </Typography>
        </Toolbar>
        <FormGroup>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleClick}
          >
            <FormControlLabel
              control={
                <Checkbox id="is_private" checked={formData.is_private} />
              }
              label="Private"
              onChange={handleChange}
              onSubmit={handleClick}
            />
            <TextField
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </Box>
        </FormGroup>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Rooms
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ overflowY: "auto", height: "80%" }}>
          {rooms.map((room) => (
            <ListItem
              id={room.id}
              key={room.id}
              disablePadding
              // onMouseEnter={toggleHover}
              // onMouseLeave={toggleHover}
            >
              <ListItemButton id={room.id} onClick={onRoomClick}>
                <ListItemText primary={room.name} />
              </ListItemButton>
              <div className="room__delete">
                {/* {hovered ? ( */}
                <IconButton
                  id={room.id}
                  aria-label="delete"
                  size="small"
                  onClick={deleteClick}
                  sx={{ disply: "flex", alignItems: "flex-end" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                {/* // ) : null} */}
              </div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
