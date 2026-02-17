
import React from 'react';
import Logo from './Logo';

interface FeaturedPartnerCardProps {
  onExplore: () => void;
}

const FeaturedPartnerCard: React.FC<FeaturedPartnerCardProps> = ({ onExplore }) => {
  return (
    <div className="verblis-glass rounded-[4rem] p-12 specular-border overflow-hidden text-center stagger-item delay-3">
        <div className="mb-8 flex items-center justify-center">
            <div className="animate-float">
                <Logo size={80} />
            </div>
        </div>
        <h3 className="text-3xl font-bold text-indigo-950 mb-3">Verblis Yoga & Wellness</h3>
        <p className="text-base text-indigo-700 font-semibold mb-8">"Breathe, Flow, Thrive!"</p>
        <button
            onClick={onExplore}
            className="w-full py-5 rounded-2xl bg-[#7E22CE] text-white font-bold text-sm tracking-wide shadow-xl shadow-purple-500/30 hover:bg-[#65A30D] transition-all transform hover:scale-[1.02] active:scale-95"
        >
            EXPLORE PARTNER RESOURCES
        </button>
    </div>
  );
};

export default FeaturedPartnerCard;
