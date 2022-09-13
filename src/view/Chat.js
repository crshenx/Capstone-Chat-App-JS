import React, { useState, useRef, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import API from "../client/api";
import consumer from "../channels/consumer";

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
    if (chatState.currentRoomID) {
      sub.current = consumer.subscriptions.create(
        {
          channel: "ChatChannel",
          room: chatState.currentRoomID,
        },
        {
          received(data) {
            const message = { ...data.message, user: data.user };
            console.log(message);
            console.log("recieved", data);

            setChatState((state) => ({
              ...state,
              messages: [...state.messages, message],
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
    }

    return function cleanup() {
      if (chatState.currentRoomID) {
        console.log("unsubbing during cleanup");
        sub.current.unsubscribe();
      }
      console.log("nothing to unsub");
    };
  }, [chatState.currentRoomID]);

  function sendMessage(message) {
    console.log(message);
    sub.current.send({ content: message });
  }

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
