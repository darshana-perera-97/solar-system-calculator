# Solar System Calculator Backend

This is the Node.js backend for the Solar System ROI Calculator website, featuring an AI-powered chatbot using OpenAI.

## Features

- 🤖 AI-powered chatbot using OpenAI GPT-3.5-turbo
- 💬 Conversation history support
- 🔒 Environment variable configuration
- 🌐 CORS enabled for frontend integration
- 📊 Health check endpoint

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `env.example` to `.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### POST `/api/chat`
Send a message to the AI chatbot.

**Request Body:**
```json
{
  "message": "How much can I save with solar panels?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant", 
      "content": "Previous response"
    }
  ]
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

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

- **Port:** Default 3000 (configurable via PORT env var)
- **OpenAI Model:** GPT-3.5-turbo
- **Max Tokens:** 500
- **Temperature:** 0.7

## Master Prompt

The chatbot is configured with a master prompt that makes it an expert in:
- Solar energy systems
- ROI calculations
- Technical concepts
- Installation guidance
- Cost-benefit analysis
- Environmental impact

## Frontend Integration

The backend is designed to work with the frontend chatbot component. Make sure to:
1. Set the correct backend URL in your frontend code
2. Handle CORS properly
3. Implement proper error handling

## Security Notes

- Never commit your `.env` file
- Keep your OpenAI API key secure
- Consider rate limiting for production use
- Validate input data 