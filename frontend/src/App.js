import React from "react";
import SignUp from "./auth/signup";
import Login from "./auth/login";
import TodoListWrapper from "./TodoListWrapper";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todolist" element={<TodoListWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

console.error = (function () {
  var error = console.error;

  return function (exception) {
    if (
      (exception + "").indexOf("Warning: A component is `contentEditable`") !==
      0
    ) {
      error.apply(console, arguments);
    }
  };
})();

export default App;
