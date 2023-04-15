import React, { useState, useEffect } from "react";
import Robot from "../../assets/robot.gif";
import "./welcome.css"

const Welcome = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function setUser() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    setUser()
  }, [])

  return (
    <div className="welcome-container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}

export default Welcome