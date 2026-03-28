import React, { useEffect, useState } from 'react';

interface VoiceVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isListening, isSpeaking }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isListening || isSpeaking);
  }, [isListening, isSpeaking]);

  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`w-1 bg-blue-400 rounded-full transition-all duration-300 ${
            animate
              ? `h-8 animate-pulse`
              : 'h-2'
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};