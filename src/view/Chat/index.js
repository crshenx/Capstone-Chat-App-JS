import React, { useState, useRef, useEffect } from "react";
import API from "../../client/api";
import consumer from "../../channels/consumer";
import { useRequireAuth } from "../../hooks/use-require-auth";
import NewNav from "../Navigation/NewNav";

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

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView(/*{ behavior: "smooth" }*/);
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatState.messages]);

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
    <div>
      <NewNav
        onRoomClick={onRoomClick}
        chatState={chatState}
        sendMessage={sendMessage}
        deleteMessage={deleteMessage}
        userInfo={auth.user}
      />
    </div>
  );
}

export default Chat;
