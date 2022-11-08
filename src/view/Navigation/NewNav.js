import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Rooms from "./Rooms";
import API from "../../client/api";
import { useState } from "react";
import { useEffect } from "react";
import consumer from "../../channels/consumer";
import Chat from "../Chat";
import MessageFeed from "../Chat/MessageFeed";
import MessageInput from "../Chat/MessageInput";
import { useRef } from "react";
import { AccountCircle } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({
  onRoomClick,
  messages,
  deleteMessage,
  sendMessage,
  chatState,
  userInfo,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", is_private: false });
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          return room.id !== parseInt(deleteRoomId);
        })
      );
    });
  }

  // scroll feature amy be able to use props
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(/*{ behavior: "smooth" }*/);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // handleProfileOpen(event);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function navigateProfile() {
    navigate("/profile");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elavation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {chatState.roomName
              ? `Currently in room: ${chatState.roomName}`
              : `Please choose or create a room!`}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userInfo ? BASE_URL + userInfo.picture : ""}>
                {userInfo ? userInfo.username[0] : ""}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <NavMenu
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        menuId={menuId}
        navigateProfile={navigateProfile}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: "center" }}
          >
            {userInfo
              ? `${
                  userInfo.username[0].toUpperCase() +
                  userInfo.username.slice(1)
                }`
              : ""}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
            Choose Room
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ overflowY: "auto", height: "80%" }}>
          {rooms.map((room) => (
            <Rooms
              id={room.id}
              key={room.id}
              room={room}
              deleteClick={deleteClick}
              onRoomClick={onRoomClick}
            />
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box
          sx={{
            paddingBottom: "2.3rem",
          }}
        >
          <MessageFeed
            messages={chatState.messages}
            deleteMessage={deleteMessage}
          />
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "98%",
            paddingTop: "0rem",
            mx: "auto",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <MessageInput sendMessage={sendMessage} />
        </Box>
      </Main>
    </Box>
  );
}
