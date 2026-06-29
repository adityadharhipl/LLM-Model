import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const SettingsModal = () => {
  const { isSettingsOpen, setSettingsOpen, selectedModel, setSelectedModel, apiKeys, setApiKeys } = useChat();

  const [localKeys, setLocalKeys] = useState(apiKeys);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setApiKeys(localKeys);
    setSettingsOpen(false);
  };

  const handleKeyChange = (model, value) => {
    setLocalKeys(prev => ({ ...prev, [model]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-bg-chat w-[90%] max-w-md rounded-xl shadow-2xl border border-gray-700 p-6 relative">
        <button 
          onClick={() => setSettingsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-100 mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select AI Model</label>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option value="gemini">Google Gemini (gemini-1.5-flash)</option>
              <option value="openai">OpenAI (gpt-3.5-turbo)</option>
              <option value="groq">Groq (llama-3.1-8b-instant)</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-2">API Keys</h3>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Gemini API Key</label>
              <input 
                type="password"
                value={localKeys.gemini}
                onChange={(e) => handleKeyChange('gemini', e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">OpenAI API Key</label>
              <input 
                type="password"
                value={localKeys.openai}
                onChange={(e) => handleKeyChange('openai', e.target.value)}
                placeholder="sk-..."
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Groq API Key</label>
              <input 
                type="password"
                value={localKeys.groq}
                onChange={(e) => handleKeyChange('groq', e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
