
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 100, color }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hummingGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color || "#D64F5F"} />
          <stop offset="100%" stopColor={color || "#5E4268"} />
        </linearGradient>
      </defs>
      
      {/* Sleek, Geometric Zen Hummingbird - Standardized Brand Mark */}
      <g stroke="url(#hummingGradient)" strokeWidth="4" strokeLinecap="round" strokeJoin="round">
        {/* Head & Beak */}
        <path d="M72 38 L88 32" />
        <circle cx="68" cy="38" r="5" strokeWidth="3" />
        
        {/* Body Arc */}
        <path d="M68 43 C68 60, 50 75, 30 75" />
        
        {/* Primary Wing */}
        <path d="M50 50 C40 25, 20 20, 12 40 C18 50, 35 55, 50 50" fill="url(#hummingGradient)" fillOpacity="0.15" />
        
        {/* Secondary Wing (Depth) */}
        <path d="M55 45 C50 35, 40 35, 35 40" strokeOpacity="0.5" />

        {/* Tail Feathers */}
        <path d="M30 75 L18 88" />
        <path d="M30 75 L8 78" />
      </g>
      
      {/* Security Signature Anchor */}
      <circle cx="50" cy="50" r="0.1" fill="transparent" />
    </svg>
  );
};

export default Logo;
