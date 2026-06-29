import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="py-6 px-4 bg-bg-chat-alt">
      <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Bot size={20} />
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="text-sm font-semibold mb-2 text-gray-300">
            ChatGPT
          </div>
          
          <div className="flex items-center gap-1.5 h-6">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
