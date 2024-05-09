import React from "react";

const Login = ({ username, setUsername, setIsLoggedIn }) => {
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEnterButtonPressed = (e) => {
    if (username.trim() !== "") {
      setIsLoggedIn(true);
    }
  };
  return (
    <div className="login-container">
      <h2 className="mb20">Enter a Username to Start the Quiz</h2>

      <input
        value={username}
        onChange={handleUsernameChange}
        className="username-input"
      />

      <button
        onClick={handleEnterButtonPressed}
        disabled={username.trim() === ""}
        className="button"
      >
        Start
      </button>
    </div>
  );
};

export default Login;
