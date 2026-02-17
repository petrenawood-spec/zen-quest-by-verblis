
import React, { useEffect, useState, useRef } from 'react';
import { EasterEggService } from '../services/EasterEggService';
import EggFoundDialog from './EggFoundDialog';
import Logo from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [showEggDialog, setShowEggDialog] = useState(false);
  const logoTapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const eggService = EasterEggService.getInstance();

  const handleLogoTap = () => {
    const currentTime = new Date().getTime();
    const tapDelay = currentTime - lastTapTimeRef.current;

    if (tapDelay < 300 && tapDelay > 0) {
      logoTapCountRef.current += 1;
      if (logoTapCountRef.current >= 2) {
        if (!eggService.isEggFound('egg_splash_secret')) {
          eggService.findEgg('egg_splash_secret');
          setShowEggDialog(true);
        }
        logoTapCountRef.current = 0;
      }
    } else {
      logoTapCountRef.current = 0;
    }
    lastTapTimeRef.current = currentTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 2 : 100));
    }, 30);
    const timer = setTimeout(onFinish, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F4FF] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-flutter mb-12 relative cursor-pointer" onClick={handleLogoTap}>
           <Logo className="animate-float" size={220} />
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tighter vq-gradient animate-[flutter-pop_1s_ease-out_0.5s_forwards] opacity-0">
            ZenQuest
          </h1>
          <p className="text-[#5E4268]/30 font-black text-[9px] uppercase tracking-[0.6em] animate-[flutter-pop_1s_ease-out_0.8s_forwards] opacity-0">
            Agile Wellness • Mindful Flow
          </p>
        </div>

        <div className="mt-20 w-64 h-1.5 bg-purple-100 rounded-full overflow-hidden shadow-inner border border-white/20">
          <div 
            className="h-full bg-gradient-to-r from-[#D64F5F] to-[#5E4268] transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {showEggDialog && (
        <EggFoundDialog 
          title={eggService.getAllEggs().find(e => e.id === 'egg_splash_secret')?.title || 'Secret Found!'} 
          emoji={eggService.getAllEggs().find(e => e.id === 'egg_splash_secret')?.emoji || '🤍'} 
          onClose={() => setShowEggDialog(false)} 
        />
      )}
    </div>
  );
};

export default SplashScreen;
