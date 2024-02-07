import React, { useState } from 'react';

function PersonLogin({ onPersonLogin, setCurrPerson, persons, setCurrRoom, setInRoom, rooms }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLogin = () => {
    // Find person by name
    const person = persons.find(p => p.name === name);
    if (!person) {
      alert('Person not found.');
      return;
    }
    // Check password
    if (person.password !== password) {
      alert('Incorrect password.');
      return;
    }
    // Set current person
    setCurrPerson(person);
    // Set current room if exists
    if (person.currRoomID) {
      const room = rooms.find(room => room.id === person.currRoomID);
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
      alert('Password must be at least 8 characters long.');
      return;
    }
    // Confirm password validation
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Check if the person with the given name already exists
    const existingPerson = persons.find(p => p.name === name);
    if (existingPerson) {
      alert('User with this name already exists.');
      return;
    }
    // Create a new person object
    const newPerson = {
      name: name,
      password: password,
      currRoomID: '', // Empty string for currRoomID
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
    <div className="person-login">
      <h2>{showSignIn ? 'Person Sign In' : 'Person Login'}</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {showSignIn && (
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
      )}
      <button onClick={showSignIn ? handleSignIn : handleLogin}>{showSignIn ? 'Sign In' : 'Login'}</button>
      <button onClick={() => setShowSignIn(!showSignIn)}>
        {showSignIn ? 'Switch to Login' : 'Sign In Instead?'}
      </button>
    </div>
  );
}

export default PersonLogin;
