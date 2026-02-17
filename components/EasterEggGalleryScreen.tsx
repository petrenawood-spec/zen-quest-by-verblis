
import React, { useState, useEffect } from 'react';
import { EasterEggService } from '../services/EasterEggService';
import { SIGNATURE_SHORT, SIGNATURE } from '../types';

interface EasterEggGalleryScreenProps {
  onClose: () => void;
}

const EasterEggGalleryScreen: React.FC<EasterEggGalleryScreenProps> = ({ onClose }) => {
  const eggService = EasterEggService.getInstance();
  const [eggs, setEggs] = useState(eggService.getAllEggs());
  const foundCount = eggService.getTotalEggsFound();
  const allFound = foundCount === eggs.length;

  useEffect(() => {
    const handleEggUpdate = () => {
      setEggs(eggService.getAllEggs());
    };

    window.addEventListener('eggFound', handleEggUpdate);
    window.addEventListener('eggsReset', handleEggUpdate); 
    return () => {
      window.removeEventListener('eggFound', handleEggUpdate);
      window.removeEventListener('eggsReset', handleEggUpdate);
    };
  }, [eggService]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F3E8FF] p-6 overflow-y-auto animate-flutter">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-200 text-[#7E22CE] hover:bg-indigo-300 transition-colors z-20"
      >
        ✕
      </button>

      <div className="mx-auto max-w-4xl w-full pt-16">
        <h1 className="text-4xl font-bold text-indigo-950 text-center mb-12">
          Secret Eggs Found: <span className="text-lime-700">{foundCount}</span>/{eggs.length}
        </h1>

        {allFound && (
          <div className="verblis-glass rounded-[3rem] p-10 specular-border shadow-lg text-center mb-12 animate-flutter delay-1">
            <p className="text-5xl mb-4 animate-pulse">🏆</p>
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">ALL SECRETS FOUND!</h2>
            <p className="text-xl font-bold text-purple-700 mb-2">{SIGNATURE}</p>
            <p className="text-3xl animate-float">🤍🤍🤍</p>
          </div>
        )}

        <section className="grid grid-cols-1 gap-6 mb-12">
          {eggs.map((egg, index) => (
            <div key={egg.id} className={`bg-white/40 border border-white/60 rounded-3xl p-6 flex items-center space-x-4 heavy-card transition-all ${egg.found ? 'opacity-100' : 'opacity-70 grayscale'}`}>
              <div className="flex-shrink-0 text-4xl">{egg.found ? '✅' : '🔒'}</div>
              <div className="flex-grow">
                <h3 className="font-bold text-indigo-950 text-xl mb-1">{egg.found ? egg.title : '???'}</h3>
                <p className="text-sm text-indigo-700/70">Location: {egg.location}</p>
                <p className={`text-xs ${egg.found ? 'text-lime-700' : 'text-orange-500'}`}>
                  {egg.found ? '✓ Found!' : `Hint: ${egg.hint}`}
                </p>
              </div>
              {egg.found && egg.emoji && <span className="flex-shrink-0 text-3xl">{egg.emoji}</span>}
            </div>
          ))}
        </section>
        
        <div className="text-center mt-16 mb-12">
          <button 
            onClick={() => {eggService.resetAllEggs(); setEggs(eggService.getAllEggs());}} 
            className="text-xs font-black text-indigo-400 hover:text-indigo-800 transition-colors uppercase tracking-[0.3em] hover:scale-110 active:scale-90"
          >
            Reset All Eggs
          </button>
        </div>
      </div>
    </div>
  );
};

export default EasterEggGalleryScreen;
