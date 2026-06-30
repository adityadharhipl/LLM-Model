import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const PROVIDERS = {
  openrouter: {
    name: 'OpenRouter',
    models: [
      { id: 'openai/gpt-4o', name: 'GPT-4o' },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
      { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B' }
    ]
  },
  openai: {
    name: 'OpenAI',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ]
  },
  groq: {
    name: 'Groq',
    models: [
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
      { id: 'llama3-70b-8192', name: 'Llama 3 70B' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' }
    ]
  },
  xai: {
    name: 'xAI (Grok)',
    models: [
      { id: 'grok-beta', name: 'Grok Beta' }
    ]
  },
  huggingface: {
    name: 'Hugging Face',
    models: [
      { id: 'meta-llama/Meta-Llama-3-8B-Instruct', name: 'Llama 3 8B Instruct' },
      { id: 'mistralai/Mistral-7B-Instruct-v0.2', name: 'Mistral 7B Instruct' }
    ]
  },
  gemini: {
    name: 'Google Gemini',
    models: [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
    ]
  }
};

const SettingsModal = () => {
  const { 
    isSettingsOpen, 
    setSettingsOpen, 
    selectedProvider,
    setSelectedProvider,
    selectedModel, 
    setSelectedModel, 
    apiKeys, 
    setApiKeys, 
    backupChatHistory, 
    restoreChatHistory 
  } = useChat();

  const [localKeys, setLocalKeys] = useState(apiKeys);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setApiKeys(localKeys);
    setSettingsOpen(false);
  };

  const handleKeyChange = (provider, value) => {
    setLocalKeys(prev => ({ ...prev, [provider]: value }));
  };

  const handleProviderChange = (e) => {
    const newProvider = e.target.value;
    if (backupChatHistory && restoreChatHistory) {
      backupChatHistory();
      setSelectedProvider(newProvider);
      setSelectedModel(PROVIDERS[newProvider].models[0].id);
      setTimeout(() => restoreChatHistory(), 0);
    } else {
      setSelectedProvider(newProvider);
      setSelectedModel(PROVIDERS[newProvider].models[0].id);
    }
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    if (backupChatHistory && restoreChatHistory) {
      backupChatHistory();
      setSelectedModel(newModel);
      setTimeout(() => restoreChatHistory(), 0);
    } else {
      setSelectedModel(newModel);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-bg-chat w-[90%] max-w-md rounded-xl shadow-2xl border border-gray-700 p-6 relative max-h-[90vh] flex flex-col">
        <button 
          onClick={() => setSettingsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex-shrink-0">Settings</h2>

        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Provider</label>
            <select 
              value={selectedProvider}
              onChange={handleProviderChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:border-blue-500 mb-4"
            >
              {Object.entries(PROVIDERS).map(([key, data]) => (
                <option key={key} value={key}>{data.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Model</label>
            <select 
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:border-blue-500"
            >
              {PROVIDERS[selectedProvider]?.models.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-2">API Keys</h3>
            
            {Object.keys(PROVIDERS).map((providerKey) => (
              <div key={providerKey}>
                <label className="block text-xs text-gray-400 mb-1">{PROVIDERS[providerKey].name} API Key</label>
                <input 
                  type="password"
                  value={localKeys[providerKey] || ''}
                  onChange={(e) => handleKeyChange(providerKey, e.target.value)}
                  placeholder="Enter API Key..."
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 flex-shrink-0"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
