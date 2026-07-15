import React from 'react';

function Header({ username, onlineCount }) {
  return (
    <header className="global-header">
      <div className="header-left">
        <div className="app-logo">💬</div>
        <div>
          <h1>Global Chat</h1>
          {/* Mobile status indicator visible only on small viewports */}
          <span className="mobile-online-count">
            🟢 {onlineCount} active now
          </span>
        </div>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <span className="avatar">👤</span>
          <span className="profile-name">{username}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;