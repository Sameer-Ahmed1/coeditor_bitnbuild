import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function CodeEditor() {
  const [code, setCode] = useState("// write your code here");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  useEffect(() => {
    console.log(code);
  }, [code]);
  return (
    <div>
      <div className={` ${isReadOnly ? "disable-input" : ""}`}>
      <p>code editor</p>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
      <button onClick={toggleReadOnly}>
        {isReadOnly ? "Enable Editing" : "Disable Editing"}
      </button>
    </div>
  );
}
