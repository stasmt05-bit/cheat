import React, { useState } from 'react';
import { Terminal, Shield, Activity } from 'lucide-react';
import { ModuleType, AppSettings } from './types';
import { MODULES, TARGET_PROCESS } from './constants';
import Sidebar from './components/Sidebar';
import GeneralTab from './components/tabs/GeneralTab';
import CombatTab from './components/tabs/CombatTab';
import EspTab from './components/tabs/EspTab';
import SkinManagerTab from './components/tabs/SkinManagerTab';
import MiscTab from './components/tabs/MiscTab';
import ProcessScannerTab from './components/tabs/ProcessScannerTab';
import SettingsTab from './components/tabs/SettingsTab';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.GENERAL);
  const [logs, setLogs] = useState<string[]>(["[REDLINE] Architect Initialized.", "[REDLINE] Bridge Connected."]);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SCANNING' | 'LOCKED'>('IDLE');
  const [settings, setSettings] = useState<AppSettings>({
    accentColor: '#ef4444', coreEngine: true, performanceBoost: false, debugView: true,
    fov: 90, brightness: 100, uiScale: 1.0, aimbot: false, aimFov: 15, aimSmoothness: 5,
    aimBone: 'Head', silentAim: false, triggerBot: false, boxEsp: true, snaplines: false,
    healthBars: true, skeleton: false, chams: false, flyHack: false, noRecoil: false, speedHack: false
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    const key = Object.keys(newSettings)[0];
    const value = (newSettings as any)[key];
    
    setLogs(prev => [`[SYSTEM] ${key.toUpperCase()} -> ${value}`, ...prev.slice(0, 20)]);

    // Безопасный вызов Python API
    const pyApi = (window as any).pywebview?.api;
    if (pyApi) {
        pyApi.apply_setting(key, value);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0a] text-[#e5e5e5] select-none overflow-hidden border border-[#1a1a1a] shadow-2xl" 
         style={{ '--accent-color': settings.accentColor } as React.CSSProperties}>
      <Sidebar active={activeModule} setActive={setActiveModule} accentColor={settings.accentColor} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[radial-gradient(circle_at_50%_50%,#111_0%,#0a0a0a_100%)]">
        <header className="h-16 border-b border-[#1a1a1a] flex items-center justify-between px-8 bg-[#0c0c0c]/80 backdrop-blur-md z-10">
           <div className="flex items-center gap-3">
              <div className="w-2 h-8 accent-bg rounded-full animate-pulse"></div>
              <h1 className="text-xl font-black uppercase tracking-[0.3em] italic">Redline <span className="text-zinc-600">Architect</span></h1>
           </div>
           <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              <div className="flex items-center gap-2"><Activity size={12} className="accent-text" /> Latency: 1.2ms</div>
              <div className="flex items-center gap-2"><Shield size={12} className="accent-text" /> HWID: VERIFIED</div>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            {activeModule === ModuleType.GENERAL && <GeneralTab settings={settings} updateSettings={updateSettings} />}
            {activeModule === ModuleType.COMBAT && <CombatTab settings={settings} updateSettings={updateSettings} />}
            {activeModule === ModuleType.ESP && <EspTab settings={settings} updateSettings={updateSettings} />}
            {activeModule === ModuleType.SKINS && <SkinManagerTab />}
            {activeModule === ModuleType.SCANNER && <ProcessScannerTab status={scanStatus} setStatus={setScanStatus} />}
            {activeModule === ModuleType.SETTINGS && <SettingsTab settings={settings} updateSettings={updateSettings} />}
            {activeModule === ModuleType.MISC && <MiscTab settings={settings} updateSettings={updateSettings} />}
          </div>

          <aside className="w-64 border-l border-[#1a1a1a] bg-[#0c0c0c] flex flex-col p-4 font-mono text-[10px]">
             <div className="text-zinc-600 mb-2 font-bold uppercase tracking-widest flex items-center gap-2">
               <Terminal size={12} /> System Log
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
               {logs.map((log, i) => (
                 <div key={i} className={log.includes("Deactivated") || log.includes("Disabled") ? "text-red-900" : "text-zinc-500"}>
                   {log}
                 </div>
               ))}
             </div>
          </aside>
        </div>

        <footer className="h-8 border-t border-[#1a1a1a] bg-[#0c0c0c] flex items-center justify-between px-4 text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
          <div className="flex gap-4">
            <span>Thread ID: <span className="text-zinc-400">0x00FF42A</span></span>
            <span>Target: <span className="accent-text">{scanStatus === 'LOCKED' ? TARGET_PROCESS : 'NONE'}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${scanStatus === 'LOCKED' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-zinc-800'}`}></div>
            <span>{scanStatus}</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;