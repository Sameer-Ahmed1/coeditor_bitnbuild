import Intro from "./Intro"
import Fields from "./Fields";
import "./SideBar.css"

function SideBar() {
    return <div className="SideBar">
        <Intro />
        <Fields />
    </div>;
}
  
export default SideBar;
  