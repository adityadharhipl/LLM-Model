import Message from '../models/Message.js';
import AIProviderFactory from '../services/ai/AIProviderFactory.js';

export const handleChat = async (req, res) => {
  const { message, history = [], provider, model, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  let reply = '';
  try {
    const selectedProvider = provider || 'openrouter';
    let key = apiKey ? apiKey.trim() : '';
    
    if (!key) {
      if (selectedProvider === 'gemini' && process.env.GEMINI_API_KEY) key = process.env.GEMINI_API_KEY.trim();
      if (selectedProvider === 'openai' && process.env.OPENAI_API_KEY) key = process.env.OPENAI_API_KEY.trim();
      if (selectedProvider === 'groq' && process.env.GROQ_API_KEY) key = process.env.GROQ_API_KEY.trim();
      if (selectedProvider === 'openrouter' && process.env.OPENROUTER_API_KEY) key = process.env.OPENROUTER_API_KEY.trim();
      if (selectedProvider === 'huggingface' && process.env.HUGGINGFACE_API_KEY) key = process.env.HUGGINGFACE_API_KEY.trim();
      if (selectedProvider === 'xai' && process.env.XAI_API_KEY) key = process.env.XAI_API_KEY.trim();
    }

    if (!key) {
      return res.status(400).json({ error: `API Key for ${selectedProvider} is missing. Please provide it in the settings.` });
    }

    const aiProvider = AIProviderFactory.getProvider(selectedProvider);
    
    reply = await aiProvider.sendMessage(message, history, model, key);

  } catch (error) {
    console.error('Error generating AI response:', error);
    reply = `Sorry, there was an error connecting to the AI service: ${error.message}`;
  }

  try {
    if (req.user) {
      await Message.create({
        user: req.user._id,
        userMessage: message,
        aiResponse: reply
      });
    }
  } catch (err) {
    console.error("Error saving message:", err);
  }

  res.json({ reply });
};
