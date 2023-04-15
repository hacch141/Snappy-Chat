import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import './contacts.css'

const Contacts = ({ contacts, currentUser,  changeChat }) => {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function setUser() {
      const data = await JSON.parse(
        localStorage.getItem('chat-app-current-user')
      );
      if (!data) {
        navigate("/login");
      } else {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage)
      }
    }
    setUser()
  }, [])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="contact-container">
      <div className="contact-brand">
        <img src={Logo} alt="logo" />
        <h3>snappy</h3>
      </div>
      <div className="contact-contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${index === currentSelected ? "contact-selected" : ""
                }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="contact-avatar">
                <img
                  src={contact.avatarImage}
                  alt=""
                />
              </div>
              <div className="contact-username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="contact-current-user">
        <div className="current-avatar">
          <img
            src={currentUserImage}
            alt="avatar"
          />
        </div>
        <div className="current-username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </div>
  )
}

export default Contacts