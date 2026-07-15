import React from 'react';

function Header({ username }) {
  return (
    <header className="global-header">
      <div className="header-left">
        <div className="app-logo">💬</div>
        <h1>Global Chat</h1>
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