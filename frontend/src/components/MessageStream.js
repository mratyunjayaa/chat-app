import React, { useMemo } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { RiUser3Line } from 'react-icons/ri';

const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  try {
    return format(new Date(timestamp), 'p');
  } catch { return ''; }
};

const getDateSeparatorLabel = (timestamp) => {
  if (!timestamp) return 'Today';
  try {
    const date = new Date(timestamp);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d, yyyy');
  } catch { return 'Past Messages'; }
};

function MessageStream({ messages = [], currentUsername, typingUser, messagesEndRef }) {
  const listDateLabel = useMemo(() => {
    if (messages.length === 0) return 'Today';
    return getDateSeparatorLabel(messages[0].timestamp);
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 scrollbar-thin">
        {messages.length > 0 && (
          <div className="flex justify-center my-4">
            <span className="bg-white text-[11px] font-semibold text-slate-500 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs select-none">
              {listDateLabel}
            </span>
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMe = msg.username === currentUsername;
          return (
            <div 
              key={msg._id || `msg-${index}`} 
              className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              {!isMe && (
                <div className="flex items-center gap-1 mb-1 px-1 text-slate-500">
                  <RiUser3Line className="w-3 h-3" />
                  <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[140px]">{msg.username}</span>
                </div>
              )}
              <div className={`p-3 px-4 rounded-2xl shadow-2xs break-words max-w-full ${
                isMe 
                  ? 'bg-indigo-600 text-white rounded-tr-xs' 
                  : 'bg-slate-100/80 text-slate-800 border border-slate-200/50 rounded-tl-xs'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] select-none opacity-80">
                  <span className={isMe ? 'text-indigo-100' : 'text-slate-400'}>{formatMessageTime(msg.timestamp)}</span>
                  {isMe && <span className="text-indigo-200 font-bold ml-0.5">✓</span>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {typingUser && (
        <div className="px-6 py-2 bg-gradient-to-t from-white to-transparent flex-shrink-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs w-fit animate-fade-in">
            {/* CLEANED UP: Removed the typo class 'bg-indigo-555' from the first bouncing node */}
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
            </div>
            <span className="text-xs text-slate-500 font-medium"><span className="font-semibold text-slate-700">{typingUser}</span> is typing</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageStream;