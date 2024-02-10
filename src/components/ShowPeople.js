import React, { useState, useEffect } from 'react';
import roomService from "../services/room";
import userService from "../services/user";
import "./ShowPeople.css";

function ShowPeople({ roomId, currUser, setNotification }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const rooms = await roomService.getRooms();
                // console.log("Rooms fetched: ", rooms);

                const room = rooms.find((room) => room.roomId === roomId);
                if (room) {
                    const users = await roomService.getOneRoom(room.id);
                    // console.log("Current users: ", users);
                    setCurrentUsers(users);
                } else {
                    // console.log("Room not found");
                }

                const allUsers = await userService.getUsers();
                // console.log("All users fetched: ", allUsers);
                setAllUsers(allUsers);
            } catch (err) {
                console.log(err);
                // Handle error
            }
        };

        fetchUsers();
    }, [roomId]);

    return (
        <div className="ShowPeople">
            <div className="currUsers-div">
                <h2 className='heading'>Current Users</h2>
                <ul className='mainList'>
                    {[...new Set(currentUsers.users)].map(userId => {
                        const user = allUsers.find(u => u.id === userId);
                        return user ? <li className='listItem' key={user.id}>{user.username}</li> : null;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ShowPeople;
