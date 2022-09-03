import React, { useState } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  function sendMessage(message) {
    setMessages([...messages, message]);
  }

  console.log(messages);
  return (
    <div>
      <MessageFeed messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
