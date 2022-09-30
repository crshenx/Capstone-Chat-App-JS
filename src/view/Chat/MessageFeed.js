import React from "react";
import { Container, ListGroup, Stack } from "react-bootstrap";
import Messages from "./Messages";

function MessageFeed({ messages }) {
  const messageElems = messages.map((message, index) => {
    return (
      <Messages
        user={message.user.username}
        message={message.content}
        key={index}
      />
    );
  });

  return (
    <Container fluid>
      <Stack gap={1}>{messageElems}</Stack>
    </Container>
  );
}

export default MessageFeed;