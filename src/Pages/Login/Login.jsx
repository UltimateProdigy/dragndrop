import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import "./Login.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      navigate("/gallery");
      console.log(user);
      localStorage.setItem("accessToken", user.accessToken);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setErrMsg("Sign-in failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <div>
      <h1 className="introgallery">Gallery</h1>
      <p
        ref={errRef}
        aria-live="assertive"
        className={errMsg ? "errmsg" : "offscreen"}
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
