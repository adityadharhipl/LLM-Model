import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import EmptyState from '../EmptyState/EmptyState';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import { useChat } from '../../hooks/useChat';

const ChatWindow = () => {
  const { activeChat, isLoading } = useChat();
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isLoading]);

  const hasMessages = activeChat && activeChat.messages.length > 0;

  return (
    <div className="flex-1 overflow-y-auto w-full relative bg-bg-chat flex flex-col">
      {!hasMessages && !isLoading ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col pb-32">
          {activeChat?.messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} className="h-32" />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
