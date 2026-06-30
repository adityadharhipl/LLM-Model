import OpenAICompatibleAdapter from './OpenAICompatibleAdapter.js';

class HuggingFaceAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('https://api-inference.huggingface.co/v1/', 'meta-llama/Meta-Llama-3-8B-Instruct');
  }
}

export default HuggingFaceAdapter;
