import OpenAICompatibleAdapter from './OpenAICompatibleAdapter.js';

class GroqAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('https://api.groq.com/openai/v1', 'llama-3.1-8b-instant');
  }
}

export default GroqAdapter;
