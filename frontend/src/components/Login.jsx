import React from 'react';

function Login({ username, setUsername, onLogin }) {
  return (
    <div className="login-screen">
      <h2>Enter Chat App</h2>
      <form onSubmit={onLogin}>
        <input 
          type="text" 
          placeholder="Choose a username..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
}

export default Login;