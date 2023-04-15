import React, { useEffect, useState } from "react";
import "./setAvatar.css"
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";

export default function SetAvatar() {

  const api = `https://api.multiavatar.com/465`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
  console.log(currentUser)

  useEffect(() => {
    async function getProfilepics() {
      let data = [];
      const avatarURL = 'https://api.multiavatar.com/'
      for (let i = 0; i < 4; i++) {
        let rand = Math.round(Math.random() * 10000)
        const url = `${avatarURL}${rand}.png`
        data.push(url)
      }
      setAvatars(data)
      setIsLoading(false)
    }
    getProfilepics();
  }, []);


  const setProfilePicture = async () => {
    
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {

      const { data } = await axios.post(`${setAvatarRoute}/${currentUser._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        currentUser.isAvatarImageSet = true;
        currentUser.avatarImage = data.image;
        localStorage.setItem(
          'chat-app-current-user',
          JSON.stringify(currentUser)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="avatarContainer">
          <img src={loader} alt="avatar-loader" className="loader" />
        </div>
      ) : (
        <div className="avatarContainer">
          <div className="avatar-title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="avatar-submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}