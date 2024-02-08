import { useState } from "react";
import "./Login.css";

function Login({ joinRoom, roomId, setRoomId }) {
  // const [newRoomName, setNewRoomName] = useState('');
  // const [roomID, setRoomID] = useState('');
  // const [joinLink, setJoinLink] = useState('');
  // const [error, setError] = useState('');

  // const handleSignIn = () => {
  //     // Check if roomID exists in the rooms array
  //     const existingRoom = rooms.find(room => room.id === roomID);

  //     if (existingRoom) {
  //         // Check if joinLink matches the room's joinLink
  //         if (existingRoom.joinLink === joinLink) {
  //             console.log("Successfully signed in to room:", roomID);
  //             setCurrRoom(existingRoom); // Set current room
  //             setInRoom(true);
  //         } else {
  //             setError("Please enter the join link correctly");
  //         }
  //     } else {
  //         setError("Room ID is not valid. Create new room instead?");
  //     }
  // };

  // const handleCreateRoom = () => {
  //     // Check if room name already exists
  //     const roomNameExists = rooms.some(room => room.name === newRoomName);

  //     if (roomNameExists) {
  //         console.log("Room name already exists");
  //         return;
  //     }

  //     // Generate random ID
  //     const newRoomId = Math.random().toString(36).substr(2, 9);

  //     // Generate join link
  //     const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //     const joinLink = 'join@' + Array.from({ length: 12 }, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join('');

  //     // Create new room object
  //     const newRoom = {
  //         id: newRoomId,
  //         name: newRoomName,
  //         joinLink: joinLink,
  //         chatArray: [] // Assuming chatArray starts empty
  //     };

  //     // Update rooms state
  //     setRooms([...rooms, newRoom]);

  //     // Set current room
  //     setCurrRoom(newRoom);

  //     // Set inRoom to true
  //     setInRoom(true);
  // };

  return (
    <div className="login-container">
      <div className="sign-in-box">
        <h2>Access Room</h2>
        <input
          type="text"
          className="input-ele"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        {/* <input type="text" placeholder="Enter Join Link" value={joinLink} onChange={(e) => setJoinLink(e.target.value)} /> */}
        <button className="button-lgn" onClick={joinRoom}>
          Join
        </button>
        {/* <div className="error-login">{error}</div> Display error message */}
      </div>
      <div className="create-room-box">
        <h2>Create New Room</h2>
        <input
          type="text" 
          className="input-ele"
          placeholder="Enter Room Name"
          // value={newRoomName}
          // onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button className="button-lgn">Create</button>
      </div>
      {/* <button className="button-lgn" onClick={() => setInRoom(true)}> */}
      {/* Choose No Room */}
      {/* </button> */}
    </div>
  );
}

export default Login;
