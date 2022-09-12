import React, { useState, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";

import consumer from "../channels/consumer";
import { useParams } from "react-router-dom";

function Chat() {
  const [chatState, setChatState] = useState({
    currentRoomID: null,
    messages: [],
  });

  useEffect(() => {
    if (chatState.currentRoomID) {
      fetch();
    }
  });

  // you also need to provide handlers when start the subscriptio

  // writes a messagesen d on the subscription

  // const sub = consumer.subscriptions.create());

  // {}...
  // state.current_room = null
  // state.messages = []

  // useEffect (()=> http)

  // make use effect to start sub to specific room

  // you also need to provide handlers when start the subscription

  // writes a messagesen d on the subscription

  // const sub = consumer.subscriptions.create()

  const params = useParams();
  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  function sendMessage(message) {
    setChatState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  }

  // console.log(messages);

  // google the order of things that happen when.
  // what order mult use-effects have. etc etc

  // if we are in a room
  // we need all the messages in the history

  useEffect(() => {});

  // after

  // useEffect(() => {
  //   const CONSUMER = consumer();
  //   const paramsToSend = {
  //     channel: "RoomChannel",
  //     id: params.id,
  //   };
  //   const handlers = {
  //     recieved(data) {
  //       setMessages([...messages, data]);
  //     },
  //     connected() {
  //       console.log("MESSAGE CONNECTED WTF IS THE DIFFERENCE");
  //     },
  //     disconnected() {
  //       console.log("DISCONNECTED");
  //     },
  //   };
  //   const sub = CONSUMER.subscriptions.create(paramsToSend, handlers);
  //   return function cleanup() {
  //     console.log(`:unsub from: `, params.id);
  //     sub.unsubcribe();
  //   };
  // }, [params.id, messages]);

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
            <MessageFeed messages={chatState.messages} />
            <MessageInput sendMessage={sendMessage} />
          </Col>{" "}
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
