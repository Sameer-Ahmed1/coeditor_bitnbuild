import SideBar from "./components/SideBar";
import Coeditor from "./components/Coeditor";
import NavBar from "./components/NavBar";
import RoomNavBar from "./components/RoomNavBar";
import Login from "./components/Login";
import { useState } from "react";
import "./App.css";

function App() {
  const [inRoom, setInRoom] = useState(true);

  return (
    <div className="App">
      {inRoom ? <RoomNavBar /> : <NavBar />}

      <div className="Content">
        {!inRoom ? <Login /> : (
          <>
            <SideBar />
            <Coeditor />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
