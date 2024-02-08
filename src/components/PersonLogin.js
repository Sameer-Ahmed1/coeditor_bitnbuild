import React, { useState } from "react";
import "./PersonLogin.css";
function PersonLogin({
  onPersonLogin,
  setCurrPerson,
  persons,
  setCurrRoom,
  setInRoom,
  rooms,
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLogin = () => {
    // Find person by name
    const person = persons.find((p) => p.name === name);
    if (!person) {
      alert("Person not found.");
      return;
    }
    // Check password
    if (person.password !== password) {
      alert("Incorrect password.");
      return;
    }
    // Set current person
    setCurrPerson(person);
    // Set current room if exists
    if (person.currRoomID) {
      const room = rooms.find((room) => room.id === person.currRoomID);
      if (room) {
        setCurrRoom(room);
        setInRoom(true);
      }
    }
    // Call the onPersonLogin callback if provided
    if (onPersonLogin) {
      onPersonLogin(person);
    }
  };

  const handleSignIn = () => {
    // Basic password validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    // Confirm password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Check if the person with the given name already exists
    const existingPerson = persons.find((p) => p.name === name);
    if (existingPerson) {
      alert("User with this name already exists.");
      return;
    }
    // Create a new person object
    const newPerson = {
      name: name,
      password: password,
      currRoomID: "", // Empty string for currRoomID
    };
    // Update persons array
    const updatedPersons = [...persons, newPerson];
    setCurrPerson(newPerson);
    // Call the onPersonLogin callback if provided
    if (onPersonLogin) {
      onPersonLogin(newPerson);
    }
  };

  return (

    <div className="flex-container p-login">
      <div class="work">
                    <img src={require("../images/codeImg.png")}alt="logo"/>
                    <div className="layer">
                        <h3>C<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m18-10v1h2v-1a7 7 0 0 0-7-7h-3v2h3a5 5 0 0 1 5 5m-13 0H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2"/></svg>Editor</h3>
                        <p>C<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m18-10v1h2v-1a7 7 0 0 0-7-7h-3v2h3a5 5 0 0 1 5 5m-13 0H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2"/></svg>Editor: Uniting Minds, Transforming Code - Elevate Your Development Experience</p>
                    </div>
</div>
      <div className="content-container">
        <div className="form-container">
          <h1>Login</h1>
          <br />
          <br />
          <span className="subtitle">USERNAME</span>
          <br />
          <input
            className="input-style"
            type="text"
            placeholder="Enter Username"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <span class="subtitle">PASSWORD</span>
          <br />
          <input
            className="input-style"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
        </div>
        <button
          className="btn login-btn"
          onClick={showSignIn ? handleSignIn : handleLogin}
        >
          {showSignIn ? "Sign In" : "Login"}
        </button>
        <button
          className="btn new-user-btn"
          onClick={() => setShowSignIn(!showSignIn)}
        >
          {showSignIn ? "Switch to Login" : "Sign In Instead?"}
        </button>
      </div>
    </div>
  );
}
export default PersonLogin;
