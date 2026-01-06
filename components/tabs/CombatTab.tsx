
import React from 'react';
import { AppSettings } from '../../types';
import { Toggle } from '../ui/Toggle';

interface CombatTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const CombatTab: React.FC<CombatTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Combat System</h2>
        <p className="text-zinc-500 text-sm mt-1">High-precision aiming and predictive logic modules.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">Aimbot Protocol</h3>
              <p className="text-zinc-500 text-xs">Automated crosshair alignment and tracking.</p>
            </div>
            <Toggle enabled={settings.aimbot} onToggle={() => updateSettings({ aimbot: !settings.aimbot })} />
          </div>

          <div className="space-y-6 opacity-60 transition-opacity" style={{ opacity: settings.aimbot ? 1 : 0.4 }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500">Target Bone</label>
                <select 
                  value={settings.aimBone} 
                  onChange={(e) => updateSettings({ aimBone: e.target.value as any })}
                  className="w-full bg-[#151515] border border-[#333] text-zinc-300 px-3 py-2 text-xs rounded focus:outline-none focus:border-red-500"
                >
                  <option>Head</option>
                  <option>Chest</option>
                  <option>Pelvis</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500">Logic Method</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-[10px] font-bold bg-red-600 text-white rounded">Memory</button>
                  <button className="flex-1 py-2 text-[10px] font-bold bg-[#1a1a1a] text-zinc-500 rounded border border-[#333]">ViewAngle</button>
                </div>
              </div>
            </div>

            <SliderControl 
              label="Field of View"
              value={settings.aimFov}
              min={1}
              max={180}
              unit="°"
              onChange={(val) => updateSettings({ aimFov: val })}
            />
            <SliderControl 
              label="Smoothing"
              value={settings.aimSmoothness}
              min={1}
              max={20}
              onChange={(val) => updateSettings({ aimSmoothness: val })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <ControlRow title="Silent Aim" description="Redirect bullets without movement." enabled={settings.silentAim} onToggle={() => updateSettings({ silentAim: !settings.silentAim })} />
           <ControlRow title="Trigger Bot" description="Auto-fire on crosshair hover." enabled={settings.triggerBot} onToggle={() => updateSettings({ triggerBot: !settings.triggerBot })} />
        </div>
      </div>
    </div>
  );
};

const ControlRow: React.FC<{title: string; description: string; enabled: boolean; onToggle: () => void}> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] border border-[#1a1a1a] rounded hover:border-[#333] transition-all">
    <div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-zinc-600 text-[10px]">{description}</p>
    </div>
    <Toggle enabled={enabled} onToggle={onToggle} />
  </div>
);

const SliderControl: React.FC<{label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void}> = ({ label, value, min, max, unit = "", onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center px-1">
      <span className="text-[10px] font-mono uppercase text-zinc-500">{label}</span>
      <span className="accent-text font-mono text-xs">{value}{unit}</span>
    </div>
    <input 
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-red-600"
    />
  </div>
);

export default CombatTab;
