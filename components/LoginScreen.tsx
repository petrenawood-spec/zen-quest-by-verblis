
import React, { useState } from 'react';
import { SoundService } from '../services/SoundService';
import Logo from './Logo';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('hamza@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const soundService = SoundService.getInstance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.triggerHaptic(15);
    soundService.playClick();
    onLogin();
  };

  const handleLinkClick = () => {
    soundService.triggerHaptic(5);
    soundService.playClick();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F4FF] px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-[#D64F5F] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-[#5E4268] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-flutter">
        <div className="mb-14 flex flex-col items-center">
          <div className="mb-8 animate-float">
             <Logo size={140} />
          </div>
          <h1 className="text-4xl font-black text-[#5E4268] tracking-tight">ZenQuest</h1>
          <p className="mt-2 text-[#D64F5F]/60 font-black uppercase tracking-[0.4em] text-[9px]">The Mindful Path</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 verblis-glass p-12 rounded-[3.5rem] border border-white shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#5E4268]/40 ml-5">Identity</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-[2rem] border-2 border-transparent bg-white/70 px-8 py-5 shadow-inner outline-none transition-all focus:border-[#D64F5F] hover:bg-white"
              placeholder="you@verblis.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#5E4268]/40 ml-5">Access Code</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-[2rem] border-2 border-transparent bg-white/70 px-8 py-5 shadow-inner outline-none transition-all focus:border-[#D64F5F] hover:bg-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => { soundService.triggerHaptic(5); soundService.playClick(); setShowPassword(!showPassword); }}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-xl opacity-30 hover:opacity-100 transition-opacity"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 rounded-[2.2rem] bg-[#5E4268] font-black text-white text-sm tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.03] active:scale-95 hover:bg-[#D64F5F] shadow-[#5E4268]/20 mt-4"
          >
            ENTER THE FLOW
          </button>
        </form>

        <div className="mt-16 text-center">
            <div className="flex justify-center space-x-10 text-[10px] font-black text-[#5E4268]/30 uppercase tracking-[0.4em]">
                <button onClick={handleLinkClick} className="hover:text-[#D64F5F] transition-colors">Privacy</button>
                <button onClick={handleLinkClick} className="hover:text-[#D64F5F] transition-colors">Safety</button>
                <button onClick={handleLinkClick} className="hover:text-[#D64F5F] transition-colors">Help</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
