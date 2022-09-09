import React, { useEffect, useState } from "react";
import { AUTH_TOKEN_ID, BASE_URL, roomsEndpoint } from "../config";
import consumer from "../channels/consumer";
import { useAuth } from "../hooks/use-auth";
import { Form, Button } from "react-bootstrap";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", is_private: false });
  const auth = useAuth();
  const loggedIn = auth.isAuthed();

  function connect() {
    consumer.subscriptions.create(
      { channel: "RoomsChannel" },
      {
        received(data) {
          //   console.log(data);
          //   console.log(JSON.stringify(data));
          //   setRooms(JSON.stringify(data));
        },
        connected(data) {
          console.log("Connected");
          // setRooms(JSON.stringify(data));
        },
      }
    );
  }

  useEffect(() => {
    connect();
  }, []);

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = !formData.is_private;
    }
    setFormData({ ...formData, [name]: value });
  }
  //   console.log(formData);

  function handleClick(e) {
    e.preventDefault();

    fetch(`${BASE_URL}${roomsEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_ID)}`,
      },
      body: JSON.stringify({
        room: formData,
      }),
    })
      .then((data) => {
        // setRooms(data);
        console.log(data);
        data.json();
      })
      .then((data) => {
        setRooms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  console.log(`state variable "rooms":${rooms}`);

  return (
    <div>
      Rooms
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={handleChange}
        >
          <Form.Label>Room Name</Form.Label>
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
      </Form>
    </div>
  );
}

export default Rooms;
