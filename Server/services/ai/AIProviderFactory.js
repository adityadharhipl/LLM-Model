import OpenAIAdapter from './OpenAIAdapter.js';
import OpenRouterAdapter from './OpenRouterAdapter.js';
import GroqAdapter from './GroqAdapter.js';
import XAIAdapter from './XAIAdapter.js';
import HuggingFaceAdapter from './HuggingFaceAdapter.js';
import GeminiAdapter from './GeminiAdapter.js';

class AIProviderFactory {
  /**
   * Retrieves the appropriate AI provider adapter.
   * @param {string} providerName - The name of the provider.
   * @returns {import('./AIProvider.js').default}
   */
  static getProvider(providerName) {
    switch (providerName?.toLowerCase()) {
      case 'openai':
        return new OpenAIAdapter();
      case 'openrouter':
        return new OpenRouterAdapter();
      case 'groq':
        return new GroqAdapter();
      case 'xai':
        return new XAIAdapter();
      case 'huggingface':
        return new HuggingFaceAdapter();
      case 'gemini':
        return new GeminiAdapter();
      default:
        throw new Error(`Unsupported AI provider: ${providerName}`);
    }
  }
}

export default AIProviderFactory;
