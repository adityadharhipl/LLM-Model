import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Edit2, PanelLeftClose, User, Check, X, Search } from 'lucide-react';
import { SwipeableDrawer } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/classNames';

const Sidebar = () => {
  const { chats, activeChatId, setActiveChatId, createNewChat, deleteChat, renameChat, isSidebarOpen, setSidebarOpen } = useChat();
  const { logout, user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const isMobile = useMediaQuery('(max-width:768px)');

  const handleRenameSubmit = (id) => {
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (id) => {
    setActiveChatId(id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <>
      <div className="p-3">
        <button
          onClick={createNewChat}
          className="flex items-center gap-3 w-full p-3 rounded-md hover:bg-gray-700/50 transition-colors border border-gray-600/50 text-sm mb-3"
        >
          <Plus size={16} />
          <span>New Chat</span>
        </button>
        
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600/50 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="text-xs text-gray-400 mb-3 px-2 font-medium">Recent Chats</div>
        <div className="flex flex-col gap-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "group relative flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-700/50 transition-colors",
                activeChatId === chat.id ? "bg-gray-700/80" : ""
              )}
              onClick={() => handleChatSelect(chat.id)}
            >
              <MessageSquare size={16} className="text-gray-300" />
              
              {editingId === chat.id ? (
                <div className="flex-1 flex items-center gap-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-sm focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(chat.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button onClick={(e) => { e.stopPropagation(); handleRenameSubmit(chat.id); }} className="text-green-400 hover:text-green-300">
                    <Check size={14} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="text-red-400 hover:text-red-300">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex-1 truncate text-sm text-gray-200">
                  {chat.title}
                </div>
              )}

              {!editingId && activeChatId === chat.id && (
                <div className="flex items-center gap-1 absolute right-2 bg-gradient-to-l from-gray-700/80 pl-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTitle(chat.title);
                      setEditingId(chat.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {filteredChats.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-4">
              No chats found
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-border-dark flex items-center justify-between">
        <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors text-sm flex-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-200 truncate max-w-[120px]">
            {user?.name || 'Profile'}
          </span>
        </button>
        <button 
          onClick={logout}
          className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors"
          title="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex flex-col h-full bg-bg-sidebar transition-all duration-300 border-r border-border-dark relative z-40 left-0 top-0 bottom-0",
        isSidebarOpen ? "w-[260px] translate-x-0" : "w-0 overflow-hidden border-none -translate-x-full md:translate-x-0 md:w-0"
      )}>
        {isSidebarOpen && sidebarContent}
      </div>

      {/* Mobile Sidebar via MUI */}
      <div className="md:hidden">
        <SwipeableDrawer
          anchor="left"
          open={isSidebarOpen && isMobile}
          onClose={() => setSidebarOpen(false)}
          onOpen={() => setSidebarOpen(true)}
          PaperProps={{
            sx: {
              backgroundColor: '#1a1a1a', // matching bg-bg-sidebar
              width: '260px',
              borderRight: '1px solid #333' // matching border-dark
            }
          }}
        >
          <div className="flex flex-col h-full bg-bg-sidebar text-white">
            {sidebarContent}
          </div>
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default Sidebar;
