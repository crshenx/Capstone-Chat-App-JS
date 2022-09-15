import React, { useState, useRef, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
// import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import API from "../client/api";
import consumer from "../channels/consumer";
import { Box, Container } from "@mui/system";
import NavBar from "./NavBar";
import { Paper, Typography } from "@mui/material";
import ProfileDrawer from "./ProfileDrawer";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [chatState, setChatState] = useState({
    currentRoomID: null,
    messages: [],
    roomName: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthed()) {
      navigate("login");
    }
  }, [auth]);

  let sub = useRef();

  function onRoomClick(e) {
    e.stopPropagation();
    // console.log(`currentTargetId`, e.currentTarget.id);
    // console.log(`TargetId`, e.target.id);
    // console.log(`currentTarget name`, e.currentTarget.textContent);
    setChatState((state) => ({
      ...state,
      currentRoomID: e.currentTarget.id,
      roomName: e.currentTarget.textContent,
    }));
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

  function handleProfileOpen() {
    return <ProfileDrawer />;
  }

  return (
    <div>
      <NavBar handleProfileOpen={handleProfileOpen} />
      <SideBar
        onRoomClick={onRoomClick}
        messages={chatState.messages}
        sendMessage={sendMessage}
      />
      {/* <Paper sx={{ mt: 10, position: "fixed" }}>
        <Typography>{chatState.roomName}</Typography>
      </Paper> */}{" "}
      <Paper
        elevation={0}
        variant="outlined"
        square
        sx={{
          mt: "6.4rem",
          overflowY: "auto",
          height: "83vh",
          ml: 30,

          // border: 1,
          // borderRadius: 1,
        }}
      >
        <Typography
          // variant="h6"
          noWrap
          component="div"
          sx={{
            border: "1px",
            position: "fixed",
            top: "4rem",
            width: "100%",
            fontSize: "1.6rem",
            backgroundColor: "text.secondary",
            color: "white",
          }}
        >
          {chatState.roomName
            ? chatState.roomName
            : `Please choose or create a room!`}
        </Typography>
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
