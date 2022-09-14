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
    const name = e.target.name;
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
    });
  }
  function handleRoomClick(e) {
    e.stopPropagation();
    console.log(`target id: ${e.currentTarget.id}`);
  }

  return (
    <Box sx={{ display: "flex", position: "fixed" }}>
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
            Rooms
          </Typography>
        </Toolbar>
        <Divider />
        <List>
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

// mui component with appbar

// import React, { useEffect, useState } from "react";
// import consumer from "../channels/consumer";
// import API from "../client/api";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// // import { mainListItems, secondaryListItems } from "./listItems";
// // import Chart from "./Chart";
// // import Deposits from "./Deposits";
// // import Orders from "./Orders";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import PeopleIcon from "@mui/icons-material/People";
// import ListItemIcon from "@mui/material/ListItemIcon";
// // probs dont need

// // import { ResponsiveContainer } from "recharts";
// import ListSubheader from "@mui/material/ListSubheader";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import BarChartIcon from "@mui/icons-material/BarChart";
// // import LayersIcon from "@mui/icons-material/Layers";
// // import AssignmentIcon from "@mui/icons-material/Assignment";
// // import MessageFeed from "./MessageFeed";
// // import MessageInput from "./MessageInput";

// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const mdTheme = createTheme();

// export default function DashboardContent({
//   onRoomClick,
//   messages,
//   sendMessage,
// }) {
//   const [open, setOpen] = useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
//   const [rooms, setRooms] = useState([]);
//   const [formData, setFormData] = useState({ name: "", is_private: false });

//   useEffect(() => {
//     API.getRooms()
//       .then((data) => {
//         console.log(data);
//         setRooms(data.rooms);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   useEffect(() => {
//     const sub = consumer.subscriptions.create(
//       { channel: "RoomsChannel" },
//       {
//         received(data) {
//           console.log(data);
//           setRooms(data.rooms);
//         },
//         connected() {
//           console.log("connected");
//         },
//       }
//     );

//     return function cleanup() {
//       console.log("unsubbing from rooms channel");
//       sub.unsubscribe();
//     };
//   }, []);

//   function handleChange(e) {
//     const name = e.target.name;
//     let value = e.target.value;
//     if (e.target.type === "checkbox") {
//       value = !formData.is_private;
//     }
//     setFormData({ ...formData, [name]: value });
//   }
//   function handleClick(e) {
//     e.preventDefault();
//     API.createRoom(formData.name, formData.is_private).then((data) => {
//       console.log(data);
//     });
//   }
//   function handleRoomClick(e) {
//     e.stopPropagation();
//     console.log(`target id: ${e.currentTarget.id}`);
//   }

//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar
//             sx={{
//               pr: "24px", // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Dashboard
//             </Typography>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List component="nav">
//             {
//               <React.Fragment>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <PeopleIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Profile" />
//                 </ListItemButton>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <PeopleIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Mentions" />
//                 </ListItemButton>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <PeopleIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Drafts" />
//                 </ListItemButton>
//               </React.Fragment>
//             }
//             <Divider sx={{ my: 1 }} />
//             <ListSubheader component="div" inset>
//               Saved reports
//             </ListSubheader>
//             {/*
//               <React.Fragment>
//                 <ListSubheader component="div" inset>
//                   Saved reports
//                 </ListSubheader>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <AssignmentIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Current month" />
//                 </ListItemButton>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <AssignmentIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Last quarter" />
//                 </ListItemButton>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <AssignmentIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Year-end sale" />
//                 </ListItemButton>
//               </React.Fragment>
//             */}
//             {rooms.map((room, index) => (
//               // <Link to="/chat">
//               <ListItemButton key={room.id} id={room.id} onClick={onRoomClick}>
//                 <ListItem disablePadding>
//                   <ListItemText primary={room.name} />
//                 </ListItem>
//               </ListItemButton>
//               //  </Link>
//             ))}
//           </List>
//         </Drawer>
//       </Box>
//     </ThemeProvider>
//   );
// }

/**
 * 
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container
            maxWidth="xl"
            sx={{ mt: 4, mb: 4, overflowY: "scroll", maxHeight: "75%" }}
          >
            <MessageFeed messages={messages} />
          </Container>
          <Box position="fixed" sx={{ top: "auto", bottom: 0 }}>
            <Container>
              <MessageInput sendMessage={sendMessage} />
            </Container>
          </Box>
        </Box>
 */

// export default function Dashboard() {
//   return <DashboardContent />;
// }
