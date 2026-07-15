import React from 'react';

function Sidebar({ onlineUsers, currentUsername }) {
  return (
    <aside className="chat-sidebar">
      <div className="sidebar-section">
        <h3>ONLINE ({onlineUsers.length})</h3>
        <ul className="users-list">
          {onlineUsers.map((user, idx) => (
            <li key={idx} className={user === currentUsername ? "active-me" : ""}>
              <span className="status-dot online"></span>
              <span className="user-name">
                {user} {user === currentUsername && '(You)'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;