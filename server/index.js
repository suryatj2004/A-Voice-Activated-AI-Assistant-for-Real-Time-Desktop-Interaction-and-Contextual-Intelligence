import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log('Gemini API Key:', process.env.GEMINI_API_KEY ? 'Configured' : 'Not Configured');

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Store connected clients
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');
  
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Broadcast to all connected clients
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(JSON.stringify(data));
    }
  });
}

// Simulated system commands
const systemCommands = {
  'open chrome': () => ({ success: true, message: 'Chrome browser opened' }),
  'open notepad': () => ({ success: true, message: 'Notepad opened' }),
  'open vscode': () => ({ success: true, message: 'VS Code opened' }),
  'open calculator': () => ({ success: true, message: 'Calculator opened' }),
  'system info': () => ({
    success: true,
    message: 'System Information',
    data: {
      os: 'WebContainer Linux',
      memory: '8GB Available',
      cpu: 'Virtual CPU - 4 cores',
      uptime: '2h 34m',
      battery: '85% (Charging)'
    }
  }),
  'current time': () => ({
    success: true,
    message: `Current time: ${new Date().toLocaleString()}`
  }),
  'play music': () => ({ success: true, message: 'Playing your favorite playlist' }),
  'stop music': () => ({ success: true, message: 'Music stopped' }),
  'volume up': () => ({ success: true, message: 'Volume increased' }),
  'volume down': () => ({ success: true, message: 'Volume decreased' }),
  'lock screen': () => ({ success: true, message: 'Screen locked' }),
  'shutdown': () => ({ success: true, message: 'Initiating shutdown sequence...' }),
  'restart': () => ({ success: true, message: 'Initiating restart sequence...' })
};

// Gemini AI integration
async function queryGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Jarvis, an AI assistant. Respond in a helpful, intelligent manner like Tony Stark's AI assistant. Keep responses concise but informative. Query: ${prompt}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    console.log('Gemini Raw Response:', JSON.stringify(data, null, 2));

    if (data.error) {
      console.error('Gemini API Error:', data.error.message);
      throw new Error(`Gemini Error: ${data.error.message}`);
    }

    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response from Gemini');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}


// Basic route for health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Jarvis AI Assistant Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Command processing endpoint
app.post('/api/command', async (req, res) => {
  const { command, type } = req.body;
  
  try {
    let response;
    
    if (type === 'system') {
      // Handle system commands
      const handler = systemCommands[command.toLowerCase()];
      if (handler) {
        response = handler();
      } else {
        response = { success: false, message: `Unknown system command: ${command}` };
      }
    } else if (type === 'ai') {
      // Handle AI queries with Gemini
      const aiResponse = await queryGemini(command);
      response = { success: true, message: aiResponse, isAI: true };
    } else {
      response = { success: false, message: 'Invalid command type' };
    }
    
    // Broadcast to connected WebSocket clients
    broadcast({
      type: 'command_result',
      command,
      response,
      timestamp: new Date().toISOString()
    });
    
    res.json(response);
  } catch (error) {
    const errorResponse = { success: false, message: error.message };
    res.status(500).json(errorResponse);
  }
});

// Get available system commands
app.get('/api/commands', (req, res) => {
  res.json(Object.keys(systemCommands));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', geminiConfigured: !!GEMINI_API_KEY });
});

server.listen(PORT, () => {
  console.log(`🤖 Jarvis Assistant Server running on port ${PORT}`);
  console.log(`🔑 Gemini API configured: ${GEMINI_API_KEY}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
});