import React from "react";
import { Container, ListGroup, Stack } from "react-bootstrap";
import Messages from "./Messages";

function MessageFeed({ messages }) {
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  const renderMessages = messages.map((message, index) => {
    return (
      <Messages
        user={message.user.username}
        message={message.content}
        key={index}
      />
    );
  });

  return (
    // <div className={"overflow-scroll, w-75 p-3"}>
    <Container fluid>
      <Stack gap={5}>
        {/* <ListGroup> */}
        {renderMessages}
        {/* </ListGroup> */}
      </Stack>
    </Container>
    // </div>
  );
}

export default MessageFeed;
