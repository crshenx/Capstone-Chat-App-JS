import React, { useState, useRef, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import API from "../client/api";

import consumer from "../channels/consumer";
import { useParams } from "react-router-dom";

function Chat() {
  const [chatState, setChatState] = useState({
    currentRoomID: null,
    messages: [],
  });

  let sub = useRef();

  function onRoomClick(e) {
    e.stopPropagation();
    console.log(`currentTargetId`, e.currentTarget.id);
    console.log(`TargetId`, e.target.id);

    setChatState((state) => ({ ...state, currentRoomID: e.currentTarget.id }));
  }

  useEffect(() => {
    if (chatState.currentRoomID) {
      API.getMessages(chatState.currentRoomID).then((messages) => {
        console.log(messages);
        setChatState((state) => ({ ...state, messages: messages }));
      });
    }
  }, [chatState.currentRoomID]);

  useEffect(() => {
    sub.current = consumer.subscriptions.create(
      {
        channel: "ChatChannel",
        room: chatState.currentRoomID,
      },
      {
        recieved(data) {
          console.log("recieved", data);
          setChatState((state) => ({
            ...state,
            messages: [...state.messages, data.content],
          }));
        },
        connected() {
          console.log("connected");
        },
        disconnected() {
          console.log("disconnected");
        },
      }
    );
    return function cleanup() {
      sub.current.unsubscribe();
    };
  }, [chatState.currentRoomID]);

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

  //   const messages = ["asdf", "asdffsadf", "asdfasdf", "fart"];
  function sendMessage(message) {
    console.log(message);
    sub.current.send({ content: message });
  }

  // console.log(messages);

  // google the order of things that happen when.
  // what order mult use-effects have. etc etc

  // if we are in a room
  // we need all the messages in the history

  // useEffect(() => {});

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
            <SideBar onRoomClick={onRoomClick} />
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
