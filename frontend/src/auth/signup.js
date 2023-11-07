import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSignupData } from "../api"; // Import the signup function

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const handleUsernameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignup();
    }
  };

  const handleSignup = async () => {
    console.log("response");
    console.log("password", password);

    if (username && password) {
      const userData = {
        username: username,
        password: password,
      };
      console.log("username", username);

      try {
        console.log("username", username);
        // Use the getSignupData function from your API
        const response = await getSignupData(userData);
        console.log("response", response);
        console.log("response status", response.status);

        if (response.status === 201) {
          // Registration was successful
          console.log("Registration successful");
          const token = response.data.token;
          localStorage.setItem("token", token);

          // Redirect to the login page after successful registration
          navigate("/login");
        } else {
          // Handle registration failure (e.g., show an error message)
          console.error("Registration failed");
        }
      } catch (error) {
        // Handle registration error (e.g., show an error message)
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-welcome">
        <em>Welcome to the only to-do list you will ever need.</em>
      </h1>
      <div className="auth-container">
        <h2 className="auth-text">Sign Up</h2>
        <form className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleUsernameKeyPress}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleEnterKeyPress}
            ref={passwordRef}
          />
          <button type="button" onClick={handleSignup}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
