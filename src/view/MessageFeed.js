import React from "react";
import { Container, ListGroup, Stack } from "react-bootstrap";
import Messages from "./Messages";

function MessageFeed({ messages }) {
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  const renderMessages = messages.map((message, index) => {
    return <Messages message={message} key={index} />;
  });

  return (
    // <div className={"overflow-scroll, w-75 p-3"}>
    <Container fluid>
      <Stack gap={3}>
        {/* <ListGroup> */}
        {renderMessages}
        {/* </ListGroup> */}
      </Stack>
    </Container>
    // </div>
  );
}

export default MessageFeed;
