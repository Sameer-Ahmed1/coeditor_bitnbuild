import Intro from "./Intro";
import Fields from "./Fields";
import "./SideBar.css";

function SideBar({ activeFile, setActiveFile }) {
  return (
    <div className="SideBar">
      <Intro />
      <Fields activeFile={activeFile} setActiveFile={setActiveFile} />
    </div>
  );
}

export default SideBar;
