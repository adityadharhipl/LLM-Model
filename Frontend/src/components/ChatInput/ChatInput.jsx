import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Square } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const { handleSendMessage, isLoading } = useChat();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      handleSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative flex items-end gap-2 bg-gray-800/80 border border-gray-600/50 rounded-xl p-2 shadow-lg backdrop-blur-sm">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a new message here..."
          className="w-full max-h-[200px] bg-transparent border-none focus:ring-0 text-gray-200 placeholder:text-gray-500 resize-none py-2 px-1 text-sm overflow-y-auto outline-none"
          rows={1}
        />

        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0 hidden sm:block"
          title="Insert emoji"
        >
          <Smile size={20} />
        </button>

        {isLoading ? (
          <button
            type="button"
            className="p-2 bg-gray-600 text-gray-200 rounded-lg flex-shrink-0 hover:bg-gray-500 transition-colors"
            title="Stop generating"
          >
            <Square size={20} className="fill-current" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            type="button"
            className="p-2 bg-white text-black rounded-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            title="Send message"
          >
            <Send size={20} />
          </button>
        )}
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        AI chatbot can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
};

export default ChatInput;
