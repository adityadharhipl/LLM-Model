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

  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('ai_selected_model') || 'groq';
  });

  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem('ai_api_keys');
    return saved ? JSON.parse(saved) : { gemini: '', openai: '', groq: '' };
  });

  // Save to local storage whenever chats change
  useEffect(() => {
    localStorage.setItem('ai_chats', JSON.stringify(chats));
  }, [chats]);

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
      const currentApiKey = apiKeys[selectedModel];
      
      // Get the existing messages before the new user message was added to use as history
      const currentChat = chats.find(c => c.id === currentChatId);
      const history = currentChat ? currentChat.messages : [];
      // Don't include the error messages in history to avoid confusing the AI
      const cleanHistory = history.filter(msg => msg.role !== 'error');

      const response = await sendMessage(content, cleanHistory, selectedModel, currentApiKey);
      const aiMessage = { role: 'ai', content: response.reply || "No response received" };
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
      ));
    } catch (err) {
      setError(err.message);
      // Optional: Add an error message to the chat
      const errorMessage = { role: 'error', content: err.message };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
      ));
    } finally {
      setIsLoading(false);
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
      selectedModel,
      setSelectedModel,
      apiKeys,
      setApiKeys,
      isLoading,
      error,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
