import React, { useState } from 'react';
import PersonLogin from './PersonLogin';

function PersonSignIn({ setCurrPerson, persons, setCurrRoom, setInRoom, rooms, setLoginStatus }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = () => {
    // Basic validation for name and password
    if (!name || !password || password.length < 5) {
      alert('Please enter a valid name and a password of at least 5 characters.');
      return;
    }

    // Check if the person already exists
    const existingPerson = persons.find(person => person.name === name);
    if (existingPerson) {
      alert('Person with this name already exists. Please choose a different name.');
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
    setLoginStatus(true);

    // Clear name and password fields
    setName('');
    setPassword('');

    // Update local storage or perform any other necessary actions
    // localStorage.setItem('persons', JSON.stringify(updatedPersons));
  };

  return (
    <PersonLogin
      onPersonLogin={() => {}} // No action needed on login for sign up process
      setCurrPerson={setCurrPerson}
      persons={persons}
      setCurrRoom={setCurrRoom}
      setInRoom={setInRoom}
      rooms={rooms}
    >
      <div className='body1'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleCreateUser}>Create New User</button>
    </PersonLogin>
  );
}

export default PersonSignIn;
