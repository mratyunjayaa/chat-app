import React from 'react';

function InputBar({ message, setMessage, onSend, onTyping }) {
  return (
    <form onSubmit={onSend} className="chat-input-bar">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onTyping}
        className="main-text-field"
        required
      />
      <button type="submit" className="submit-send-btn">➤ Send</button>
    </form>
  );
}

export default InputBar;