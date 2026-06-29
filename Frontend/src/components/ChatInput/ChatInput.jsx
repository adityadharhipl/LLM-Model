import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Square, X, FileText } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  
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

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In the future, pass selectedFile to handleSendMessage if backend supports it
    if ((message.trim() || selectedFile) && !isLoading) {
      const fullMessage = selectedFile ? `[Attached file: ${selectedFile.name}]\n${message.trim()}` : message.trim();
      handleSendMessage(fullMessage);
      setMessage('');
      setSelectedFile(null);
      setShowEmojiPicker(false);
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

  const onEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative">
      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-full right-4 mb-2 z-50" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
        </div>
      )}

      <div className="flex flex-col gap-2 bg-gray-800/80 border border-gray-600/50 rounded-xl p-2 shadow-lg backdrop-blur-sm relative">
        
        {/* Selected File Preview */}
        {selectedFile && (
          <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-2 mx-2 mt-2 w-max max-w-[200px]">
            <FileText size={16} className="text-emerald-500 flex-shrink-0" />
            <span className="text-sm text-gray-200 truncate flex-grow">
              {selectedFile.name}
            </span>
            <button 
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 w-full">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${selectedFile ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}`}
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
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 hidden sm:block ${showEmojiPicker ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}`}
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
              disabled={!message.trim() && !selectedFile}
              type="button"
              className="p-2 bg-white text-black rounded-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              title="Send message"
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-2">
        AI chatbot can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
};

export default ChatInput;
