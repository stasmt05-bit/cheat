
import React, { useState } from 'react';
/* Added missing Terminal import from lucide-react */
import { Search, Loader2, ShieldCheck, AlertTriangle, Monitor, Terminal } from 'lucide-react';

interface ProcessScannerTabProps {
  status: 'IDLE' | 'SCANNING' | 'LOCKED';
  setStatus: (s: 'IDLE' | 'SCANNING' | 'LOCKED') => void;
}

const ProcessScannerTab: React.FC<ProcessScannerTabProps> = ({ status, setStatus }) => {
  const [log, setLog] = useState<string[]>(["[ARCHITECT] Waiting for input...", "SYSTEM_IDLE"]);

  const startScan = () => {
    setStatus('SCANNING');
    setLog(prev => [...prev, "[SCAN] Querying active process list...", "[SCAN] Filtering for 'Standoff2.exe'"]);
    
    setTimeout(() => {
      setLog(prev => [...prev, "[FOUND] STANDOFF2.EXE (PID: 4096)", "[HOOK] Injecting REDLINE.DLL..."]);
    }, 1500);

    setTimeout(() => {
      setStatus('LOCKED');
      setLog(prev => [...prev, "[OK] MEMORY_MAP_SUCCESS (0x7FF000000)", "[OK] DIRECTX_HOOK_SUCCESS"]);
    }, 3500);
  };

  const reset = () => {
    setStatus('IDLE');
    setLog(["[ARCHITECT] System ready.", "WAITING_FOR_ATTACH"]);
  };

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="border-l-4 accent-border pl-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Process Picker</h2>
        <p className="text-zinc-500 text-sm mt-1">Select target application for memory redirection.</p>
      </div>

      <div className="p-12 border border-[#222] rounded flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,var(--accent-color),transparent)]" />
        
        {status === 'IDLE' && (
          <>
            <div className="w-24 h-24 rounded border border-[#333] flex items-center justify-center bg-[#0f0f0f] shadow-inner">
               <Monitor size={48} className="text-zinc-700" />
            </div>
            <div className="text-center z-10">
              <h3 className="text-xl font-bold">Process: <span className="accent-text">STANDOFF2.EXE</span></h3>
              <p className="text-zinc-500 text-xs mt-1">Compatible with Engine Version 0.28.x and higher.</p>
            </div>
            <button 
              onClick={startScan}
              className="px-10 py-3 accent-bg text-white font-black uppercase tracking-[0.2em] rounded-sm accent-glow hover:opacity-90 transition-all z-10"
            >
              ATTACH ENGINE
            </button>
          </>
        )}

        {status === 'SCANNING' && (
          <div className="flex flex-col items-center gap-6 z-10">
            <Loader2 className="w-16 h-16 text-red-500 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-bold font-mono uppercase tracking-widest">Scanning Memory...</h3>
              <div className="mt-2 h-1 w-48 bg-[#1a1a1a] rounded overflow-hidden">
                 <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        )}

        {status === 'LOCKED' && (
          <>
            <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-500 z-10">
              <ShieldCheck size={48} />
            </div>
            <div className="text-center z-10">
              <h3 className="text-xl font-bold text-green-500 uppercase tracking-tighter">Connection Active</h3>
              <p className="text-zinc-500 text-xs mt-1">STANDOFF2.EXE Locked (0x00FF42A)</p>
            </div>
            <button 
              onClick={reset}
              className="px-10 py-3 bg-[#111] border border-[#333] text-zinc-500 font-bold uppercase tracking-[0.2em] rounded-sm hover:text-white transition-all z-10"
            >
              TERMINATE LINK
            </button>
          </>
        )}
      </div>

      <div className="bg-black p-4 rounded border border-[#1a1a1a] h-40 overflow-y-auto custom-scrollbar font-mono text-[10px] text-zinc-500">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#111] text-zinc-700 font-bold uppercase">
          <Terminal size={12} /> Execution_Log.txt
        </div>
        {log.map((line, i) => (
          <div key={i} className="mb-0.5">
            <span className="text-zinc-700">[{new Date().toLocaleTimeString()}]</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessScannerTab;
