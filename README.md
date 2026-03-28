<<<<<<< HEAD
# Jarvis AI Assistant

A full-stack personal AI assistant web application that provides voice and text-based interaction with system controls and Google Gemini AI integration.

## Features

- 🎤 **Voice Recognition**: Use Web Speech API for voice commands
- 🗣️ **Text-to-Speech**: AI responses with natural speech output
- 🤖 **Gemini AI Integration**: Intelligent responses powered by Google's Gemini API
- 💻 **System Commands**: Simulated system-level controls (file operations, system info)
- 📡 **Real-time Communication**: WebSocket connection for instant responses
- 🎨 **Modern UI**: Dark theme with Jarvis-inspired design
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Environment Configuration

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your Google Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     PORT=3001
     ```

### 2. Installation

Install all dependencies:
```bash
npm install
```

### 3. Running the Application

Start both the frontend and backend servers:
```bash
npm run dev
```

This will start:
- Frontend (React): http://localhost:5173
- Backend (Node.js): http://localhost:3001

## Usage

### Voice Commands
1. Click the "Listen" button to activate voice recognition
2. Speak your command clearly
3. The assistant will process and respond with both text and speech

### Text Commands
1. Type commands in the terminal interface
2. Press Enter or click "Send"
3. View responses in the chat interface

### Modes

**AI Mode** (🤖): 
- Ask questions, get intelligent responses
- Natural language processing via Gemini AI
- Examples: "What's the weather like?", "Explain quantum physics"

**System Mode** (⚡):
- Execute system commands
- Quick access to applications and system info
- Examples: "open chrome", "system info", "current time"

### Quick Commands
Use the sidebar buttons for instant access to common system commands:
- Open applications (Chrome, Notepad, VS Code, Calculator)
- Media controls (play/stop music, volume control)
- System operations (system info, time, lock screen)

## Security Features

- ✅ API keys stored in environment variables
- ✅ Local-only server access
- ✅ No sensitive data in client-side code
- ✅ CORS protection for API endpoints

## Browser Compatibility

- ✅ Chrome/Chromium browsers (recommended)
- ✅ Firefox (limited speech recognition)
- ✅ Safari (limited speech features)
- ✅ Edge (full support)

**Note**: Some browsers have limited Web Speech API support. Chrome provides the best experience.

## Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**
   - Check your `.env` file has the correct API key
   - Restart the server after adding the API key

2. **Speech recognition not working**
   - Ensure you're using HTTPS or localhost
   - Check browser permissions for microphone access
   - Try Chrome browser for best compatibility

3. **Connection issues**
   - Verify both frontend and backend are running
   - Check that port 3001 is not in use by another application

### Browser Permissions

Make sure to allow microphone access when prompted. The application needs:
- 🎤 Microphone access for voice recognition
- 🔊 Audio permission for text-to-speech

## Development

### Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   └── App.tsx        # Main application
├── server/
│   └── index.js       # Express server with WebSocket
├── .env.example       # Environment template
└── README.md          # This file
```

### Adding New Commands

1. **System Commands**: Add to `systemCommands` object in `server/index.js`
2. **UI Commands**: Update `SystemCommands.tsx` component
3. **AI Integration**: Modify the Gemini prompt in the server

## License

MIT License - feel free to use and modify for your own projects!
=======
# A-Voice-Activated-AI-Assistant-for-Real-Time-Desktop-Interaction-and-Contextual-Intelligence
>>>>>>> ee7ed438b1c34aaaf1e11be3e914d8864e4c0db1
