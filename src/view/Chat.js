import React, { useState } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { Container } from "react-bootstrap";

function Chat() {
  const [messages, setMessages] = useState([]);
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  function sendMessage(message) {
    setMessages([...messages, message]);
  }

  console.log(messages);
  return (
    <div>
      <Container>
        <MessageFeed messages={messages} />
        <MessageInput sendMessage={sendMessage} />
      </Container>
    </div>
  );
}

export default Chat;
