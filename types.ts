
export enum ModuleType {
  GENERAL = 'general',
  COMBAT = 'combat',
  ESP = 'esp',
  SKINS = 'skins',
  MISC = 'misc',
  SCANNER = 'scanner',
  SETTINGS = 'settings'
}

export interface AppSettings {
  accentColor: string;
  coreEngine: boolean;
  performanceBoost: boolean;
  debugView: boolean;
  fov: number;
  brightness: number;
  uiScale: number;
  // Combat
  aimbot: boolean;
  aimFov: number;
  aimSmoothness: number;
  aimBone: 'Head' | 'Chest' | 'Pelvis';
  silentAim: boolean;
  triggerBot: boolean;
  // ESP
  boxEsp: boolean;
  snaplines: boolean;
  healthBars: boolean;
  skeleton: boolean;
  chams: boolean;
  // Misc
  flyHack: boolean;
  noRecoil: boolean;
  speedHack: boolean;
}

export interface Skin {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl: string;
}
