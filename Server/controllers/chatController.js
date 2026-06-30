import Message from '../models/Message.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

export const handleChat = async (req, res) => {
  const { message, history = [], model, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  let reply = '';
  try {
    const selectedModel = model || 'groq';
    let key = apiKey ? apiKey.trim() : '';
    
    if (!key) {
      if (selectedModel === 'gemini' && process.env.GEMINI_API_KEY) key = process.env.GEMINI_API_KEY.trim();
      if (selectedModel === 'openai' && process.env.OPENAI_API_KEY) key = process.env.OPENAI_API_KEY.trim();
      if (selectedModel === 'groq' && process.env.GROQ_API_KEY) key = process.env.GROQ_API_KEY.trim();
    }

    if (!key && selectedModel !== 'ollama') {
      return res.status(400).json({ error: `API Key for ${selectedModel} is missing. Please provide it in the settings.` });
    }

    if (selectedModel === 'gemini') {
      const genAI = new GoogleGenerativeAI(key);
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const formattedHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const chat = geminiModel.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(message);
      const response = await result.response;
      reply = response.text();
    } else if (selectedModel === 'openai') {
      const openai = new OpenAI({ apiKey: key });
      const formattedHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      const chatCompletion = await openai.chat.completions.create({
        messages: [...formattedHistory, { role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });
      reply = chatCompletion.choices[0].message.content;
    } else if (selectedModel === 'groq') {
      const groq = new Groq({ apiKey: key });
      const formattedHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [...formattedHistory, { role: 'user', content: message }],
        model: 'llama-3.1-8b-instant',
      });
      reply = chatCompletion.choices[0].message.content;
    } else if (selectedModel === 'ollama') {
      const ollama = new OpenAI({
        baseURL: 'http://localhost:11434/v1',
        apiKey: 'ollama', // API key is required by the SDK but ignored by Ollama
      });
      const formattedHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      const chatCompletion = await ollama.chat.completions.create({
        messages: [...formattedHistory, { role: 'user', content: message }],
        model: key || 'llama3', // Use the provided 'apiKey' field as the model name for Ollama, default to llama3
      });
      reply = chatCompletion.choices[0].message.content;
    } else {
      reply = `Unsupported model: ${selectedModel}`;
    }

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
