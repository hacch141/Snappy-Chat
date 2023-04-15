import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../chatInput/chatInput";
import Logout from "../logout/Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIRoutes";
import "./chatContainer.css"

const ChatContainer = ({ currentChat , currentUser , socket  }) => {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function getMsgs() {
    
      if(currentChat) {const response = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);}
    }
    getMsgs();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);

  }

  useEffect(() => {
    async function setArrMsg() {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          setArrivalMessage({ fromSelf: false, message: msg });
        });
      }
    }
    setArrMsg()
  }, []);

  useEffect(() => {
    async function setArrlMsg() {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }
    setArrlMsg()
  }, [arrivalMessage]);

  useEffect(() => {
    async function setScroll() {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setScroll()
  }, [messages]);


  return (
    <div className="chatcon-container">
      <div className="chatcon-chat-header">
        <div className="chatcon-user-details">
          <div className="chatcon-avatar">
            <img
              src={currentChat.avatarImage}
              alt=""
            />
          </div>
          <div className="chatcon-username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chatcon-chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`chatcon-message ${
                  message.fromSelf ? "chatcon-sended" : "chatcon-recieved"
                }`}
              >
                <div className="chatcon-content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatContainer