import React from 'react';
import { RiCloseLine, RiUser3Line } from 'react-icons/ri';

function Sidebar({ onlineUsers = [], currentUsername, isMobileOpen, onCloseSidebar }) {
  return (
    <>
      {/* Mobile Backdrop Overlay Wrapper */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden transition-opacity backdrop-blur-xs"
          onClick={onCloseSidebar}
        />
      )}

      {/* 
        FIXED: Swapped `bg-slate-50` to `bg-white md:bg-slate-50` 
        This forces a solid white background on mobile screens for maximum high-contrast visibility, 
        while preserving the clean slate layout pane structure on desktop views.
      */}
      <aside className={`
        fixed inset-y-0 left-0 w-[280px] bg-white md:bg-slate-50 border-r border-slate-200 flex flex-col p-4 z-40
        transform transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
        md:relative md:transform-none md:z-10 md:flex flex-shrink-0 h-full
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Drawer Header Controls */}
        <div className="flex items-center justify-between md:hidden mb-5 pb-3 border-b border-slate-200">
          <span className="font-semibold text-slate-900 text-sm tracking-tight">Active Users</span>
          <button 
            onClick={onCloseSidebar} 
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close user list"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* User Roster Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 px-1">
            ONLINE — {onlineUsers.length}
          </h3>
          
          <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
            {onlineUsers.map((user) => {
              const isMe = user === currentUsername;

              return (
                <li 
                  key={`online-${user}`} 
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-sm transition-all border ${
                    isMe 
                      ? "bg-indigo-50/70 font-medium text-indigo-900 border-indigo-100/80 shadow-2xs" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hover:bg-slate-200/40 border-slate-100 md:border-transparent"
                  }`}
                >
                  {/* Status Indicator Green Halo */}
                  <div className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  
                  {/* User Profile Avatar Icon Box */}
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border text-[11px] ${
                    isMe 
                      ? "bg-white border-indigo-200 text-indigo-500" 
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    <RiUser3Line className="w-3 h-3" />
                  </div>

                  {/* Username Display String */}
                  <span className="truncate flex-1 tracking-tight">
                    {user} {isMe && <span className="text-xs text-indigo-500/80 font-normal ml-0.5">(You)</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;