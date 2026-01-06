
import React from 'react';
import { AppSettings } from '../../types';
import { Toggle } from '../ui/Toggle';

interface EspTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const EspTab: React.FC<EspTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">ESP Visuals</h2>
        <p className="text-zinc-500 text-sm mt-1">DirectX 11 Overlay for environment awareness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-500 border-b border-[#1a1a1a] pb-2">Rendering</h3>
          <EspCheckbox label="Box ESP" enabled={settings.boxEsp} onToggle={() => updateSettings({ boxEsp: !settings.boxEsp })} />
          <EspCheckbox label="Snaplines" enabled={settings.snaplines} onToggle={() => updateSettings({ snaplines: !settings.snaplines })} />
          <EspCheckbox label="Health Bars" enabled={settings.healthBars} onToggle={() => updateSettings({ healthBars: !settings.healthBars })} />
          <EspCheckbox label="Skeleton View" enabled={settings.skeleton} onToggle={() => updateSettings({ skeleton: !settings.skeleton })} />
          <EspCheckbox label="Wallhack (Chams)" enabled={settings.chams} onToggle={() => updateSettings({ chams: !settings.chams })} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-zinc-900 border border-[#1a1a1a] rounded flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-red-900/5 flex items-center justify-center">
                <div className="relative w-32 h-48 border border-red-500/50">
                   {settings.boxEsp && <div className="absolute inset-0 border-2 border-red-500 animate-pulse" />}
                   {settings.healthBars && <div className="absolute -left-2 top-0 bottom-0 w-1 bg-green-500" />}
                   {settings.skeleton && <div className="absolute inset-0 flex items-center justify-center text-red-500 opacity-30">骨</div>}
                   {settings.chams && <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm" />}
                </div>
                {settings.snaplines && <div className="absolute bottom-0 left-1/2 w-px h-full bg-red-500/40 origin-bottom" style={{ transform: 'rotate(20deg)' }} />}
             </div>
             <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-600">OVERLAY_PREVIEW</div>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 rounded">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Distance Filter</h4>
            <div className="h-1.5 w-full bg-[#1a1a1a] rounded overflow-hidden">
              <div className="h-full accent-bg w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EspCheckbox: React.FC<{label: string; enabled: boolean; onToggle: () => void}> = ({ label, enabled, onToggle }) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between group py-1"
  >
    <span className={`text-xs font-semibold transition-colors ${enabled ? 'text-zinc-100' : 'text-zinc-600'}`}>{label}</span>
    <div className={`w-4 h-4 border ${enabled ? 'accent-border accent-bg' : 'border-[#333]'} rounded-sm transition-all flex items-center justify-center`}>
      {enabled && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
    </div>
  </button>
);

export default EspTab;
