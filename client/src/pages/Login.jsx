import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import './login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    async function setUser() {
      if (localStorage.getItem('chat-app-current-user')) {
        navigate("/");
      }
    }
    setUser()
  }, [])

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-app-current-user',
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  }

  return (
    <>
      <div className='login'>
        <form className='loginformContainer' onSubmit={(e) => handleSubmit(e)}>
          <div className="loginbrand">
            <img src={Logo} alt="loginLogo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name='username'
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <button type='submit' >Login In</button>
          <span className='loginSpan'>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login