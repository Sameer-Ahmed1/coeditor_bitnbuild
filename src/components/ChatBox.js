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
        </div>
    );
}

export default ChatBox;
