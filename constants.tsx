
import React from 'react';
import { Settings, Eye, Grid, Cpu, Search, Crosshair, Ghost, Zap } from 'lucide-react';
import { ModuleType, Skin } from './types';

export const MODULES = [
  { id: ModuleType.GENERAL, label: 'General', icon: <Cpu size={20} /> },
  { id: ModuleType.COMBAT, label: 'Combat', icon: <Crosshair size={20} /> },
  { id: ModuleType.ESP, label: 'Visuals (ESP)', icon: <Ghost size={20} /> },
  { id: ModuleType.SKINS, label: 'Skin Changer', icon: <Grid size={20} /> },
  { id: ModuleType.MISC, label: 'Movement/Misc', icon: <Zap size={20} /> },
  { id: ModuleType.SCANNER, label: 'Process Picker', icon: <Search size={20} /> },
  { id: ModuleType.SETTINGS, label: 'Settings', icon: <Settings size={20} /> },
];

export const MOCK_SKINS: Skin[] = [
  { id: '1', name: 'Gold Karambit', rarity: 'Legendary', imageUrl: 'https://images.unsplash.com/photo-1599834285070-59a5c601005b?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: '2', name: 'Dragon Glass', rarity: 'Legendary', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: '3', name: 'Obsidian Blade', rarity: 'Epic', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: '4', name: 'Crimson Web', rarity: 'Rare', imageUrl: 'https://images.unsplash.com/photo-1579546678181-9968959d042e?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: '5', name: 'Neon Strike', rarity: 'Epic', imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: '6', name: 'Void Walker', rarity: 'Epic', imageUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=400&h=300' },
];
