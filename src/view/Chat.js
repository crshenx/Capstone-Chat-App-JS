import React from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";

function Chat() {
  return (
    <div>
      <MessageFeed />
      <MessageInput />
    </div>
  );
}

export default Chat;
