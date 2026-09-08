import React from "react";

export function BloomBoxCube({ className = "w-48 h-48 sm:w-64 sm:h-64" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient background glow behind the cube */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200, 90, 23, 0.55) 0%, rgba(203, 163, 68, 0.35) 45%, transparent 75%)"
        }}
      />

      <svg 
        className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105" 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top Face Gradient: Muted Gold & Sunlit Amber */}
          <linearGradient id="topFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA8232" />
          </linearGradient>

          {/* Left Face Gradient: Burnt Orange / Terracotta */}
          <linearGradient id="leftFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0732A" />
            <stop offset="60%" stopColor="#C85A17" />
            <stop offset="100%" stopColor="#8A340D" />
          </linearGradient>

          {/* Right Face Gradient: Dark Maroon / Crimson */}
          <linearGradient id="rightFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A93226" />
            <stop offset="60%" stopColor="#7B1F13" />
            <stop offset="100%" stopColor="#4A1007" />
          </linearGradient>

          {/* Subtle Inner Glow */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FFE8A3" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Hexagonal Isometric Frame */}
        <polygon 
          points="200,30 360,122 360,308 200,400 40,308 40,122" 
          fill="none" 
          stroke="#CBA344" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />

        {/* TOP FACE */}
        <polygon 
          points="200,45 345,128 200,212 55,128" 
          fill="url(#topFaceGrad)" 
          stroke="#F8F3E6" 
          strokeWidth="5" 
          strokeLinejoin="round"
        />

        {/* LEFT FACE */}
        <polygon 
          points="55,128 200,212 200,378 55,294" 
          fill="url(#leftFaceGrad)" 
          stroke="#F8F3E6" 
          strokeWidth="5" 
          strokeLinejoin="round"
        />

        {/* RIGHT FACE */}
        <polygon 
          points="345,128 200,212 200,378 345,294" 
          fill="url(#rightFaceGrad)" 
          stroke="#F8F3E6" 
          strokeWidth="5" 
          strokeLinejoin="round"
        />

        {/* LEFT "B" LETTER (Isometric Perspective) */}
        <g transform="matrix(0.866, 0.5, 0, 0.95, 68, 142)">
          {/* Main vertical backbone */}
          <rect x="25" y="15" width="22" height="110" rx="4" fill="#F8F3E6" stroke="#2C160B" strokeWidth="2.5" />
          {/* Top Upper Loop */}
          <path 
            d="M45,15 H80 C102,15 102,65 80,65 H45 Z" 
            fill="#F8F3E6" 
            stroke="#2C160B" 
            strokeWidth="2.5" 
          />
          {/* Inner Top Hole */}
          <path 
            d="M47,28 H75 C88,28 88,52 75,52 H47 Z" 
            fill="url(#leftFaceGrad)" 
            stroke="#2C160B" 
            strokeWidth="2" 
          />
          {/* Bottom Lower Loop */}
          <path 
            d="M45,62 H86 C110,62 110,125 86,125 H45 Z" 
            fill="#F8F3E6" 
            stroke="#2C160B" 
            strokeWidth="2.5" 
          />
          {/* Inner Bottom Hole */}
          <path 
            d="M47,75 H80 C94,75 94,112 80,112 H47 Z" 
            fill="url(#leftFaceGrad)" 
            stroke="#2C160B" 
            strokeWidth="2" 
          />
        </g>

        {/* RIGHT "B" LETTER (Isometric Perspective) */}
        <g transform="matrix(0.866, -0.5, 0, 0.95, 218, 226)">
          {/* Main vertical backbone */}
          <rect x="25" y="15" width="22" height="110" rx="4" fill="#F8F3E6" stroke="#2C160B" strokeWidth="2.5" />
          {/* Top Upper Loop */}
          <path 
            d="M45,15 H80 C102,15 102,65 80,65 H45 Z" 
            fill="#F8F3E6" 
            stroke="#2C160B" 
            strokeWidth="2.5" 
          />
          {/* Inner Top Hole */}
          <path 
            d="M47,28 H75 C88,28 88,52 75,52 H47 Z" 
            fill="url(#rightFaceGrad)" 
            stroke="#2C160B" 
            strokeWidth="2" 
          />
          {/* Bottom Lower Loop */}
          <path 
            d="M45,62 H86 C110,62 110,125 86,125 H45 Z" 
            fill="#F8F3E6" 
            stroke="#2C160B" 
            strokeWidth="2.5" 
          />
          {/* Inner Bottom Hole */}
          <path 
            d="M47,75 H80 C94,75 94,112 80,112 H47 Z" 
            fill="url(#rightFaceGrad)" 
            stroke="#2C160B" 
            strokeWidth="2" 
          />
        </g>

        {/* Subtle Edge Highlights */}
        <line x1="200" y1="45" x2="200" y2="212" stroke="#FFF" strokeWidth="3" opacity="0.6" />
        <line x1="55" y1="128" x2="200" y2="212" stroke="#FFF" strokeWidth="2" opacity="0.4" />
        <line x1="345" y1="128" x2="200" y2="212" stroke="#FFF" strokeWidth="2" opacity="0.4" />
      </svg>
    </div>
  );
}

export default BloomBoxCube;
