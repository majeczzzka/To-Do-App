import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginData } from "../api"; // Import the login function

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add this line for error messages
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
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (username && password) {
      const credentials = {
        username: username,
        password: password,
      };

      try {
        // Use the getLoginData function from your API
        const response = await getLoginData(credentials);

        if (response.status === 200) {
          // Login was successful
          console.log("Login successful");
          console.log("response", response);
          const token = response.data.access_token;
          console.log("token", token);
          localStorage.setItem("token", token);

          // Redirect to the todo list page after successful login
          navigate("/todolist");
        } else {
          // Handle login failure (e.g., show an error message)
          console.error("Login failed");
          setErrorMessage("Invalid username or password.");
        }
      } catch (error) {
        // Handle login error (e.g., show an error message)
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-welcome">
        <em>Welcome to the only to-do list you will ever need.</em>
      </h1>
      <div className="auth-container">
        <h2 className="auth-text">Login</h2>
        <form className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleUsernameKeyPress} // Focus on password field
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleEnterKeyPress} // Submit the form
            ref={passwordRef} // Assign a ref to the password input field
          />
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <div className="signup-prompt">
          {" "}
          {/* Add this block */}
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
