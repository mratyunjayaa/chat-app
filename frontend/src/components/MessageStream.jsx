import React from 'react';

function MessageStream({ messages, currentUsername, typingUser, messagesEndRef }) {
  return (
    <div className="messages-stream-wrapper">
      <div className="messages-stream">
        <div className="date-separator"><span>Today</span></div>
        
        {messages.map((msg) => {
          const isMe = msg.username === currentUsername;
          
          return (
            <div 
              key={msg._id || msg.timestamp} 
              className={`message-bubble-wrapper ${isMe ? 'sent-by-me' : 'sent-by-other'}`}
            >
              {/* User Avatar Badge - Positioned on top for other users */}
              {!isMe && (
                <div className="bubble-user-badge">
                  <span className="avatar-icon">👤</span>
                  <span className="bubble-author">{msg.username}</span>
                </div>
              )}

              <div className="message-bubble">
                <p className="bubble-text">{msg.text}</p>
                
                <div className="bubble-meta-row">
                  <span className="bubble-timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMe && <span className="read-receipt-ticks">✓</span>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="typing-status-bar">
        {typingUser && <span className="typing-text">{typingUser} is typing...</span>}
      </div>
    </div>
  );
}

export default MessageStream;