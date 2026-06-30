/**
 * Base AI Provider interface to be implemented by all adapters.
 * @interface
 */
class AIProvider {
  /**
   * Sends a message to the AI provider.
   * 
   * @param {string} message - The new user message.
   * @param {Array<{role: string, content: string}>} history - The chat history.
   * @param {string} model - The model identifier.
   * @param {string} apiKey - The API key for the provider.
   * @returns {Promise<string>} The AI's response text.
   * @throws {Error} If the API request fails.
   */
  async sendMessage(message, history, model, apiKey) {
    throw new Error("Method 'sendMessage()' must be implemented.");
  }
}

export default AIProvider;
