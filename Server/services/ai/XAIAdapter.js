import OpenAICompatibleAdapter from './OpenAICompatibleAdapter.js';

class XAIAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('https://api.x.ai/v1', 'grok-beta');
  }
}

export default XAIAdapter;
