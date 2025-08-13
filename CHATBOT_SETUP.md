# 🤖 Solar System Calculator Chatbot Setup Guide

This guide will help you set up the AI-powered chatbot for your Solar System ROI Calculator website.

## 🚀 Quick Start

### 1. Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `env.example` to `.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_actual_openai_api_key_here
     ```

4. **Start the backend server:**
   ```bash
   # Development mode (auto-restart on changes)
   npm run dev
   
   # Production mode
   npm start
   
   # Or use the Windows batch file
   start.bat
   ```

### 2. Frontend Integration

The chatbot is already integrated into your `tool/solar-calculator.html` file. It includes:
- ✅ Floating chat button (bottom-right corner)
- ✅ Chatbot interface with modern design
- ✅ OpenAI integration
- ✅ Conversation history
- ✅ Mobile-responsive design

## 🔧 Configuration

### Backend Configuration

- **Port:** Default 3031 (configurable via PORT env var)
- **OpenAI Model:** GPT-3.5-turbo
- **Max Tokens:** 500
- **Temperature:** 0.7

### Master Prompt

The chatbot is configured with a specialized prompt for solar energy expertise:
```
You are a helpful AI assistant for a Solar System ROI Calculator website. 
You help users understand solar energy, calculate returns on investment, 
explain technical concepts, and provide guidance on solar panel installations. 
Be knowledgeable, friendly, and provide accurate information about solar 
energy systems, costs, benefits, and environmental impact.
```

## 🌐 API Endpoints

### POST `/api/chat`
Send messages to the AI chatbot.

**Request:**
```json
{
  "message": "How much can I save with solar panels?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "response": "AI response here...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/health`
Health check endpoint.

## 🎨 Features

### Chatbot Interface
- **Floating Button:** Animated chat icon in bottom-right corner
- **Modern Design:** Clean, professional interface matching your website theme
- **Responsive:** Works perfectly on desktop and mobile devices
- **Smooth Animations:** Elegant transitions and hover effects

### AI Capabilities
- **Solar Energy Expertise:** Specialized knowledge in solar systems
- **ROI Calculations:** Help with investment calculations
- **Technical Support:** Explain complex concepts in simple terms
- **Installation Guidance:** Provide installation advice
- **Cost Analysis:** Help understand pricing and savings

### User Experience
- **Conversation History:** Maintains context throughout the chat
- **Typing Indicators:** Shows when AI is processing
- **Error Handling:** Graceful fallbacks for network issues
- **Keyboard Support:** Enter key to send messages

## 📱 Mobile Optimization

The chatbot is fully optimized for mobile devices:
- Responsive design that adapts to screen size
- Touch-friendly interface elements
- Optimized positioning for mobile screens
- Smooth animations that work on mobile devices

## 🔒 Security Considerations

- **API Key Protection:** Never commit your `.env` file
- **Input Validation:** Backend validates all incoming data
- **Rate Limiting:** Consider implementing for production use
- **CORS Configuration:** Properly configured for frontend integration

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Check if Node.js is installed: `node --version`
   - Verify dependencies: `npm install`
   - Check port availability (default: 3000)

2. **Chatbot not responding:**
   - Verify backend is running: `http://localhost:3031/api/health`
   - Check OpenAI API key in `.env` file
   - Check browser console for errors

3. **CORS errors:**
   - Backend CORS is configured for `http://localhost:3031`
   - Update frontend URL if using different port

### Debug Mode

Enable detailed logging by adding to your `.env`:
```
DEBUG=true
NODE_ENV=development
```

## 📈 Future Enhancements

Potential improvements you could add:
- **File Uploads:** Allow users to upload documents for analysis
- **Voice Input:** Speech-to-text capabilities
- **Multi-language Support:** Internationalization
- **Analytics Dashboard:** Track chatbot usage and performance
- **Custom Training:** Fine-tune the AI model for your specific needs

## 🎯 Testing

Test the chatbot with these sample questions:
- "What's the ROI on a 5kW solar system?"
- "How do solar panels work?"
- "What are the maintenance costs?"
- "How long do solar panels last?"
- "What's the environmental impact?"

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify backend server is running
3. Check OpenAI API key configuration
4. Review the backend logs for detailed error messages

---

**Happy coding! 🚀** Your solar system calculator now has a powerful AI assistant to help users understand solar energy and make informed decisions. 