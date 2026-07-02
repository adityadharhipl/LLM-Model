import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Select, MenuItem, InputLabel, FormControl, 
  TextField, IconButton, Typography, Box, Divider
} from '@mui/material';
import { X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const SettingsModal = () => {
  const { isSettingsOpen, setSettingsOpen, selectedModel, setSelectedModel, apiKeys, setApiKeys, backupChatHistory, restoreChatHistory } = useChat();
  const [localKeys, setLocalKeys] = useState(apiKeys);

  // Sync local keys when modal opens
  useEffect(() => {
    if (isSettingsOpen) setLocalKeys(apiKeys);
  }, [isSettingsOpen, apiKeys]);

  const handleSave = () => {
    setApiKeys(localKeys);
    setSettingsOpen(false);
  };

  const handleKeyChange = (model, value) => {
    setLocalKeys(prev => ({ ...prev, [model]: value }));
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    if (backupChatHistory && restoreChatHistory) {
      backupChatHistory();
      setSelectedModel(newModel);
      setTimeout(() => restoreChatHistory(), 0);
    } else {
      setSelectedModel(newModel);
    }
  };

  return (
    <Dialog 
      open={isSettingsOpen} 
      onClose={() => setSettingsOpen(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: '#1e1e2d', // matching bg-bg-chat or darker
          color: '#e2e8f0',
          borderRadius: '12px',
          border: '1px solid #374151'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight="600">Settings</Typography>
        <IconButton onClick={() => setSettingsOpen(false)} sx={{ color: '#9ca3af' }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: '16px !important' }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ color: '#9ca3af' }}>Select AI Model</InputLabel>
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            label="Select AI Model"
            sx={{
              color: '#e2e8f0',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#60a5fa' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
              '.MuiSvgIcon-root': { color: '#9ca3af' }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1f2937',
                  color: '#e2e8f0',
                }
              }
            }}
          >
            <MenuItem value="gemini">Google Gemini (gemini-2.5-flash)</MenuItem>
            {/* <MenuItem value="gemini">Google Gemini (gemini-1.5-flash)</MenuItem> */}
            <MenuItem value="openai">OpenAI (gpt-3.5-turbo)</MenuItem>
            <MenuItem value="groq">Groq (llama-3.1-8b-instant)</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#9ca3af', mb: 1.5, pb: 0.5, borderBottom: '1px solid #374151' }}>
            API Keys
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Gemini API Key"
              type="password"
              value={localKeys.gemini}
              onChange={(e) => handleKeyChange('gemini', e.target.value)}
              placeholder="AIzaSy..."
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
              sx={{
                input: { color: '#e2e8f0' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#60a5fa' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
              }}
            />
            <TextField
              label="OpenAI API Key"
              type="password"
              value={localKeys.openai}
              onChange={(e) => handleKeyChange('openai', e.target.value)}
              placeholder="sk-..."
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
              sx={{
                input: { color: '#e2e8f0' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#60a5fa' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
              }}
            />
            <TextField
              label="Groq API Key"
              type="password"
              value={localKeys.groq}
              onChange={(e) => handleKeyChange('groq', e.target.value)}
              placeholder="gsk_..."
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
              sx={{
                input: { color: '#e2e8f0' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#60a5fa' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          fullWidth
          sx={{ 
            backgroundColor: '#2563eb', 
            color: 'white',
            py: 1.2,
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '500',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#1d4ed8'
            }
          }}
        >
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;

