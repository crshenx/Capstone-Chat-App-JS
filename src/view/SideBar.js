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
import { Form, Button } from "react-bootstrap";
import consumer from "../channels/consumer";
import API from "../client/api";

import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SideBar from "./SideBar";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

const drawerWidth = 240;

export default function PermanentDrawerLeft({ onRoomClick }) {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", is_private: false });

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
  function handleRoomClick(e) {
    e.stopPropagation();
    console.log(`target id: ${e.currentTarget.id}`);
  }

  return (
    <Box sx={{ display: "flex", position: "fixed", height: "100vh" }}>
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
        <List sx={{ overflowY: "auto", height: "80vh" }}>
          {rooms.map((room, index) => (
            // <Link to="/chat">
            <ListItem key={room.id} disablePadding>
              <ListItemButton id={room.id} onClick={onRoomClick}>
                <ListItemText primary={room.name} />
              </ListItemButton>
            </ListItem>
            //  </Link>
          ))}
        </List>
        {/* <Divider /> */}
        <List>
          {/* {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
        {/* <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleChange}
          >
            <Form.Label>Create Room</Form.Label>
            <Form.Control name="name" type="text" placeholder="Choose a Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              name="is_private"
              type="checkbox"
              label="Check the box if you want the room to be private"
              onChange={handleChange}
              // checked={formData.is_private}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
        </Form> */}
        {/* <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleClick}
        >
          <TextField
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box> */}
      </Drawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>Potential Spot for Output</Typography>
        <Typography paragraph>Potential Spot for input?</Typography>
      </Box> */}
    </Box>
  );
}
