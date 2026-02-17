
import React from 'react';
import { Quest } from '../types';
import { SoundService } from '../services/SoundService';

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  const isExternalLink = !!quest.link;
  const soundService = SoundService.getInstance();

  const handleButtonClick = () => {
    soundService.triggerHaptic(10);
    soundService.playClick();
    if (isExternalLink) {
      window.open(quest.link, '_blank');
      // Optionally mark as complete after opening the link
      onComplete(quest.id); 
    } else {
      onComplete(quest.id);
    }
  };

  return (
    <div className={`group heavy-card relative h-full verblis-glass rounded-[3.5rem] p-10 specular-border ${quest.isCompleted ? 'grayscale-[0.5] opacity-60 scale-[0.98]' : ''}`}>
      <div className="mb-10 flex items-center justify-between">
        <div className={`h-20 w-20 flex items-center justify-center rounded-[2rem] bg-indigo-50/50 text-4xl shadow-inner transition-all duration-500 ${quest.isCompleted ? 'rotate-[360deg]' : 'group-hover:rotate-12'}`}>
          {quest.isCompleted ? '✅' : (quest.category === 'physical' ? '🌿' : quest.category === 'mental' ? '🖋️' : quest.category === 'emotional' ? '💖' : '✨')}
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">Duration</span>
            <span className="text-sm font-black text-lime-700 bg-lime-50 px-4 py-1.5 rounded-full">
              {quest.duration}
            </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-950 mb-4 tracking-tight leading-tight">{quest.title}</h3>
      <p className="text-base text-indigo-900/60 mb-8 leading-relaxed font-medium">{quest.intention}</p>

      <div className="flex items-center space-x-4 mb-10">
        <div className="px-4 py-2 bg-indigo-50 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            +{quest.xpReward} XP
        </div>
        <div className="px-4 py-2 bg-amber-50 rounded-2xl text-[10px] font-black text-amber-600 uppercase tracking-widest">
            +{quest.coinReward} Coins
        </div>
      </div>

      <button
        disabled={quest.isCompleted}
        onClick={handleButtonClick}
        className={`w-full py-6 rounded-[2rem] font-black text-sm tracking-[0.15em] transition-all transform active:scale-90 ${
          quest.isCompleted
            ? 'bg-white/40 text-indigo-300 cursor-not-allowed'
            : 'bg-indigo-700 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-800'
        }`}
      >
        {quest.isCompleted ? 'CHAPTER ARCHIVED' : (isExternalLink ? 'VIEW RESOURCE' : 'BEGIN CHAPTER')}
      </button>
      
      {quest.isCompleted && (
          <div className="absolute -top-4 -right-4 text-4xl animate-flutter">✨</div>
      )}
    </div>
  );
};

export default QuestCard;
