import SideBar from "./components/SideBar";
import Coeditor from "./components/Coeditor";
import NavBar from "./components/NavBar";
import RoomNavBar from "./components/RoomNavBar";
import Login from "./components/Login";
import PersonLogin from "./components/PersonLogin"; // Import PersonLogin component
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([{ name: 'shiva', password: '123', currRoomID: '' }])
  const [rooms, setRooms] = useState([{ id: 'test123', name: 'test', joinLink: 'joinhere', persons: ['shiva'], owner: 'shiva', chat: [] }]);

  const [inRoom, setInRoom] = useState(false);
  const [currRoom, setCurrRoom] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [currPerson, setCurrPerson] = useState();
  //localStorage.removeItem('currPerson'); -> run this in the console to clear local person


  useEffect(() => {
    const storedPerson = localStorage.getItem('currPerson');
    if (storedPerson) {
      const parsedPerson = JSON.parse(storedPerson);
      setCurrPerson(parsedPerson);
      setLoginStatus(true);
    }
  }, []);

  console.log(currRoom, rooms)

  const handlePersonLogin = (person) => {
    //localStorage.setItem('currPerson', JSON.stringify(person));
    setCurrPerson(person);
    setLoginStatus(true);
  };

  return (
    <div className="App">
      {loginStatus ? (inRoom ? <RoomNavBar /> : <NavBar />) : null}

      <div className="Content">
        {loginStatus ? (
          inRoom ? (
            <>
              <SideBar />
              <Coeditor />
            </>
          ) : (
            <Login
              setInRoom={setInRoom}
              rooms={rooms}
              setRooms={setRooms}
              setCurrRoom={setCurrRoom}
              currPerson={currPerson}
              setPersons={setPersons}
            />
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
