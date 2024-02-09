import SideBar from "./components/SideBar";
import Coeditor from "./components/Coeditor";
import NavBar from "./components/NavBar";
import RoomNavBar from "./components/RoomNavBar";
import Login from "./components/Login";
import PersonLogin from "./components/PersonLogin"; // Import PersonLogin component
import { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import socketIOClient from "socket.io-client";
import loginService from "./services/login";
import userService from "./services/user";
import Notification from "./components/notification";
import ErrorMessage from "./components/errorMessage";
import "./App.css";
const ENDPOINT = "http://localhost:4001";

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPhonebookUser");
    if (loggedUserJSON) {
      // const user = JSON.parse(loggedUserJSON);
      // setUser(user);
      setLoginStatus(true);
      // If you're using the token in all requests to the server
      // you can set it in the headers of axios here
      // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }, []);

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
  const [signUp, setSignup] = useState(false);
  const [persons, setPersons] = useState([
    { name: "shiva", password: "123", currRoomID: "" },
  ]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setnotification] = useState("");
  const [error, setError] = useState("");

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

  const [currRoom, setCurrRoom] = useState();
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

  // console.log(currRoom, rooms);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedPhonebookUser", JSON.stringify(user));

      // setUser(user);
      setUsername("");
      setPassword("");
      setLoginStatus(true);
    } catch (e) {
      setError(e.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const userCreated = await userService.createUser({
        username,
        password,
      });
      if (userCreated) {
        setnotification(`${username} created successfully`);
        setTimeout(() => {
          setnotification(null);
        }, 5000);
      }

      setUsername("");
      setPassword("");
      setSignup(false);
      // window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedPhonebookUser");
    window.location.reload();
  };
  return (
    <div className="App">
      <Notification message={notification} />
      <ErrorMessage message={error} />
      {loginStatus ? (
        inRoom ? (
          <RoomNavBar
            handleLogout={handleLogout}
            handleLeaveRoom={() => {
              console.log("leave room");
            }}
          />
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
            handleSignIn={handleSignup}
            signUp={signUp}
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </div>
    </div>
  );
}

export default App;
