import React, { useState } from 'react';
import axios from 'axios';
import './Man.css';
import Lab from "../DHIlab/DHIlab.jsx";

function Man() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setChat(prev => [...prev, userMessage]); // Show user message
    setInput(''); // Clear input

    try {
      const res = await axios.post('http://localhost:5000/chat', { message: input });
      const botReply = { role: 'bot', content: res.data.reply };
      setChat(prev => [...prev, botReply]); // Only add bot reply now
    } catch (err) {
      console.error(err);
      const errorReply = { role: 'bot', content: 'Error getting response.' };
      setChat(prev => [...prev, errorReply]);
    }
  };

  return (
  <div><div className="mega"><Lab/></div>
    <div className="chat-container">
      <h2>Medical Chatbot</h2>
      
      <div className="chat-box">
         <div className="disclaimer">
        <p><strong>Disclaimer:</strong> This is an AI chatbot and is for informational purposes only. It CANNOT provide medical advice, diagnose conditions, or prescribe treatments. Always consult a qualified healthcare professional for any health concerns or medical emergencies.</p>
        <p>If you are experiencing a medical emergency, please seek immediate medical attention (e.g., call your local emergency number).</p>
      </div>
        {chat.map((msg, i) => (
          <p key={i} className={`chat-message ${msg.role}`}>
            {msg.content} <strong>- {msg.role === 'user' ? 'You' : 'Bot'}</strong>
          </p>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-button">Send</button>
      </div>
    </div>
    </div>
  );
}

export default Man;
