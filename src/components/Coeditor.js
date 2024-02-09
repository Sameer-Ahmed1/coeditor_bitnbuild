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
        <svg className='svg-icon' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M17.215 8.68c1.047.568 1.047 2.07 0 2.638l-11.999 6.5a1.5 1.5 0 0 1-2.214-1.32V3.5a1.5 1.5 0 0 1 2.214-1.32z"/></svg>
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
