import React from 'react';
import { Wifi, Zap, Clock, Cpu } from 'lucide-react';

interface StatusPanelProps {
  isConnected: boolean;
  geminiConfigured: boolean;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ isConnected, geminiConfigured }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">System Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi size={16} className="text-green-400" />
            <span className="text-gray-300">Connection</span>
          </div>
          <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-blue-400" />
            <span className="text-gray-300">Gemini AI</span>
          </div>
          <span className={`text-sm font-medium ${geminiConfigured ? 'text-green-400' : 'text-yellow-400'}`}>
            {geminiConfigured ? 'Ready' : 'Config Needed'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-purple-400" />
            <span className="text-gray-300">Time</span>
          </div>
          <span className="text-sm font-medium text-gray-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu size={16} className="text-orange-400" />
            <span className="text-gray-300">Mode</span>
          </div>
          <span className="text-sm font-medium text-orange-400">
            Active
          </span>
        </div>
      </div>

      {!geminiConfigured && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600 rounded-lg">
          <p className="text-yellow-400 text-sm">
            Add your Gemini API key to .env file to enable AI features
          </p>
        </div>
      )}
    </div>
  );
};