import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://llm-model-gew3.vercel.app';

const getAuthToken = () => {
  const userStr = localStorage.getItem('ai_chat_user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user?.token || null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const sendMessage = async (message, history, model, apiKey) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    };
    
    const response = await axios.post(`${API_URL}/api/chat`, { message, history, model, apiKey }, config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.error || "Failed to connect to the AI service.");
  }
};
