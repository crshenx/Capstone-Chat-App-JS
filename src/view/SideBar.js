import React, { useEffect, useState } from "react";
import API from "../client/api";
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
import { Form, Button, ListGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AUTH_TOKEN_ID, BASE_URL, ROOMS_ENDPOINT } from "../config";
import consumer from "../channels/consumer";
import { useAuth } from "../hooks/use-auth";
import Chat from "./Chat";

// import ListItemIcon from "@mui/material/ListItemIcon";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import SideBar from "./SideBar";

const drawerWidth = 240;

export default function PermanentDrawerLeft(
  {
    // rooms,
    // handleChange,
    // handleClick,
  }
) {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", is_private: false });
  const auth = useAuth();
  const loggedIn = auth.isAuthed();
  const navigate = useNavigate();

  // useEffect(() => {
  //   //get initial rooms
  //   fetch(`${BASE_URL}${ROOMS_ENDPOINT}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
  //     },
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       setRooms(data.rooms);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

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
    const name = e.target.name;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = !formData.is_private;
    }
    setFormData({ ...formData, [name]: value });
  }
  //   //console.log(formData);

  function handleClick(e) {
    e.preventDefault();

    // fetch(`${BASE_URL}${ROOMS_ENDPOINT}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
    //   },
    //   body: JSON.stringify({
    //     room: formData,
    //   }),
    // })
    //   .then((data) => {
    //     data.json();
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    API.createRoom(formData.name, formData.is_private).then((data) => {
      console.log(data);
    });
  }

  function handleRoomClick() {}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Rooms
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {rooms.map((room, index) => (
            // <Link to="/chat">
            <ListItem key={room.id} disablePadding>
              <ListItemButton onClick={handleRoomClick}>
                <ListItemText primary={room.name} />
              </ListItemButton>
            </ListItem>
            //  </Link>
          ))}
        </List>
        <Divider />
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
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              onChange={handleChange}
            >
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Choose a Name"
              />
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
          </Form>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {/* <Typography paragraph>Potential Spot for Output</Typography>
        <Typography paragraph>Potential Spot for input?</Typography> */}
      </Box>
    </Box>
  );
}
