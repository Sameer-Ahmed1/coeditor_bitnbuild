import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import "./Coeditor.css";

export default function Coeditor({
  handleCodeChange,
  files,
  activeFile,
  DEFAULT_CODE,
  DEFAULT_FILE_NAME,
}) {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [fileContents, setFileContents] = useState("");

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const runFile = () => {
    setFileContents(files[activeFile] || DEFAULT_CODE);
    toggleCardVisibility();
  };

  const closeCard = () => {
    setIsCardVisible(false);
  };

  return (
    <div className="Coeditor">
      <div className="run-button-container">
        <button onClick={runFile} className="run-button">
          Run
        </button>
      </div>
      {isCardVisible && <div className={`code-card`}>
        <div className="input">
          <input placeholder="Enter input here"/>
        </div>
        <div className="output">
          <pre>{fileContents}</pre>
        </div>
        <button onClick={closeCard} className="close-button">
          Close
        </button>
      </div>}
      <Editor
        className="Editor"
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value={files[activeFile]?.toString() || DEFAULT_CODE}
        onChange={handleCodeChange}
      />
    </div>
  );
}
