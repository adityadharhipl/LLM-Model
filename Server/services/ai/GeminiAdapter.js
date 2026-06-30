import { GoogleGenerativeAI } from '@google/generative-ai';
import AIProvider from './AIProvider.js';

class GeminiAdapter extends AIProvider {
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

    const genAI = new GoogleGenerativeAI(apiKey);
    const geminiModel = genAI.getGenerativeModel({ model: model || "gemini-1.5-flash" });
    
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    const chat = geminiModel.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  }
}

export default GeminiAdapter;
