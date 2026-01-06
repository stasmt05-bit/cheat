
import React, { useState } from 'react';
import { MOCK_SKINS } from '../../constants';
import { Package, Download, ExternalLink } from 'lucide-react';

const SkinManagerTab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <div className="border-l-4 accent-border pl-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Skin Manager</h2>
          <p className="text-zinc-500 text-sm mt-1">Browse and deploy 3D mesh assets to current session.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#151515] border border-[#333] rounded hover:bg-[#1a1a1a] transition-all text-xs font-bold uppercase tracking-widest group">
          <Package size={14} className="group-hover:accent-text" />
          Import Assets
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_SKINS.map((skin) => (
          <div 
            key={skin.id}
            onClick={() => setSelectedId(skin.id)}
            className={`group relative bg-[#0f0f0f] border ${selectedId === skin.id ? 'accent-border' : 'border-[#1a1a1a]'} rounded-lg overflow-hidden cursor-pointer hover:border-[#444] transition-all`}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={skin.imageUrl} alt={skin.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded text-[8px] font-bold uppercase tracking-wider backdrop-blur-md">
                {skin.rarity}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm tracking-tight">{skin.name}</h3>
                <div className={`w-2 h-2 rounded-full ${skin.rarity === 'Legendary' ? 'bg-orange-500' : skin.rarity === 'Epic' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-[#1a1a1a] rounded text-[10px] font-bold uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1">
                  <Download size={10} /> Sync
                </button>
                <button className="px-2 py-1.5 bg-[#1a1a1a] rounded hover:bg-zinc-800 transition-colors">
                  <ExternalLink size={10} />
                </button>
              </div>
            </div>

            {selectedId === skin.id && (
                <div className="absolute inset-x-0 bottom-0 h-1 accent-bg shadow-[0_0_15px_var(--accent-color)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinManagerTab;
