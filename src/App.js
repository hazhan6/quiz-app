import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import "./app.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full">
      <div className="header">
        <span>Quiz App</span>
        {isLoggedIn && <div>{username}</div>}
      </div>

      <div className="wrapper">
        <div className="quiz-container">
          {!isLoggedIn ? (
            <Login
              username={username}
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Quiz isLoggedIn />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
