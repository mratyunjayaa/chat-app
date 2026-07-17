import React, { useState } from 'react';
import { BsChatDotsFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

function Login({ username, setUsername, onLogin, isLoading = false }) {
  // Prevent form submission with empty trailing or leading spaces
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onLogin(e);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gray-50/50 px-4 select-none">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-xs w-full max-w-[380px] border border-gray-100/80"
      >
        {/* Branding Headers */}
        <div className="flex flex-col items-center text-center mb-2">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-2xs">
            <BsChatDotsFill className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mt-4 tracking-tight">
            Welcome to PlanetChat
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            One planet. Millions of conversations.
          </p>
        </div>

        {/* Input Block */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs font-semibold text-gray-600 px-0.5">
            Username
          </label>
          <input 
            id="username"
            type="text" 
            placeholder="How should others know you? (e.g., vikky09)" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            className="p-3 px-4 border border-gray-200 rounded-xl font-medium text-sm outline-hidden bg-gray-50/70 focus:bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 transition-all text-gray-900 placeholder-gray-400 disabled:opacity-50"
            autoComplete="off"
            maxLength={25}
          />
        </div>
        
        {/* Submit Actions */}
        <button 
          type="submit" 
          disabled={isLoading || !username.trim()}
          className="p-3 bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm cursor-pointer shadow-sm shadow-indigo-100 hover:bg-indigo-700 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <CgSpinner className="animate-spin w-4 h-4" />
              <span>Connecting to Server...</span>
            </>
          ) : (
            <span>Join the Planet</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;