
import React from 'react';
import { AppSettings } from '../../types';

interface VisualsTabProps {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
}

const VisualsTab: React.FC<VisualsTabProps> = ({ settings, updateSettings }) => {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Optical Tuning</h2>
        <p className="text-zinc-500 text-sm mt-1">Refine FOV, luminance, and UI spatial scaling.</p>
      </div>

      <div className="space-y-6">
        <SliderControl 
          label="Field of View"
          value={settings.fov}
          min={60}
          max={120}
          unit="°"
          onChange={(val) => updateSettings({ fov: val })}
        />
        <SliderControl 
          label="Luminance Brightness"
          value={settings.brightness}
          min={0}
          max={200}
          unit="%"
          onChange={(val) => updateSettings({ brightness: val })}
        />
        <SliderControl 
          label="UI Spatial Scale"
          value={settings.uiScale}
          min={0.5}
          max={2.0}
          step={0.1}
          onChange={(val) => updateSettings({ uiScale: val })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-video bg-zinc-900 border border-[#1a1a1a] rounded relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase">Preview Window</div>
          <div className="w-12 h-12 border-2 accent-border opacity-50 rotate-45"></div>
        </div>
        <div className="flex flex-col justify-center gap-2">
            <h4 className="text-xs font-mono uppercase text-zinc-500">Render Pipeline</h4>
            <div className="h-1 accent-bg w-full"></div>
            <div className="h-1 bg-zinc-800 w-3/4"></div>
            <div className="h-1 bg-zinc-800 w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const SliderControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}> = ({ label, value, min, max, step = 1, unit = "", onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <span className="text-sm font-bold uppercase tracking-wide">{label}</span>
      <span className="accent-text font-mono text-xs">{value}{unit}</span>
    </div>
    <input 
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-range accent-bg"
      style={{
        accentColor: 'var(--accent-color)',
      }}
    />
  </div>
);

export default VisualsTab;
