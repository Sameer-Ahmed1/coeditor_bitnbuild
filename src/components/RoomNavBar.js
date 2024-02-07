import React from 'react';
import './RoomNavBar.css';

function RoomNavBar() {
    const handleButtonClick = (buttonName) => {
        console.log(buttonName);
    };

    return (
        <div className="RoomNavBar">
            <div className="title">Coeditor</div>
            <div className="buttons">
                <button className="button" onClick={() => handleButtonClick('Room id')}>Room id</button>
                <button className="button" onClick={() => handleButtonClick('Add People')}>Add People</button>
                <button className="button" onClick={() => handleButtonClick('Add Room')}>Add Room</button>
                <button className="button" onClick={() => handleButtonClick('Leave Room')}>Leave Room</button>
            </div>
        </div>
    );
}

export default RoomNavBar;
