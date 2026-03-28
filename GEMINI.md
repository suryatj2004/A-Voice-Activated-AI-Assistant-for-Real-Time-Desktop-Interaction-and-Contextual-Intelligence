# Jarvis AI Assistant - Context & Instructions

This file serves as the primary instructional context for Gemini when interacting with this codebase. It outlines the project structure, technology stack, development workflows, and architectural patterns.

## Project Overview

**Jarvis AI Assistant** is a full-stack personal AI assistant inspired by Tony Stark's JARVIS. It provides both voice and text-based interaction, integrating Google's Gemini AI for natural language processing and a Node.js backend for simulated system controls.

### Core Features
- 🎤 **Voice Interaction**: Leverages the Web Speech API for voice recognition and text-to-speech.
- 🤖 **Gemini AI**: Integrated via the Google Gemini API (using the `gemini-1.5-flash` model).
- ⚡ **System Mode**: A dedicated mode for executing simulated system-level commands (e.g., opening applications, system info).
- 📡 **Real-time Sync**: Uses WebSockets (`ws`) to broadcast command results and system status updates to the client.
- 🎨 **Jarvis Aesthetic**: A modern, dark-themed UI built with React and Tailwind CSS.

## Technical Stack

- **Frontend**: React 18 (TypeScript), Vite, Tailwind CSS, Lucide React.
- **Backend**: Node.js, Express, WebSocket (`ws`), `dotenv`.
- **AI**: Google Gemini API.
- **Tooling**: ESLint, PostCSS, Concurrently.

## Project Structure

```text
C:\Users\KAVI\Downloads\Jarvis-AI-Bot-main\Jarvis-AI-Bot-main
├── server/
│   └── index.js       # Express server, WebSocket handling, Gemini integration, System commands
├── src/
│   ├── components/     # UI components (ChatInterface, CommandPanel, StatusPanel, etc.)
│   ├── hooks/          # Custom hooks for browser APIs (useSpeechRecognition, useTextToSpeech)
│   ├── App.tsx         # Main application logic and layout
│   └── main.tsx        # React entry point
├── .env                # Environment variables (GEMINI_API_KEY, PORT)
├── package.json        # Dependencies and scripts
└── tailwind.config.js  # Styling configuration
```

## Building and Running

### Prerequisites
- Node.js installed.
- A valid Google Gemini API key in the `.env` file.

### Key Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start both the frontend (Vite) and backend (Express) concurrently.
- `npm run client`: Run only the React frontend.
- `npm run server`: Run only the Node.js backend.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Run ESLint to check for code quality issues.

## Development Conventions

### Backend (server/index.js)
- **API Endpoints**: `/api/command` for processing inputs, `/api/health` for status checks.
- **System Commands**: Defined in a central `systemCommands` object.
- **Gemini Integration**: Uses the official `@google/generative-ai` SDK with the `gemini-1.5-flash` model. Logic is encapsulated in the `queryGemini` function.

### Frontend (src/)
- **State Management**: Uses standard React hooks (`useState`, `useEffect`, `useCallback`).
- **Icons**: Use `lucide-react` for all UI icons.
- **Styling**: Utility-first CSS using Tailwind CSS.
- **Voice Handling**: Encapsulated in custom hooks (`src/hooks/`).
- **Real-time**: The `App` component maintains a WebSocket connection to the backend for receiving command results.

### Coding Standards
- **TypeScript**: Strictly typed components and hooks.
- **Clean Code**: Keep components modular and logic extracted into hooks where appropriate.
- **Environment**: Sensitive keys (API keys) must always be stored in `.env` and never hardcoded.

## Future Instructions for Gemini
- When adding new system commands, update both `server/index.js` and `src/components/SystemCommands.tsx`.
- Ensure all new UI components follow the "Jarvis" dark aesthetic using Tailwind classes.
- Always maintain type safety when modifying frontend hooks or state interfaces.
