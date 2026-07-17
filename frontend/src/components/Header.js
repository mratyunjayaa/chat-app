import React from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import { BsChatDotsFill } from 'react-icons/bs';
import { RiUser3Line } from 'react-icons/ri';

function Header({ username, onlineCount = 0, onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden text-slate-500 hover:text-slate-900 p-1.5 rounded-lg active:bg-slate-50 transition-colors focus:outline-hidden"
          aria-label="Toggle navigation menu"
        >
          <HiMenuAlt2 className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <BsChatDotsFill className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-semibold text-slate-900 tracking-tight">PlanetChat</h1>
            <div className="md:hidden flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">{onlineCount} online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-medium text-xs md:text-sm text-slate-700 bg-slate-50 p-1.5 pr-3 pl-2 rounded-full border border-slate-200/60 select-none">
          <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
            <RiUser3Line className="w-3 h-3" />
          </div>
          <span className="truncate max-w-[80px] md:max-w-[120px]">{username || 'Guest'}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;