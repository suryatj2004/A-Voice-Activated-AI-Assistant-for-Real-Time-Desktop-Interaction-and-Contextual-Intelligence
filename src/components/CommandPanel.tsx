import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Terminal, Bot } from 'lucide-react';

interface CommandPanelProps {
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  onToggleMode: () => void;
  isAIMode: boolean;
  speechSupported: boolean;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  onToggleMode,
  isAIMode,
  speechSupported
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Voice Controls</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={isListening ? onStopListening : onStartListening}
          disabled={!speechSupported}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          } ${!speechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          <span>{isListening ? 'Stop' : 'Listen'}</span>
        </button>

        <button
          onClick={onStopSpeaking}
          disabled={!isSpeaking}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            isSpeaking
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span>{isSpeaking ? 'Stop TTS' : 'TTS Idle'}</span>
        </button>

        <button
          onClick={onToggleMode}
          className={`col-span-2 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            isAIMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isAIMode ? <Bot size={20} /> : <Terminal size={20} />}
          <span>{isAIMode ? 'AI Mode' : 'System Mode'}</span>
        </button>
      </div>

      {!speechSupported && (
        <p className="text-yellow-400 text-sm mt-4">
          Speech recognition not supported in this browser
        </p>
      )}
    </div>
  );
};