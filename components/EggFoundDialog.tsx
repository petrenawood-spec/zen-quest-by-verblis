
import React, { useState, useEffect } from 'react';
import { SIGNATURE } from '../types';
import { SoundService } from '../services/SoundService';

interface EggFoundDialogProps {
  title: string;
  emoji: string;
  onClose: () => void;
}

const EggFoundDialog: React.FC<EggFoundDialogProps> = ({ title, emoji, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    SoundService.getInstance().playEggFound();
  }, []);

  return (
    <div className={`fixed inset-0 z-[101] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className={`relative p-8 bg-white rounded-[2rem] shadow-2xl border border-white/80 text-center transform transition-all duration-700 ease-[cubic-bezier(0.34,1.76,0.64,1)]
          ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
      >
        <button 
          className="absolute top-4 right-6 text-2xl text-indigo-200 hover:text-indigo-400 transition-colors" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <p className="text-8xl mb-6 animate-float">{emoji}</p>
        <h3 className="text-3xl font-bold text-indigo-950 mb-4 tracking-tight">{title}</h3>
        
        <div className="p-4 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl mb-8 border border-white/80">
          <p className="text-xl font-bold text-teal-900 tracking-wide">{SIGNATURE}</p>
        </div>

        <button 
          onClick={onClose}
          className="px-10 py-4 bg-purple-700 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-800 transition-all transform hover:scale-105 active:scale-95"
        >
          Amazing!
        </button>
      </div>
    </div>
  );
};

export default EggFoundDialog;
