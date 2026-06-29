import React from 'react';
import { Bot, MessageSquare, Zap, Shield } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
        <Bot size={40} />
      </div>
      <h2 className="text-2xl font-bold text-gray-200 mb-8 text-center">
        How can I help you today?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {/* Card 1 */}
        <button className="flex flex-col items-start p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-colors text-left group">
          <MessageSquare className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <h3 className="text-sm font-semibold text-gray-200 mb-1">Explain quantum computing</h3>
          <p className="text-xs text-gray-400">in simple terms for a 5-year old</p>
        </button>

        {/* Card 2 */}
        <button className="flex flex-col items-start p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-colors text-left group hidden md:flex">
          <Zap className="text-yellow-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <h3 className="text-sm font-semibold text-gray-200 mb-1">Brainstorm ideas</h3>
          <p className="text-xs text-gray-400">for a 10 year old's birthday party</p>
        </button>

        {/* Card 3 */}
        <button className="flex flex-col items-start p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-colors text-left group hidden lg:flex">
          <Shield className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <h3 className="text-sm font-semibold text-gray-200 mb-1">Write a SQL query</h3>
          <p className="text-xs text-gray-400">that finds the highest paying jobs</p>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
