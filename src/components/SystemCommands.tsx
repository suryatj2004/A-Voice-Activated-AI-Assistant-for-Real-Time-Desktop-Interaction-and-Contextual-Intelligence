import React from 'react';
import { Monitor, Volume2, Music, Lock, Power } from 'lucide-react';

interface SystemCommandsProps {
  onExecuteCommand: (command: string) => void;
}

const commandCategories = [
  {
    title: 'Applications',
    icon: <Monitor size={20} />,
    commands: [
      { label: 'Chrome', command: 'open chrome' },
      { label: 'Notepad', command: 'open notepad' },
      { label: 'VS Code', command: 'open vscode' },
      { label: 'Calculator', command: 'open calculator' }
    ]
  },
  {
    title: 'Media',
    icon: <Music size={20} />,
    commands: [
      { label: 'Play Music', command: 'play music' },
      { label: 'Stop Music', command: 'stop music' },
      { label: 'Volume Up', command: 'volume up' },
      { label: 'Volume Down', command: 'volume down' }
    ]
  },
  {
    title: 'System',
    icon: <Power size={20} />,
    commands: [
      { label: 'System Info', command: 'system info' },
      { label: 'Current Time', command: 'current time' },
      { label: 'Lock Screen', command: 'lock screen' },
      { label: 'Shutdown', command: 'shutdown' }
    ]
  }
];

export const SystemCommands: React.FC<SystemCommandsProps> = ({ onExecuteCommand }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Commands</h3>
      
      <div className="space-y-6">
        {commandCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-gray-400">{category.icon}</span>
              <h4 className="text-lg font-medium text-gray-300">{category.title}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {category.commands.map((cmd, cmdIndex) => (
                <button
                  key={cmdIndex}
                  onClick={() => onExecuteCommand(cmd.command)}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-200 text-left"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};