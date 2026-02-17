
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Quest, Badge, UserStats } from '../types';
import { INITIAL_STATS, INITIAL_QUESTS, INITIAL_BADGES, VERBLIS_SOCIAL_LINKS } from '../constants';
import QuestCard from './QuestCard';
import FeaturedPartnerCard from './FeaturedPartnerCard';
import EggFoundDialog from './EggFoundDialog';
import Logo from './Logo';
import { EasterEggService } from '../services/EasterEggService';
import { SoundService } from '../services/SoundService';
import { getWellnessInsight } from '../services/geminiService';

interface DashboardProps {
  onStartLive?: () => void;
  onNavigateToVerblisPartner: () => void;
  onNavigateToAbout: () => void;
  onNavigateToEggGallery: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartLive, onNavigateToVerblisPartner, onNavigateToAbout, onNavigateToEggGallery }) => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [aiInsight, setAiInsight] = useState<string>('Breathe deeply. Your wellness story is unfolding...');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showEggDialog, setShowEggDialog] = useState(false);
  const [currentEggDetails, setCurrentEggDetails] = useState<{ title: string; emoji: string } | null>(null);

  const xpBarTapCountRef = useRef(0);
  const coinsTapCountRef = useRef(0);
  const streakTapCountRef = useRef(0);
  const eggService = EasterEggService.getInstance();
  const soundService = SoundService.getInstance();

  const handleEggDiscovery = (eggId: 'egg_dashboard_combo' | 'egg_badge_hidden' | 'egg_streak_magic') => {
    if (!eggService.isEggFound(eggId)) {
      eggService.findEgg(eggId);
      const egg = eggService.getAllEggs().find(e => e.id === eggId);
      if (egg) {
        setCurrentEggDetails({ title: egg.title, emoji: egg.emoji || '✨' });
        setShowEggDialog(true);
      }
    }
  };

  const onXpBarTap = () => {
    soundService.triggerHaptic(5);
    soundService.playClick();
    xpBarTapCountRef.current += 1;
    checkDashboardCombo();
  };

  const onCoinsTap = () => {
    soundService.triggerHaptic(5);
    soundService.playClick();
    coinsTapCountRef.current += 1;
    checkDashboardCombo();
  };

  const checkDashboardCombo = () => {
    if (xpBarTapCountRef.current >= 3 && coinsTapCountRef.current >= 3) {
      handleEggDiscovery('egg_dashboard_combo');
      xpBarTapCountRef.current = 0;
      coinsTapCountRef.current = 0;
    }
  };

  const onFirstBadgeLongPress = (badgeId: string) => {
    if (badgeId === INITIAL_BADGES[0].id) {
      handleEggDiscovery('egg_badge_hidden');
    }
  };

  const onStreakTap = () => {
    soundService.triggerHaptic(8);
    soundService.playClick();
    streakTapCountRef.current += 1;
    if (streakTapCountRef.current >= 3) {
      handleEggDiscovery('egg_streak_magic');
      streakTapCountRef.current = 0;
    }
  };

  const fetchInsight = useCallback(async (showLoader = true) => {
    if (showLoader) setIsAiLoading(true);
    const completedNames = quests.filter(q => q.isCompleted).map(q => q.title);
    const insight = await getWellnessInsight("Hamza", stats.streak, completedNames);
    setAiInsight(insight);
    if (showLoader) setIsAiLoading(false);
  }, [quests, stats.streak]);

  useEffect(() => {
    fetchInsight(false);
  }, [quests.filter(q => q.isCompleted).length, stats.streak]);

  const handleCompleteQuest = (id: string) => {
    const quest = quests.find(q => q.id === id);
    if (!quest || quest.isCompleted) return;

    soundService.playQuestComplete();
    setQuests(prev => prev.map(q => q.id === id ? { ...q, isCompleted: true } : q));
    
    setStats(prev => {
      let newXp = prev.xp + quest.xpReward;
      let newLevel = prev.level;
      let newXpMax = prev.xpMax;

      if (newXp >= newXpMax) {
        soundService.playSuccess();
        newLevel += 1;
        newXp = newXp - newXpMax;
        newXpMax = Math.floor(newXpMax * 1.2);
      }

      return {
        ...prev,
        xp: newXp,
        xpMax: newXpMax,
        level: newLevel,
        coins: prev.coins + quest.coinReward,
      };
    });
  };

  const xpPercentage = (stats.xp / stats.xpMax) * 100;

  return (
    <div className="min-h-screen pb-0">
      <header className="sticky top-0 z-50 verblis-glass border-b border-white/40 px-6 py-4 md:px-12 animate-flutter">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
          <div className="flex items-center space-x-5 group cursor-pointer shrink-0" onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); }}>
             <div className="animate-float">
                <Logo size={46} />
             </div>
             <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tight text-[#5E4268]">ZenQuest</h1>
                <p className="text-[9px] text-[#E14B5A] font-black uppercase tracking-[0.3em]">by Verblis</p>
             </div>
          </div>

          <div className="flex-1 max-w-xl hidden md:flex items-center space-x-8 px-8 py-3 bg-white/40 rounded-3xl border border-white/50 shadow-inner">
            <div className="flex-1 space-y-2 cursor-pointer" onClick={onXpBarTap}>
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-[#5E4268]/60 uppercase tracking-widest">Level {stats.level}</span>
                    <span className="text-[10px] font-black text-[#5E4268]/40">{stats.xp} / {stats.xpMax} XP</span>
                </div>
                <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-[#E14B5A] to-[#5E4268] transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                        style={{ width: `${xpPercentage}%` }}
                    />
                </div>
            </div>
            <div className="flex items-center space-x-6 shrink-0">
                <div className="flex flex-col items-center cursor-pointer" onClick={onCoinsTap}>
                    <span className="text-lg">🪙</span>
                    <span className="text-xs font-black text-[#5E4268]">{stats.coins}</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={onStreakTap}>
                    <span className="text-lg">🔥</span>
                    <span className="text-xs font-black text-[#5E4268]">{stats.streak}</span>
                </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 shrink-0">
            <button 
                onClick={() => { soundService.triggerHaptic(10); soundService.playClick(); onStartLive?.(); }}
                className="group relative flex items-center space-x-3 rounded-2xl bg-[#5E4268] px-6 py-3 text-xs font-bold text-white shadow-xl transition-all hover:bg-[#2D2430] hover:scale-110 active:scale-90 overflow-hidden"
            >
                <span>🎙️</span>
                <span className="hidden sm:inline">Seek Zephyr</span>
            </button>
            <button
                onClick={() => { soundService.triggerHaptic(10); soundService.playClick(); onNavigateToAbout(); }}
                className="group relative flex items-center justify-center h-12 w-12 rounded-2xl bg-[#F8F4FF] text-[#5E4268] border border-white/60 hover:bg-white transition-colors shadow-lg"
                title="About"
            >
                ⚙️
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-16 md:px-12">
        <section className="mb-20 text-center space-y-8 animate-flutter delay-1">
            <div className="inline-block px-6 py-2 rounded-full bg-white/50 border border-white/70 text-[#E14B5A] text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                Zen Reflection
            </div>
            <div className="min-h-[120px] flex items-center justify-center">
              <h2 className={`text-4xl md:text-6xl font-black tracking-tight text-[#5E4268] max-w-4xl mx-auto leading-[1.1] transition-all duration-300 ${isAiLoading ? 'opacity-20 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                  "{aiInsight}"
              </h2>
            </div>
            <button 
              onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); fetchInsight(true); }} 
              disabled={isAiLoading}
              className="text-xs font-black text-[#E14B5A]/60 hover:text-[#E14B5A] transition-colors uppercase tracking-[0.3em] hover:scale-110 active:scale-90 disabled:opacity-30"
            >
                {isAiLoading ? 'Seeking Wisdom...' : 'Refresh Wisdom'}
            </button>
        </section>

        <section className="mb-24">
            <FeaturedPartnerCard onExplore={() => { soundService.triggerHaptic(10); soundService.playClick(); onNavigateToVerblisPartner(); }} />
        </section>

        <div className="mb-12 flex items-end justify-between px-2">
            <div>
                <h3 className="text-3xl font-black text-[#5E4268]">Chapters</h3>
                <p className="text-sm text-[#5E4268]/60 font-medium italic">Your story in motion.</p>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-black uppercase text-[#E14B5A]/40 tracking-widest">Progress</span>
                <p className="text-2xl font-black text-[#5E4268]">{quests.filter(q => q.isCompleted).length} / {quests.length}</p>
            </div>
        </div>

        <section className="grid gap-10 md:grid-cols-3 mb-24">
          {quests.map((quest, i) => (
            <div key={quest.id} className={`stagger-item delay-${(i % 3) + 2}`}>
              <QuestCard quest={quest} onComplete={handleCompleteQuest} />
            </div>
          ))}
        </section>

        <section className="mb-24 stagger-item delay-4">
            <h3 className="text-2xl font-black text-[#5E4268] mb-8 px-2">Accomplishments</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {badges.map((badge, index) => (
                    <div 
                        key={badge.id} 
                        className={`verblis-glass rounded-[2.5rem] p-8 text-center shadow-lg border border-white/80 cursor-pointer heavy-card transition-all 
                                    ${badge.isUnlocked ? '' : 'grayscale opacity-50'}`}
                        onContextMenu={(e) => {
                            e.preventDefault(); 
                            soundService.triggerHaptic([30, 20]);
                            if (index === 0) onFirstBadgeLongPress(badge.id);
                        }}
                        onClick={() => { soundService.triggerHaptic(5); soundService.playBadgeTap(); }}
                    >
                        <div className={`text-5xl mb-4 ${badge.isUnlocked ? '' : 'opacity-50'}`}>{badge.icon}</div>
                        <p className="font-bold text-[#5E4268] text-sm uppercase tracking-wider">{badge.name}</p>
                    </div>
                ))}
                <div 
                    onClick={() => { soundService.triggerHaptic(10); soundService.playClick(); onNavigateToEggGallery(); }}
                    className="verblis-glass rounded-[2.5rem] p-8 text-center shadow-lg border border-white/80 cursor-pointer heavy-card transition-all group"
                >
                    <div className="text-5xl mb-4 group-hover:animate-spin">🥚</div>
                    <p className="font-bold text-[#5E4268] text-sm uppercase tracking-wider">Secret Gallery</p>
                    <p className="text-[10px] font-black text-[#E14B5A] mt-2 tracking-widest">{eggService.getTotalEggsFound()}/5 DISCOVERED</p>
                </div>
            </div>
        </section>

        <section className="mb-24 stagger-item delay-4">
            <div className="verblis-glass rounded-[5rem] p-12 md:p-20 specular-border overflow-hidden grid md:grid-cols-2 gap-20 items-center hover:scale-[1.01] transition-transform duration-1000">
                <div className="space-y-8">
                    <h3 className="text-6xl font-black text-[#5E4268] leading-tight">Breathe.<br/>Flow.<br/><span className="vq-gradient">Thrive.</span></h3>
                    <p className="text-xl text-[#5E4268]/60 font-medium leading-relaxed italic">
                        The architecture of a more mindful you.
                    </p>
                    <div className="flex items-center space-x-4 text-[#E14B5A] bg-white/50 p-6 rounded-[2rem] w-fit animate-float shadow-xl border border-white/80">
                        <span className="text-2xl">📩</span>
                        <a href="mailto:ranag786tech@gmail.com" className="font-black text-lg tracking-tight">ranag786tech@gmail.com</a>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {VERBLIS_SOCIAL_LINKS.map((social) => (
                        <a 
                            key={social.platform} 
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); }} 
                            className="group flex items-center justify-between p-7 rounded-[2rem] bg-white/30 border border-white/60 hover:bg-white/70 hover:translate-x-4 transition-all cursor-pointer shadow-sm"
                        >
                            <span className="font-black text-[#5E4268] text-xl tracking-tight">{social.platform}</span>
                            <span className="text-[#E14B5A] text-2xl group-hover:scale-150 transition-transform">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="w-full bg-white/60 backdrop-blur-3xl py-20 border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex gap-16">
                <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E14B5A]/40">Legal Chapter</h5>
                    <button onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); }} className="block text-lg font-black text-[#5E4268] hover:text-[#E14B5A] transition-colors text-left">Purchasing Policy</button>
                    <button onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); }} className="block text-lg font-black text-[#5E4268] hover:text-[#E14B5A] transition-colors text-left">Terms of Growth</button>
                </div>
            </div>
            <div className="text-center md:text-right">
                <div className="mb-6 opacity-40">
                    <Logo size={60} className="mx-auto md:ml-auto" />
                </div>
                <p className="text-[10px] font-black text-[#5E4268]/40 uppercase tracking-[0.5em]">
                    ZenQuest by Verblis © 2024
                </p>
            </div>
        </div>
      </footer>

      {showEggDialog && currentEggDetails && (
        <EggFoundDialog 
          title={currentEggDetails.title} 
          emoji={currentEggDetails.emoji} 
          onClose={() => setShowEggDialog(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
