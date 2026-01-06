
import React from 'react';
import { AppSettings } from '../../types';
import { Toggle } from '../ui/Toggle';

interface MiscTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const MiscTab: React.FC<MiscTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Movement & Misc</h2>
        <p className="text-zinc-500 text-sm mt-1">Physics modification and global process attributes.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <MiscControl 
          title="Fly Hack" 
          description="Bypass collision engine for vertical movement." 
          enabled={settings.flyHack} 
          onToggle={() => updateSettings({ flyHack: !settings.flyHack })} 
        />
        <MiscControl 
          title="No Recoil" 
          description="Lock view angles during weapon fire cycles." 
          enabled={settings.noRecoil} 
          onToggle={() => updateSettings({ noRecoil: !settings.noRecoil })} 
        />
        <MiscControl 
          title="Speed Hack" 
          description="Modify timescale for local character movement." 
          enabled={settings.speedHack} 
          onToggle={() => updateSettings({ speedHack: !settings.speedHack })} 
        />
      </div>

      <div className="p-6 border border-[#1a1a1a] bg-[#0c0c0c] rounded-lg flex flex-col gap-4">
        <h3 className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-2">
           Memory Pointers (Auto-Generated)
        </h3>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-600">
          <div className="flex justify-between border-b border-[#1a1a1a] py-1"><span>LocalPlayer:</span> <span className="text-red-900">0x7FFD21A</span></div>
          <div className="flex justify-between border-b border-[#1a1a1a] py-1"><span>EntityList:</span> <span className="text-red-900">0x7FFD2B0</span></div>
          <div className="flex justify-between border-b border-[#1a1a1a] py-1"><span>ViewMatrix:</span> <span className="text-red-900">0x8AA34F1</span></div>
          <div className="flex justify-between border-b border-[#1a1a1a] py-1"><span>ClientState:</span> <span className="text-red-900">0x8AA35E0</span></div>
        </div>
      </div>
    </div>
  );
};

const MiscControl: React.FC<{title: string; description: string; enabled: boolean; onToggle: () => void}> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-5 bg-[#0f0f0f] border border-[#1a1a1a] rounded hover:border-[#333] group transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-1 h-8 rounded-full transition-colors ${enabled ? 'accent-bg' : 'bg-[#1a1a1a]'}`} />
      <div>
        <h4 className="font-bold text-sm group-hover:accent-text transition-colors">{title}</h4>
        <p className="text-zinc-600 text-[10px]">{description}</p>
      </div>
    </div>
    <Toggle enabled={enabled} onToggle={onToggle} />
  </div>
);

export default MiscTab;
