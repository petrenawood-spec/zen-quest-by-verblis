
import React from 'react';
import { VERBLIS_SOCIAL_LINKS, VERBLIS_FEATURED_VIDEOS } from '../constants';
import Logo from './Logo';

interface VerblisPartnerScreenProps {
  onClose: () => void;
}

const VerblisPartnerScreen: React.FC<VerblisPartnerScreenProps> = ({ onClose }) => {
  const PARTNER_NAME = "Verblis Yoga & Wellness";
  const PARTNER_EMAIL = "petrenawood@verblis.com";
  const PARTNER_TAGLINE = "Breathe, Flow, Thrive!";
  const PARTNER_MISSION = "Real Care, Real Tools, Real Transformation";

  const _buildSocialLink = (icon: string, name: string, handle: string, followers: string, url: string, color: string) => (
    <a 
      href={url} 
      key={name}
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white/40 border border-white/60 rounded-3xl p-6 mb-4 flex items-center space-x-4 group heavy-card hover:bg-white/60"
    >
      <div className="flex-shrink-0 text-4xl">{icon}</div>
      <div className="flex-grow">
        <h4 className="font-bold text-indigo-950 text-lg mb-1">{name}</h4>
        <p className="text-sm text-indigo-700/70">{handle}</p>
        <p className="text-xs text-indigo-400">{followers}</p>
      </div>
      <span className="text-indigo-400 text-2xl group-hover:translate-x-2 transition-transform">→</span>
    </a>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F3E8FF] p-6 overflow-y-auto animate-flutter">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-200 text-[#7E22CE] hover:bg-indigo-300 transition-colors z-20"
      >
        ✕
      </button>

      {/* Header */}
      <div className="text-center py-20 px-4 bg-white/60 rounded-b-[4rem] border-b border-white/80 shadow-lg mb-12">
        <div className="animate-float mb-8 inline-block">
            <Logo size={100} />
        </div>
        <h1 className="text-5xl font-bold text-indigo-950 mb-2">{PARTNER_NAME}</h1>
        <p className="text-lg text-lime-700 font-semibold">by Petrena Wood</p>
      </div>

      <main className="mx-auto max-w-4xl w-full">
        {/* Tagline */}
        <section className="bg-gradient-to-br from-indigo-100/70 to-purple-100/70 p-10 rounded-[3rem] border border-white/60 shadow-lg text-center mb-12 stagger-item delay-1">
          <p className="text-2xl font-bold italic text-indigo-800 mb-4">"{PARTNER_TAGLINE}"</p>
          <p className="text-lg text-indigo-700">{PARTNER_MISSION}</p>
        </section>

        {/* Featured Videos */}
        <section className="mb-12 stagger-item delay-2">
          <h2 className="text-3xl font-bold text-indigo-950 mb-8 px-2">🎥 Featured Yoga Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERBLIS_FEATURED_VIDEOS.map((video, index) => (
              <div key={index} className="group">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 shadow-lg border border-white/60">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                </div>
                <h4 className="font-bold text-indigo-950 text-lg mb-1 px-2">{video.title}</h4>
                <p className="text-sm text-indigo-700/70 px-2 mb-4">{video.duration} • {video.views} views</p>
                <a 
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-bold text-xs px-2 hover:underline"
                >
                    Open in YouTube App ↗
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a 
              href="https://youtube.com/@verblis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block py-5 px-12 rounded-3xl bg-red-600 text-white font-bold text-sm tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all transform hover:scale-[1.03] active:scale-95"
            >
              EXPLORE THE YOUTUBE CHANNEL
            </a>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-12 stagger-item delay-3">
          <h2 className="text-3xl font-bold text-indigo-950 mb-8 px-2">📱 Connect With Petrena</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VERBLIS_SOCIAL_LINKS.map((link, index) => (
              _buildSocialLink(link.icon, link.platform, link.handle, 'Community Member', link.url, link.color)
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-20 stagger-item delay-4">
          <div className="verblis-glass rounded-[3rem] p-10 specular-border shadow-lg text-center">
            <h2 className="text-3xl font-bold text-indigo-950 mb-6">📧 Direct Guidance</h2>
            <p className="text-xl text-indigo-700 font-medium mb-8">{PARTNER_EMAIL}</p>
            <a 
              href={`mailto:${PARTNER_EMAIL}`}
              className="inline-block py-5 px-12 rounded-3xl bg-indigo-700 text-white font-bold text-sm tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-800 transition-all transform hover:scale-[1.03] active:scale-95"
            >
              SEND A MESSAGE
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VerblisPartnerScreen;
