import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
// import axios from "axios";
// import { logoutRoute } from "../utils/APIRoutes";
import "./logout.css"

const Logout = () => {

  const navigate = useNavigate();

  const handleClick = async () => {

    // const id = await JSON.parse(
    //   localStorage.getItem('chat-app-current-user')
    // )._id;
    
    // const data = await axios.get(`${logoutRoute}/${id}`);

    // if (data.status === 200) {
    //   localStorage.clear();
    //   navigate("/login");
    // }

  };

  return (
    <div className="logout" onClick={handleClick}>
      <BiPowerOff />
    </div>
  )
}

export default Logout