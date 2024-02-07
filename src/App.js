import "./App.css";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
function App() {
  return (
    <div className="App">
      <CodeEditor />
    </div>
  );
}

export default App;
