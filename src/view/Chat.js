import React, { useState } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";

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
        <Row>
          <Col sm={3} style={{ border: "2px" }}>
            <SideBar />
          </Col>
          {/* </Row>
        <Row> */}
          <Col sm={9}>
            <MessageFeed messages={messages} />
            <MessageInput sendMessage={sendMessage} />
          </Col>{" "}
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
