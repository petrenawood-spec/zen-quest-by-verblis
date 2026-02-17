
// ============================================
// EasterEggService.ts - R-H SIGNATURE SYSTEM
// ============================================

import { EasterEgg, EggId, SIGNATURE } from '../types';

export class EasterEggService {
  private static instance: EasterEggService;
  private foundEggs: Set<EggId> = new Set();

  private eggs: EasterEgg[] = [
    {
      id: 'egg_splash_secret',
      title: '✨ Splash Secret Found!',
      hint: 'Double tap the logo during splash...',
      location: 'Splash Screen',
      found: false,
      emoji: '🤍',
    },
    {
      id: 'egg_dashboard_combo',
      title: '🎯 Dashboard Combo Unlocked!',
      hint: 'Tap XP bar 3 times + Coins 3 times...',
      location: 'Dashboard Header',
      found: false,
      emoji: '⚡',
    },
    {
      id: 'egg_badge_hidden',
      title: '🏆 Badge Mystery Found!',
      hint: 'Long press the first badge...',
      location: 'Achievements Section',
      found: false,
      emoji: '🎖️',
    },
    {
      id: 'egg_streak_magic',
      title: '🔥 Streak Magic Revealed!',
      hint: 'Triple tap the flame 🔥...',
      location: 'Streak Counter',
      found: false,
      emoji: '✨',
    },
    {
      id: 'egg_about_page',
      title: '👨‍💻 Creator\'s Mark Found!',
      hint: 'Visit the About page and click the signature...',
      location: 'About/Settings',
      found: false,
      emoji: '💚',
    },
  ];

  static getInstance(): EasterEggService {
    if (!EasterEggService.instance) {
      EasterEggService.instance = new EasterEggService();
    }
    return EasterEggService.instance;
  }

  async initialize(): Promise<void> {
    // Load found eggs from storage
    const stored = localStorage.getItem('zenquest_eggs');
    if (stored) {
      this.foundEggs = new Set(JSON.parse(stored));
    }
  }

  isEggFound(eggId: EggId): boolean {
    return this.foundEggs.has(eggId);
  }

  async findEgg(eggId: EggId): Promise<void> {
    if (!this.isEggFound(eggId)) {
      this.foundEggs.add(eggId);
      localStorage.setItem('zenquest_eggs', JSON.stringify([...this.foundEggs]));
      // Force a re-render or state update in components that display egg status
      window.dispatchEvent(new CustomEvent('eggFound', { detail: eggId }));
    }
  }

  getTotalEggsFound(): number {
    return this.foundEggs.size;
  }

  getAllEggs(): EasterEgg[] {
    return this.eggs.map(egg => ({
      ...egg,
      found: this.isEggFound(egg.id),
    }));
  }

  getSignature(): string {
    return SIGNATURE;
  }

  async resetAllEggs(): Promise<void> {
    this.foundEggs.clear();
    localStorage.removeItem('zenquest_eggs');
    window.dispatchEvent(new CustomEvent('eggsReset'));
  }
}
