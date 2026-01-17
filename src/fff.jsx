import React, { useState } from "react";

export default function ChatApp() {
  // Initial messages
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  // Function to append a new message
  const sendMessage = () => {
    
    if (!newMessage.trim()){ return;} // Prevent empty messages

    // Create a new message object
    const messageObj = {
      id: Date.now(), // Unique ID
      text: newMessage,
      sender: "User"
    };

    // Append without mutating the old array
    setMessages((prevMessages) => [...prevMessages, messageObj]);

    setNewMessage(""); // Clear input
    console.log(messages)
  };

  return (
    <div style={styles.container}>
        
        <h1 className="title">ChAt ApP</h1>
        <h4 className="chatwith">Chating With</h4>
      <div className="msgArea" id='cont'>
        
        {
        messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "User" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "User" ? "#181d14ff" : "#2c2828ff"
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))
        }
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

// Simple inline styles
const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden"
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    backgroundColor: "#f5f5f5"
  },
  message: {
    padding: "8px 12px",
    margin: "4px 0",
    borderRadius: "12px",
    maxWidth: "70%"
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc"
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer"
  }
};