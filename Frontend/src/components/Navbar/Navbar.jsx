import React from 'react';
import { PanelLeft, AlertTriangle, Trash2, Search, Settings } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const Navbar = () => {
  const { activeChat, isSidebarOpen, setSidebarOpen, deleteChat, setSettingsOpen } = useChat();

  return (
    <div className="flex items-center justify-between h-14 border-b border-border-dark px-4 bg-bg-chat sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors"
            title="Open Sidebar"
          >
            <PanelLeft size={20} />
          </button>
        )}
        <span className="font-medium text-gray-200">
          {activeChat ? activeChat.title : 'New Chat'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSettingsOpen(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors" 
          title="Settings"
        >
          <Settings size={18} />
        </button>
        <button className="p-2 text-orange-400 hover:bg-gray-700/50 rounded-md transition-colors" title="Alerts">
          <AlertTriangle size={18} />
        </button>
        {activeChat && (
          <button 
            onClick={() => deleteChat(activeChat.id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-md transition-colors"
            title="Delete Chat"
          >
            <Trash2 size={18} />
          </button>
        )}
        <div className="relative hidden sm:block ml-2">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-48 bg-gray-800/50 border border-gray-600/50 rounded-full py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
