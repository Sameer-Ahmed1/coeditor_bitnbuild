import { useState } from "react";
import ChatBox from "./ChatBox";
function Coeditor() {
    const [showChatBox, setShowChatBox] = useState(false); // State to manage ChatBox visibility

    return (
        <div className="Coeditor">
            {showChatBox && <ChatBox />}
            <button className="ChatBoxButton" onClick={() => setShowChatBox(!showChatBox)}>Toggle ChatBox</button>
            
            <div className="MainEditor">
                coeditor component
            </div>
        </div>
    );
}

export default Coeditor;