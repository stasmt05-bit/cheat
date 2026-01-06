
import React from 'react';
import { ModuleType } from '../types';
import { MODULES } from '../constants';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  accentColor: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, accentColor }) => {
  return (
    <nav className="w-16 md:w-56 h-full bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col py-6">
      <div className="px-4 mb-8 hidden md:block">
        <div className="h-0.5 w-full accent-bg opacity-20 mb-1" />
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Core Navigation</span>
      </div>

      <div className="flex-1 space-y-1">
        {MODULES.map((module) => {
          const isActive = activeModule === module.id;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center px-4 py-3.5 transition-all relative group
                ${isActive ? 'bg-[#151515]' : 'hover:bg-[#111] text-zinc-500 hover:text-zinc-300'}`}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-full accent-bg accent-glow" />
              )}
              
              <div className={`flex items-center gap-4 ${isActive ? 'accent-text' : ''}`}>
                <div className="flex-shrink-0">
                  {module.icon}
                </div>
                <span className="hidden md:block font-semibold text-sm tracking-tight">
                  {module.label}
                </span>
              </div>

              {/* Tooltip for collapsed mode */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a1a] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 md:hidden pointer-events-none z-50 whitespace-nowrap border border-[#333]">
                {module.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto px-4">
        <div className="h-24 w-full rounded border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden hidden md:flex flex-col p-2 gap-1">
          <div className="text-[8px] text-zinc-600 font-mono uppercase">System Load</div>
          <div className="flex-1 flex items-end gap-1">
            {[40, 70, 45, 90, 60, 30, 80, 50, 60, 20].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 accent-bg opacity-30" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
