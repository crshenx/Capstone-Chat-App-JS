import React, { useState, useRef, useEffect } from "react";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import SideBar from "../Navigation/SideBar";
import API from "../../client/api";
import consumer from "../../channels/consumer";
import NavBar from "../Navigation/NavBar";
import { Typography, Box } from "@mui/material";
import { useRequireAuth } from "../../hooks/use-require-auth";

function Chat() {
  const [chatState, setChatState] = useState({
    currentRoomID: null,
    messages: [],
    roomName: "",
  });

  //automatically redirects if not authenticated
  const auth = useRequireAuth();
  let sub = useRef();

  function onRoomClick(e) {
    e.stopPropagation();
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
            setChatState((state) => ({
              ...state,
              messages: [...state.messages, data],
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

  // console.log(auth.user.username);

  function deleteMessage(data, user) {
    console.log(`message id: ${data}`);
    if (user.username === auth.user.username) {
      API.deleteMessages(data.id);
      // loop through chatState.messages and remove the message with the id
      setChatState((state) => ({
        ...state,
        messages: state.messages.filter((message) => message.id !== data.id),
      }));
    } else {
      alert("You can only delete your own messages");
    }
  }

  return (
    <div style={{ overflowY: "hidden" }}>
      <NavBar userInfo={auth.user} chat={chatState} />
      <SideBar
        onRoomClick={onRoomClick}
        messages={chatState.messages}
        sendMessage={sendMessage}
      />
      {/* <Typography
        noWrap
        component="div"
        sx={{
          ml: 30,
          border: "1px",
          position: "fixed",
          top: "4rem",
          width: "100%",
          fontSize: "1.6rem",
          backgroundColor: "#616161",
          color: "white",
          zIndex: 1000,
        }}
      >
        {chatState.roomName
          ? chatState.roomName
          : `Please choose or create a room!`}
      </Typography> */}
      <Box
        // fluid
        sx={{
          mt: "4.2rem",
          mb: ".7rem",
          height: "100%",
          ml: 30,
          paddingBottom: "3rem",
          overflow: "hidden",
          alignContent: "bottom",
        }}
      >
        <MessageFeed
          messages={chatState.messages}
          deleteMessage={deleteMessage}
        />
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          ml: 30,
          position: "fixed",
          bottom: 0,
          width: "100%",
          paddingTop: "0rem",
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <MessageInput sendMessage={sendMessage} />
      </Box>
    </div>
  );
}

export default Chat;
