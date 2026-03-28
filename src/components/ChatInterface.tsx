import React, { useEffect, useRef } from 'react';
import { User, Bot, Terminal } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isAI?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
  placeholder
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const getMessageIcon = (message: Message) => {
    if (message.type === 'user') return <User size={16} />;
    if (message.isAI) return <Bot size={16} />;
    return <Terminal size={16} />;
  };

  const getMessageColor = (message: Message) => {
    if (message.type === 'user') return 'text-green-400';
    if (message.isAI) return 'text-blue-400';
    return 'text-purple-400';
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 flex flex-col h-96">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-blue-400">Jarvis Terminal</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center">
            Welcome to Jarvis. How may I assist you today?
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 mt-1 ${getMessageColor(message)}`}>
              {getMessageIcon(message)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`font-semibold ${getMessageColor(message)}`}>
                  {message.type === 'user' ? 'You' : message.isAI ? 'Jarvis' : 'System'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-3">
            <div className="text-blue-400">
              <Bot size={16} />
            </div>
            <div className="text-blue-400">
              <span className="animate-pulse">Jarvis is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};