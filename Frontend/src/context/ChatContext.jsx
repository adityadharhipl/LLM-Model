import React, { createContext, useState, useEffect } from 'react';
import { sendMessage } from '../services/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('ai_chats');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    const savedId = localStorage.getItem('ai_active_chat_id');
    return savedId || null;
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedProvider, setSelectedProvider] = useState(() => {
    return localStorage.getItem('ai_selected_provider') || 'openrouter';
  });

  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('ai_selected_model') || 'openai/gpt-4o';
  });

  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem('ai_api_keys');
    return saved ? JSON.parse(saved) : { gemini: '', openai: '', groq: '', openrouter: '', huggingface: '', xai: '' };
  });

  // Save to local storage whenever chats change
  useEffect(() => {
    localStorage.setItem('ai_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('ai_selected_provider', selectedProvider);
  }, [selectedProvider]);

  useEffect(() => {
    localStorage.setItem('ai_selected_model', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    localStorage.setItem('ai_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem('ai_active_chat_id', activeChatId);
    } else {
      localStorage.removeItem('ai_active_chat_id');
    }
  }, [activeChatId]);

  useEffect(() => {
    const handleRestore = () => {
      const savedBackup = localStorage.getItem('ai_chats_backup');
      const savedActiveId = localStorage.getItem('ai_active_chat_id_backup');
      if (savedBackup) {
        setChats(JSON.parse(savedBackup));
        if (savedActiveId && savedActiveId !== 'null') {
          setActiveChatId(savedActiveId);
        }
      }
    };
    window.addEventListener('restore-chat-backup', handleRestore);
    return () => window.removeEventListener('restore-chat-backup', handleRestore);
  }, []);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const renameChat = (id, newTitle) => {
    setChats(prev => prev.map(c => 
      c.id === id ? { ...c, title: newTitle } : c
    ));
  };

  const generateTitle = (firstMessage) => {
    return firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
  };

  const handleSendMessage = async (content) => {
    let currentChatId = activeChatId;

    if (!currentChatId) {
      const newChat = {
        id: Date.now().toString(),
        title: generateTitle(content),
        messages: []
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      currentChatId = newChat.id;
    }

    // Add user message
    const userMessage = { role: 'user', content };
    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        // Auto-generate title if it's "New Chat"
        const title = chat.messages.length === 0 ? generateTitle(content) : chat.title;
        return { ...chat, title, messages: [...chat.messages, userMessage] };
      }
      return chat;
    }));

    setIsLoading(true);
    setError(null);

    try {
      const currentApiKey = apiKeys[selectedProvider];
      
      // Get the existing messages before the new user message was added to use as history
      const currentChat = chats.find(c => c.id === currentChatId);
      const history = currentChat ? currentChat.messages : [];
      // Don't include the error messages in history to avoid confusing the AI
      const cleanHistory = history.filter(msg => msg.role !== 'error');

      const response = await sendMessage(content, cleanHistory, selectedProvider, selectedModel, currentApiKey);
      const aiMessage = { role: 'ai', content: response.reply || "No response received" };
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
      ));
    } catch (err) {
      setError(err.message);
      
      const errMsg = err.message.toLowerCase();
      if (errMsg.includes('not authorized') || errMsg.includes('token') || errMsg.includes('401')) {
        // Auto-save history on token expiration
        const currentChats = localStorage.getItem('ai_chats');
        const currentId = localStorage.getItem('ai_active_chat_id');
        if (currentChats) localStorage.setItem('ai_chats_backup', currentChats);
        if (currentId) localStorage.setItem('ai_active_chat_id_backup', currentId);
      }

      // Optional: Add an error message to the chat
      const errorMessage = { role: 'error', content: err.message };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const backupChatHistory = () => {
    const currentChats = localStorage.getItem('ai_chats');
    const currentId = localStorage.getItem('ai_active_chat_id');
    if (currentChats) {
      localStorage.setItem('ai_chats_backup', currentChats);
    }
    if (currentId) {
      localStorage.setItem('ai_active_chat_id_backup', currentId);
    }
  };

  const restoreChatHistory = () => {
    const savedBackup = localStorage.getItem('ai_chats_backup');
    const savedActiveId = localStorage.getItem('ai_active_chat_id_backup');
    if (savedBackup) {
      setChats(JSON.parse(savedBackup));
      if (savedActiveId && savedActiveId !== 'null') {
        setActiveChatId(savedActiveId);
      }
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      activeChatId,
      setActiveChatId,
      createNewChat,
      deleteChat,
      renameChat,
      handleSendMessage,
      isSidebarOpen,
      setSidebarOpen,
      isSettingsOpen,
      setSettingsOpen,
      selectedProvider,
      setSelectedProvider,
      selectedModel,
      setSelectedModel,
      apiKeys,
      setApiKeys,
      isLoading,
      error,
      backupChatHistory,
      restoreChatHistory,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
