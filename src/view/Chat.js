import React, { useState, useRef, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
// import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import API from "../client/api";
import consumer from "../channels/consumer";
import { Box, Container } from "@mui/system";
import NavBar from "./NavBar";
import { Paper } from "@mui/material";

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
    console.log("send message button");
    sub.current.send({ content: message });
  }

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(/*{ behavior: "smooth" }*/);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  return (
    <div>
      <NavBar />
      <SideBar
        onRoomClick={onRoomClick}
        messages={chatState.messages}
        sendMessage={sendMessage}
      />

      <Paper
        sx={{
          mt: 9,
          overflowY: "scroll",
          height: "85vh",
          ml: 30,
          // border: 1,
          // borderRadius: 1,
        }}
      >
        <MessageFeed messages={chatState.messages} />
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ ml: 30 }}>
        <MessageInput sendMessage={sendMessage} />
      </Box>
    </div>
  );
}

export default Chat;
