
import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-all relative flex items-center p-1 border border-[#333]
        ${enabled ? 'accent-bg shadow-[0_0_10px_rgba(255,0,0,0.2)]' : 'bg-[#1a1a1a]'}`}
    >
      <div 
        className={`w-4 h-4 bg-white rounded-full transition-all transform 
          ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  );
};
