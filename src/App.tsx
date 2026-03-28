import { useState, useEffect, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { VoiceVisualizer } from './components/VoiceVisualizer';
import { CommandPanel } from './components/CommandPanel';
import { SystemCommands } from './components/SystemCommands';
import { ChatInterface } from './components/ChatInterface';
import { StatusPanel } from './components/StatusPanel';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isAI?: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIMode, setIsAIMode] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [geminiConfigured, setGeminiConfigured] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { transcript, isListening, startListening, stopListening, supported: speechSupported } = useSpeechRecognition();
  const { speak, isSpeaking, stop: stopSpeaking, supported: ttsSupported } = useTextToSpeech();

  // Initialize WebSocket connection
  useEffect(() => {
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    
    const connectWebSocket = () => {
      const websocket = new WebSocket('ws://localhost:3001');
      
      websocket.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
      };
      
      websocket.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
        // Attempt to reconnect after 3 seconds
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };
      
      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
      
      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'command_result') {
            addMessage('assistant', data.response.message, data.response.isAI);
            
            // Speak the response if TTS is supported
            if (ttsSupported && data.response.success) {
              speak(data.response.message);
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      setWs(websocket);
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      ws?.close();
    };
  }, [ttsSupported, speak]);

  // Check server health and Gemini configuration
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        const data = await response.json();
        setGeminiConfigured(data.geminiConfigured);
      } catch (error) {
        console.error('Health check failed:', error);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle speech recognition result
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
      executeCommand(transcript);
    }
  }, [transcript]);

  const addMessage = useCallback((type: 'user' | 'assistant' | 'system', content: string, isAI?: boolean) => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date().toISOString(),
      isAI
    };
    setMessages(prev => [...prev, message]);
  }, []);

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    addMessage('user', command);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          type: isAIMode ? 'ai' : 'system'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        addMessage('assistant', result.message, result.isAI);
        
        // Speak the response if TTS is supported
        if (ttsSupported) {
          speak(result.message);
        }
      } else {
        addMessage('system', `Error: ${result.message}`);
      }
    } catch (error) {
      addMessage('system', `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const handleSubmit = () => {
    executeCommand(inputValue);
  };

  const handleQuickCommand = (command: string) => {
    setInputValue(command);
    executeCommand(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Jarvis AI Assistant</h1>
              <p className="text-gray-400 text-sm">Your Personal AI-Powered System Assistant</p>
            </div>
          </div>
          
          <VoiceVisualizer isListening={isListening} isSpeaking={isSpeaking} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <CommandPanel
              isListening={isListening}
              isSpeaking={isSpeaking}
              onStartListening={startListening}
              onStopListening={stopListening}
              onStopSpeaking={stopSpeaking}
              onToggleMode={() => setIsAIMode(!isAIMode)}
              isAIMode={isAIMode}
              speechSupported={speechSupported}
            />
            
            <StatusPanel
              isConnected={isConnected}
              geminiConfigured={geminiConfigured}
            />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <ChatInterface
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder={isAIMode ? "Ask Jarvis anything..." : "Enter system command..."}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SystemCommands onExecuteCommand={handleQuickCommand} />
          </div>
        </div>

        {/* Mode Indicator */}
        <div className="fixed bottom-6 right-6">
          <div className={`px-4 py-2 rounded-full font-medium ${
            isAIMode ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            {isAIMode ? '🤖 AI Mode' : '⚡ System Mode'}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;