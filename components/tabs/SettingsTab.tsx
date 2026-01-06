
import React from 'react';
import { AppSettings } from '../../types';

interface SettingsTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const COLORS = [
  { name: 'Redline', hex: '#ef4444' },
  { name: 'Neon Blue', hex: '#3b82f6' },
  { name: 'Toxic Green', hex: '#22c55e' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Violet', hex: '#a855f7' },
  { name: 'Monochrome', hex: '#71717a' },
];

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Interface Config</h2>
        <p className="text-zinc-500 text-sm mt-1">Modify global aesthetic and behavioral parameters.</p>
      </div>

      <div className="p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-4">Accent Color Profile</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => updateSettings({ accentColor: color.hex })}
                className={`flex flex-col items-center gap-2 p-3 rounded border transition-all ${settings.accentColor === color.hex ? 'border-zinc-300 bg-[#1a1a1a]' : 'border-transparent hover:bg-[#111]'}`}
              >
                <div 
                  className="w-8 h-8 rounded-full shadow-lg" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] font-bold uppercase text-zinc-500">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#1a1a1a]" />

        <div className="space-y-4">
          <h4 className="font-bold text-lg">Manual Calibration</h4>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={settings.accentColor}
              onChange={(e) => updateSettings({ accentColor: e.target.value })}
              className="w-12 h-12 bg-transparent border-none cursor-pointer"
            />
            <div className="flex-1">
              <input 
                type="text" 
                value={settings.accentColor.toUpperCase()}
                onChange={(e) => updateSettings({ accentColor: e.target.value })}
                className="w-full bg-[#151515] border border-[#333] rounded px-4 py-2 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-4 bg-[#1a1a1a] border border-[#333] rounded font-black uppercase tracking-[0.2em] hover:bg-[#222] transition-colors text-xs">
          Reset to Factory
        </button>
        <button className="flex-1 py-4 accent-bg text-white rounded font-black uppercase tracking-[0.2em] accent-glow transition-all text-xs">
          Export Config
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
