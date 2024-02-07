import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

export default function CodeEditor() {
  const DEFAULT_CODE = "// write your code here";
  const DEFAULT_FILE_NAME = "script.js";

  const [socket, setSocket] = useState(null);
  const [files, setFiles] = useState({
    [DEFAULT_FILE_NAME]: DEFAULT_CODE,
  });
  const [isReadOnly, setIsReadOnly] = useState(false);
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
    socket.emit("join", roomId);
  };
  const leaveRoom = () => {
    if (socket == null) return;
    socket.emit("leave", roomId);
    setRoomId(""); // Clear the room ID
  };

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <div>
      <button
        disabled={activeFile === "script.js"}
        onClick={() => setActiveFile("script.js")}
      >
        script.js
      </button>
      <button
        disabled={activeFile === "style.css"}
        onClick={() => setActiveFile("style.css")}
      >
        style.css
      </button>
      <button
        disabled={activeFile === "index.html"}
        onClick={() => setActiveFile("index.html")}
      >
        index.html
      </button>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room ID"
      />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={leaveRoom}>Leave Room</button>
      <div className={` ${isReadOnly ? "disable-input" : ""}`}>
        <p>code editor : {activeFile}</p>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          value={files[activeFile]?.toString() || DEFAULT_CODE}
          onChange={handleCodeChange}
        />
      </div>
      <button onClick={toggleReadOnly}>
        {isReadOnly ? "Enable Editing" : "Disable Editing"}
      </button>
    </div>
  );
}
