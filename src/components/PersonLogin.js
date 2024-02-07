import React, { useState } from 'react';
import './PersonLogin.css'
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
    <div className="body">
      <div className="person-login">
        <h2 className='login-heading'>{showSignIn ? 'Person Sign In' : 'Person Login'}</h2>
      </div>
      <div className="card">
        <table className='input-items'>
          <tbody>
            <tr>
              <td>Username:</td>
              <td><input className='input-style' type="text" placeholder='Enter Username' id="name" value={name} onChange={(e) => setName(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input className='input-style' type="password" placeholder='Enter Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
            </tr>
            {showSignIn && (
              <tr>
                <td>Confirm Password:</td>
                <td><input className='input-style' type="password" placeholder='Confirm Password' id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></td>
              </tr>
            )}
          </tbody>
        </table>
        <button className='btn login-btn' onClick={showSignIn ? handleSignIn : handleLogin}>{showSignIn ? 'Sign In' : 'Login'}</button>
        <button className='btn new-user-btn' onClick={() => setShowSignIn(!showSignIn)}>
          {showSignIn ? 'Switch to Login' : 'Sign In Instead?'}
        </button> 
      </div>
    </div>
  );
  
}

export default PersonLogin;