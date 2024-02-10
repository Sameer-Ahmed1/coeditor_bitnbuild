import React from "react";
import "./RoomNavBar.css";
import roomService from "../services/room";
import userService from "../services/user";
function RoomNavBar({
  handleLeaveRoom,
  handleLogout,
  roomId,
  currUser,
  setnotification,
  showPeople,
  setShowPeople
}) {
  const handleButtonClick = (buttonName) => {
    console.log(buttonName);
  };
  const fetchUsers = async () => {
    try {
      const rooms = await roomService.getRooms();
      console.log("rooms fetched ", rooms);
  
      const room = rooms.find((room) => room.roomId === roomId);
      //fetch current users
      let currentUsers = null;
      if (room) {
        currentUsers = await roomService.getOneRoom(room.id);
        console.log("current users  ", currentUsers);
        // do something with users
      } else {
        console.log("Room not found");
      }
      let allUsers = await userService.getUsers();
      console.log("all users fetched ", allUsers);
  
      // Filter out current users
      const otherUsers = allUsers.filter(user => !currentUsers.users.some(currUser => currUser === user.id));
      console.log("other users ", otherUsers);
  
    } catch (err) {
      console.log(err);
      // setError
    }
  };
  
  const handleShowPeople = () => {
    setShowPeople(!showPeople)
  };
  function myFunction(roomId) {
    // Get the text field

    // // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(roomId);

    // Alert the copied text
    setnotification("Room ID copied");
    setTimeout(() => {
      setnotification(null);
    }, 500);
    // alert("Copied the text: " + copyText);
  }

  return (
    <div className="RoomNavBar">
      <div className="title">
        <a href="#" className="navbar-logo">
          C
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m18-10v1h2v-1a7 7 0 0 0-7-7h-3v2h3a5 5 0 0 1 5 5m-13 0H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2"
            />
          </svg>
          Editor
        </a>
      </div>
      <div className="buttons">
        {roomId && (
          <button
            onClick={() => myFunction(roomId)}
            className="button room-id-btn"
          >
            Room ID {": " + roomId}
          </button>
        )}
        {currUser && currUser.username && (
          <p className="button user-btn">USER {": " + currUser.username}</p>
        )}
        <button className="button" onClick={handleLogout}>
          Log out
        </button>
        <button className="button" onClick={handleShowPeople}>
          {showPeople ? "Hide People" : "show People"}
        </button>
        <button className="leaveBtn" onClick={handleLeaveRoom}>
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default RoomNavBar;
