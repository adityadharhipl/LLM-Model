import OpenAICompatibleAdapter from './OpenAICompatibleAdapter.js';

class OpenAIAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('https://api.openai.com/v1', 'gpt-3.5-turbo');
  }
}

export default OpenAIAdapter;
