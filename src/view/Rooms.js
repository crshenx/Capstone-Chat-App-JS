// import React, { useEffect, useState } from "react";
// import { AUTH_TOKEN_ID, BASE_URL, ROOMS_ENDPOINT } from "../config";
// import consumer from "../channels/consumer";
// import { checkStatus } from "../utils/util";
// import { useAuth } from "../hooks/use-auth";
// import { Form, Button, ListGroup } from "react-bootstrap";
// import SideBar from "./SideBar";

// function Rooms() {
// const [rooms, setRooms] = useState([]);
// const [formData, setFormData] = useState({ name: "", is_private: false });
// const auth = useAuth();
// const loggedIn = auth.isAuthed();

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
//     .then(checkStatus)
//     .then((data) => {
//       console.log(data);
//       setRooms(data.rooms);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }, []);

// useEffect(() => {
//   const sub = consumer.subscriptions.create(
//     { channel: "RoomsChannel" },
//     {
//       received(data) {
//         console.log(data);
//         setRooms(data.rooms);
//       },
//       connected() {
//         console.log("connected");
//       },
//     }
//   );

//   return function cleanup() {
//     console.log("unsubbing from rooms channel");
//     sub.unsubscribe();
//   };
// }, []);

// function handleChange(e) {
//   const name = e.target.name;
//   let value = e.target.value;
//   if (e.target.type === "checkbox") {
//     value = !formData.is_private;
//   }
//   setFormData({ ...formData, [name]: value });
// }
// //   //console.log(formData);

// function handleClick(e) {
//   e.preventDefault();

//   fetch(`${BASE_URL}${ROOMS_ENDPOINT}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
//     },
//     body: JSON.stringify({
//       room: formData,
//     }),
//   })
//     .then((data) => {
//       // setRooms(data);
//       //console.log(data);
//       data.json();
//     })
//     // .then((data) => {
//     //   console.log(data.rooms);
//     //   // setRooms(data.rooms.rooms);
//     // })
//     .catch((err) => {
//       console.error(err);
//     });
// }

//console.log(`state variable "rooms":${rooms}`);

// const renderRooms = rooms.map((room) => {
//   return <ListGroup.Item key={room.id}>{room.name}</ListGroup.Item>;
// });

// return (
//   <div>
//     <SideBar
// rooms={rooms}
// handleChange={handleChange}
// handleClick={handleClick}
// />
{
  /* <ListGroup>
        {renderRooms.length > 1 ? renderRooms : "Room List Here"}
      </ListGroup> */
}
{
  /* </div>
  );
}

export default Rooms; */
}
