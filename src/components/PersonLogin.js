import React, { useState } from 'react';
import PersonSignIn from './PersonSignin';

function PersonLogin({ onPersonLogin, setCurrPerson, persons, setCurrRoom, setInRoom, rooms }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Find person by name
    const person = persons.find(p => p.name === name);
    if (!person) {
      alert('Person not found. Create a new user.');
      return;
    }
    // Check password
    if (person.password !== password) {
      alert('Incorrect password.');
      return;
    }
    // Set current person
    setCurrPerson(person);
    // Call the onPersonLogin callback if provided
    if (onPersonLogin) {
      onPersonLogin(person);
    }
    // Set current room if exists
    if (person.currRoomID) {
      const room = rooms.find(room => room.id === person.currRoomID);
      if (room) {
        setCurrRoom(room);
        setInRoom(true);
      }
    }
  };

  const handleCreateUser = () => {
    <PersonSignIn 
    setCurrPerson={setCurrPerson} 
    persons={persons}
    setCurrRoom={setCurrRoom}
    setInRoom={setInRoom}
    rooms={rooms}
  />
  };

  return (
    <div className="person-login">
      <h2>Person Login</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCreateUser}>Create New User</button>
    </div>
  );
}

export default PersonLogin;
