
import React from 'react';
import { AppSettings } from '../../types';
import { Toggle } from '../ui/Toggle';

interface GeneralTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">System Engine</h2>
        <p className="text-zinc-500 text-sm mt-1">Configure core process handling and optimization protocols.</p>
      </div>

      <div className="grid gap-4">
        <ControlGroup 
          title="Core Engine" 
          description="Main logic processor for Redline calculations."
          enabled={settings.coreEngine}
          onToggle={() => updateSettings({ coreEngine: !settings.coreEngine })}
        />
        <ControlGroup 
          title="Performance Boost" 
          description="Prioritize system resources for maximum execution speed."
          enabled={settings.performanceBoost}
          onToggle={() => updateSettings({ performanceBoost: !settings.performanceBoost })}
        />
        <ControlGroup 
          title="Debug View" 
          description="Display advanced console output and stack traces."
          enabled={settings.debugView}
          onToggle={() => updateSettings({ debugView: !settings.debugView })}
        />
      </div>

      <div className="p-4 border border-[#1a1a1a] bg-[#0c0c0c] rounded-lg">
        <h3 className="text-xs font-mono uppercase text-zinc-600 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full accent-bg"></div>
          Kernel Status
        </h3>
        <div className="font-mono text-[10px] text-zinc-500 space-y-1">
          <p>MOD_LOAD: dx11_backend.dll [SUCCESS]</p>
          <p>SHDR_CMP: main_ps_5_0.hlsl [CACHED]</p>
          <p>MEM_POOL: 256MB Reserved for Architect</p>
          <p className="accent-text">WAITING_FOR_PROCESS_ATTACH...</p>
        </div>
      </div>
    </div>
  );
};

const ControlGroup: React.FC<{ 
  title: string; 
  description: string; 
  enabled: boolean; 
  onToggle: () => void;
}> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded hover:border-[#333] transition-colors group">
    <div>
      <h4 className="font-bold text-lg group-hover:accent-text transition-colors">{title}</h4>
      <p className="text-zinc-500 text-sm max-w-sm">{description}</p>
    </div>
    <Toggle enabled={enabled} onToggle={onToggle} />
  </div>
);

export default GeneralTab;
