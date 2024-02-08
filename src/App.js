import SideBar from "./components/SideBar";
import Coeditor from "./components/Coeditor";
import NavBar from "./components/NavBar";
import RoomNavBar from "./components/RoomNavBar";
import Login from "./components/Login";
import PersonLogin from "./components/PersonLogin"; // Import PersonLogin component
import { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import socketIOClient from "socket.io-client";

import "./App.css";
const ENDPOINT = "http://localhost:4001";

function App() {
  /********************************socket ******************************* */
  const DEFAULT_CODE = "// write your code here";
  const DEFAULT_FILE_NAME = "script.js";

  const [socket, setSocket] = useState(null);
  const [files, setFiles] = useState({
    [DEFAULT_FILE_NAME]: DEFAULT_CODE,
  });
  const [roomId, setRoomId] = useState("");
  const [activeFile, setActiveFile] = useState("script.js");

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("code", ({ fileName, newCode }) => {
      setFiles((oldFiles) => ({
        ...oldFiles,
        [fileName]: newCode,
      }));
    });
  }, [socket]);

  const handleCodeChange = (newCode) => {
    setFiles((oldFiles) => ({
      ...oldFiles,
      [activeFile]: newCode,
    }));
    if (socket) {
      socket.emit("code", { roomId: roomId, fileName: activeFile, newCode });
    }
  };

  const joinRoom = () => {
    if (socket == null) return;
    setInRoom(true);
    socket.emit("join", roomId);
  };
  const leaveRoom = () => {
    if (socket == null) return;
    socket.emit("leave", roomId);
    setRoomId(""); // Clear the room ID
    setInRoom(false);
  };

  /****************************************************** */
  const [persons, setPersons] = useState([
    { name: "shiva", password: "123", currRoomID: "" },
  ]);
  const [rooms, setRooms] = useState([
    {
      id: "test123",
      name: "test",
      joinLink: "joinhere",
      persons: ["shiva"],
      owner: "shiva",
      chat: ["hi", "hello", "howareyou", "i am fine"],
    },
  ]);

  const [inRoom, setInRoom] = useState(false);
  const [currRoom, setCurrRoom] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [currPerson, setCurrPerson] = useState();
  //localStorage.removeItem('currPerson'); -> run this in the console to clear local person
  const [showChatBox, setShowChatBox] = useState(false); // State to manage ChatBox visibility

  useEffect(() => {
    const storedPerson = localStorage.getItem("currPerson");
    if (storedPerson) {
      const parsedPerson = JSON.parse(storedPerson);
      setCurrPerson(parsedPerson);
      setLoginStatus(true);
    }
  }, []);

  console.log(currRoom, rooms);

  const handlePersonLogin = (person) => {
    //localStorage.setItem('currPerson', JSON.stringify(person));
    setCurrPerson(person);
    setLoginStatus(true);
  };

  return (
    <div className="App">
      {loginStatus ? (
        inRoom ? (
          <RoomNavBar handleLeaveRoom={leaveRoom} />
        ) : (
          <NavBar />
        )
      ) : (
        <NavBar />
      )}

      <div className="Content">
        {loginStatus ? (
          inRoom ? (
            <>
              <SideBar activeFile={activeFile} setActiveFile={setActiveFile} />
              <Coeditor
                handleCodeChange={handleCodeChange}
                files={files}
                activeFile={activeFile}
                DEFAULT_CODE={DEFAULT_CODE}
                DEFAULT_FILE_NAME={DEFAULT_FILE_NAME}
              />
              {showChatBox && (
                <ChatBox chat={currRoom ? currRoom.chat : null} />
              )}
              <button
                className="ChatBoxButton"
                onClick={() => setShowChatBox(!showChatBox)}
              >
                Toggle ChatBox
              </button>
            </>
          ) : (
            <Login joinRoom={joinRoom} roomId={roomId} setRoomId={setRoomId} />
          )
        ) : (
          <PersonLogin
            onPersonLogin={handlePersonLogin}
            setCurrPerson={setCurrPerson}
            persons={persons}
            setCurrRoom={setCurrRoom}
            setInRoom={setInRoom}
            rooms={rooms}
          />
        )}
      </div>
    </div>
  );
}

export default App;
