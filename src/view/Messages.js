import React from "react";
import { ListGroup } from "react-bootstrap";

function Messages({ message }) {
  return <ListGroup.Item>{message}</ListGroup.Item>;
}

export default Messages;
