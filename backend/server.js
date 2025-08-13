const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3031;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Master prompt for the chatbot
const MASTER_PROMPT = process.env.MASTER_PROMPT || `You are a helpful AI assistant for a Solar System ROI Calculator website. You help users understand solar energy, calculate returns on investment, explain technical concepts, and provide guidance on solar panel installations. Be knowledgeable, friendly, and provide accurate information about solar energy systems, costs, benefits, and environmental impact.`;

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Log user message to terminal
    console.log('\n🤖 CHATBOT MESSAGE RECEIVED:');
    console.log('📝 User Message:', message);
    console.log('⏰ Timestamp:', new Date().toLocaleString());
    console.log('💬 Conversation History Length:', conversationHistory.length);
    console.log('─'.repeat(50));

    // Prepare conversation messages
    const messages = [
      { role: 'system', content: MASTER_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Log bot response to terminal
    console.log('🤖 Bot Response:', aiResponse);
    console.log('─'.repeat(50));

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🤖 Chatbot endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 