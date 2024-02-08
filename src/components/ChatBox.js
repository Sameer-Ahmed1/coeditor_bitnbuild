import "./chatBox.css"

function ChatBox({ chat }) {
    return (
        <div className="ChatBox">
            {chat === null ? (
                <p>No messages</p>
            ) : (
                <ul>
                    {chat.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
            <div className="chat-components">

            <input className="input-message" type="text" placeholder="Enter Message"></input>
        <button className="send-btn"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18.5v-13L19.423 12zM5 17l11.85-5L5 7v3.885L9.846 12L5 13.115zm0 0V7z"/></svg></button>
            </div>
        </div>
    );
}

export default ChatBox;
