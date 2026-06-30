import OpenAICompatibleAdapter from './OpenAICompatibleAdapter.js';

class OpenRouterAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('https://openrouter.ai/api/v1', 'openai/gpt-4o');
  }
}

export default OpenRouterAdapter;
