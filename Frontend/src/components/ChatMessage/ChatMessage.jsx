import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, RefreshCw, Check, Bot, User } from 'lucide-react';
import { cn } from '../../utils/classNames';

const ChatMessage = ({ message }) => {
  const isAi = message.role === 'ai';
  const isError = message.role === 'error';
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className={cn(
      "py-6 px-4 group",
      isAi || isError ? "bg-bg-chat-alt" : "bg-bg-chat"
    )}>
      <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isAi || isError ? (
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isError ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
            )}>
              <Bot size={20} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="text-sm font-semibold mb-1 text-gray-300">
            {isAi ? 'ChatGPT' : isError ? 'Error' : 'You'}
          </div>
          
          <div className={cn(
            "prose prose-invert max-w-none text-sm md:text-base leading-relaxed break-words",
            isError && "text-red-400"
          )}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  const codeId = Math.random().toString(36).substr(2, 9);
                  
                  return !inline && match ? (
                    <div className="relative group/code rounded-md bg-[#1e1e1e] my-4 border border-gray-700">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700 rounded-t-md">
                        <span className="text-xs font-mono text-gray-400">{match[1]}</span>
                        <button
                          onClick={() => handleCopyCode(codeString, codeId)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                        >
                          {copiedCodeId === codeId ? (
                            <><Check size={14} /> Copied!</>
                          ) : (
                            <><Copy size={14} /> Copy code</>
                          )}
                        </button>
                      </div>
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-b-md !my-0 !bg-transparent text-sm"
                        showLineNumbers={false}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code {...props} className="bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-gray-200">
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Action Buttons */}
          {(isAi || isError) && (
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopyMessage}
                className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors"
                title="Copy response"
              >
                {copiedMessage ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors"
                title="Regenerate response"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
