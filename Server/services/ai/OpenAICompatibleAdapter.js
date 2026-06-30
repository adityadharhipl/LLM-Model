import OpenAI from 'openai';
import AIProvider from './AIProvider.js';

/**
 * Adapter for any OpenAI-compatible API provider.
 * @implements {AIProvider}
 */
class OpenAICompatibleAdapter extends AIProvider {
  /**
   * @param {string} baseURL - The base URL for the API.
   * @param {string} defaultModel - The default model if none is specified.
   */
  constructor(baseURL, defaultModel) {
    super();
    this.baseURL = baseURL;
    this.defaultModel = defaultModel;
  }

  /**
   * @param {string} message 
   * @param {Array<{role: string, content: string}>} history 
   * @param {string} model 
   * @param {string} apiKey 
   * @returns {Promise<string>}
   */
  async sendMessage(message, history, model, apiKey) {
    if (!apiKey) {
      throw new Error("API key is missing.");
    }

    const openai = new OpenAI({ 
      apiKey: apiKey,
      baseURL: this.baseURL,
    });

    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : msg.role === 'system' ? 'system' : 'assistant',
      content: msg.content
    }));

    const chatCompletion = await openai.chat.completions.create({
      messages: [...formattedHistory, { role: 'user', content: message }],
      model: model || this.defaultModel,
    });

    return chatCompletion.choices[0].message.content;
  }
}

export default OpenAICompatibleAdapter;
