import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/chatContainer/ChatContainer";
import Contacts from "../components/contacts/Contacts";
import Welcome from "../components/welcome/Welcome";
import "./chat.css"

const Chat = () => {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem('chat-app-current-user')) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem('chat-app-current-user')
          )
        );
      }
    }
    setUser()
  }, [])

  useEffect(() => {
    async function sethost() {
      if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }
    sethost()
  }, [currentUser]);

  useEffect(() => {
    async function getUsers() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    getUsers();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-div">
      <div className="chat-container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser}  socket={socket} />
        )}
      </div>
    </div>
  )
}

export default Chat