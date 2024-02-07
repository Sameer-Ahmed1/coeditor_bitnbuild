import React, { useState } from 'react';
import './FilesTab.css'; // Import your CSS file for styling

function FilesTab() {
    // State to store the list of files
    const [files, setFiles] = useState([]);
    // State to manage the input value
    const [fileNameInput, setFileNameInput] = useState('');
    // State to track if the input box is visible
    const [inputVisible, setInputVisible] = useState(false);

    // Function to handle adding a new file
    const handleAddFile = () => {
        setInputVisible(true); // Show the input box
    };

    // Function to handle clicking on a file
    const handleFileClick = (fileName) => {
        console.log("Clicked file:", fileName);
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        setFileNameInput(e.target.value);
    };

    // Function to handle input blur
    const handleInputBlur = () => {
        if (fileNameInput.trim() !== '') {
            saveFileName();
        }
        setInputVisible(false); // Hide the input box
    };

    // Function to handle Enter key press on input box
    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveFileName();
            setInputVisible(false); // Hide the input box
        }
    };

    // Function to save file name
    const saveFileName = () => {
        // Create a new file object
        const newFile = {
            name: fileNameInput.trim(),
            // You can add additional properties to the file object as needed
        };
        // Add the new file to the list of files
        setFiles([...files, newFile]);
        // Clear the input field
        setFileNameInput('');
    };

    return (
        <div className="FilesTab">
            {/* Button to add a new file */}
            <div className="inputContainer">
                <button className="addButton" onClick={handleAddFile}>Add File</button>
            </div>
            {/* Display the list of files */}
            <div className="fileList">
                {files.map((file, index) => (
                    <div className="fileItem" key={index} onClick={() => handleFileClick(file.name)}>
                        {file.name}
                    </div>
                ))}
            </div>
            {/* Input box for adding a new file */}
            {inputVisible && (
                <div className="inputContainer">
                    <input
                        className="fileInput"
                        type="text"
                        placeholder="Enter file name"
                        value={fileNameInput}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyPress={handleInputKeyPress} // Handle Enter key press
                        autoFocus // Auto-focus the input box when it appears
                    />
                </div>
            )}
        </div>
    );
}

export default FilesTab;
