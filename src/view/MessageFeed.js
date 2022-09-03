import React from "react";
import { ListGroup } from "react-bootstrap";
import Messages from "./Messages";

function MessageFeed({ messages }) {
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  const renderMessages = messages.map((message, index) => {
    return <Messages message={message} key={index} />;
  });
  return (
    <div>
      <ListGroup>{renderMessages}</ListGroup>
    </div>
  );
}

export default MessageFeed;
