
import React, { useState } from 'react';
import { EasterEggService } from '../services/EasterEggService';
import { SIGNATURE, SIGNATURE_SHORT } from '../types';
import EggFoundDialog from './EggFoundDialog';

interface AboutScreenProps {
  onClose: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onClose }) => {
  const eggService = EasterEggService.getInstance();
  const [showEggDialog, setShowEggDialog] = useState(false);

  const handleSignatureClick = () => {
    if (!eggService.isEggFound('egg_about_page')) {
      eggService.findEgg('egg_about_page');
      setShowEggDialog(true);
    }
  };

  const eggDetails = eggService.getAllEggs().find(e => e.id === 'egg_about_page');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F3E8FF] p-6 overflow-y-auto animate-flutter">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-200 text-[#7E22CE] hover:bg-indigo-300 transition-colors z-20"
      >
        ✕
      </button>

      <div className="mx-auto max-w-4xl w-full pt-16 text-center">
        <h1 className="text-5xl font-bold text-indigo-950 mb-8">About ZenQuest</h1>
        <p className="text-lg text-indigo-700 leading-relaxed mb-12">
          ZenQuest is your personalized journey to inner peace and self-discovery, powered by Verblis storytelling and advanced AI. We believe in crafting a narrative for your wellness, making every step an engaging chapter in your personal growth story.
        </p>

        <section className="verblis-glass rounded-[3rem] p-10 specular-border shadow-lg text-center mb-12 stagger-item delay-1">
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">Our Mission</h2>
          <p className="text-lg text-indigo-700/70 leading-relaxed">
            "Real Care, Real Tools, Real Transformation." We are dedicated to providing accessible, impactful wellness tools that empower you to breathe, flow, and thrive in every aspect of your life.
          </p>
        </section>

        <section className="verblis-glass rounded-[3rem] p-10 specular-border shadow-lg text-center mb-12 stagger-item delay-2">
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">Contact Us</h2>
          <p className="text-lg text-indigo-700/70 mb-4">
            For support, partnerships, or general inquiries, please reach out.
          </p>
          <a 
            href="mailto:ranag786tech@gmail.com"
            className="inline-block py-4 px-10 rounded-2xl bg-indigo-700 text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-300 hover:bg-indigo-800 transition-all transform hover:scale-[1.03] active:scale-95"
          >
            Email Support
          </a>
        </section>

        {/* Developer Signature (Egg #5) */}
        <div className="mt-20 stagger-item delay-3">
          <p className="text-md text-gray-600 mb-2">Developed with care by</p>
          <div 
            onClick={handleSignatureClick} 
            className="inline-block cursor-pointer group"
          >
            <p className="text-4xl font-bold text-purple-700 tracking-tight group-hover:scale-110 transition-transform">
              💚 <span className="text-indigo-950">R-H</span> {SIGNATURE_SHORT}
            </p>
            <p className="text-xs text-gray-500 italic mt-1">
                {eggService.isEggFound('egg_about_page') ? 'Secret Unlocked!' : 'Click to reveal a secret...'}
            </p>
          </div>
        </div>
      </div>

      {showEggDialog && eggDetails && (
        <EggFoundDialog 
          title={eggDetails.title} 
          emoji={eggDetails.emoji || '💚'} 
          onClose={() => setShowEggDialog(false)} 
        />
      )}
    </div>
  );
};

export default AboutScreen;
