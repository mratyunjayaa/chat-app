import React, { useState, useRef, useEffect } from 'react';
import { IoPaperPlane } from 'react-icons/io5';
import { FiPaperclip } from 'react-icons/fi';
import { validateMessage } from '../utils/validations';

function InputBar({ onSend, onTyping }) {
  const [localMessage, setLocalMessage] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateMessage(localMessage)) return;
    onSend(localMessage);
    setLocalMessage("");
  };

  const handleChange = (e) => {
    setLocalMessage(e.target.value);
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => { if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="h-20 bg-white border-t border-slate-100 flex items-center p-4 px-6 gap-3 flex-shrink-0 z-10">
      <div className="flex items-center justify-center">
        <button 
          type="button" 
          className="text-slate-400 hover:text-indigo-600 p-2 rounded-xl hover:bg-slate-50 transition-colors focus:outline-hidden"
          onClick={() => alert("Attachment module pipeline placeholder")}
        >
          <FiPaperclip className="w-5 h-5" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={localMessage}
        onChange={handleChange}
        className="flex-1 border border-slate-200 bg-slate-50/70 text-sm p-3 px-5 rounded-xl transition-all focus:bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 outline-hidden placeholder-slate-400"
        autoComplete="off"
      />
      
      <button 
        type="submit" 
        disabled={!localMessage.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm h-11 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
      >
        <span>Send</span>
        <IoPaperPlane className="w-4 h-4" />
      </button>
    </form>
  );
}

export default InputBar;