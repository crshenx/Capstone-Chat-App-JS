import { Stack } from "@mui/material";
import React from "react";
// import { Stack } from "react-bootstrap";
import Messages from "./Messages";

function MessageFeed({ messages, deleteMessage }) {
  const messageElems = messages.map((message, index) => {
    return (
      <Messages
        deleteMessage={deleteMessage}
        user={message.user}
        message={message.content}
        data={message}
        key={index}
      />
    );
  });

  return <Stack gap={1}>{messageElems}</Stack>;
}

export default MessageFeed;
