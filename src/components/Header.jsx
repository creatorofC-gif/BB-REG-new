import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "../utils/audio";

export function Header({ isMuted, setIsMuted }) {
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.isMuted = nextMuted;
    if (!nextMuted) {
      sounds.playFrictionTick(0.3);
    }
  };

  return (
    <header className="relative z-30 w-full border-b border-[#CBA344]/30 bg-[#140C07]/95 backdrop-blur-md">
      {/* Topmost Institution Ribbon with page-container */}
      <div className="page-container py-3 flex flex-wrap items-center justify-between text-xs tracking-wider text-[#DFC99E]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-[#E5C368]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C85A17] border border-[#E5C368]"></span>
            <span className="font-cinzel tracking-wider text-xs sm:text-sm font-bold">SOMAIYA VIDYAVIHAR UNIVERSITY</span>
          </div>
          <span className="hidden md:inline text-[#CBA344]/60">•</span>
          <span className="hidden md:inline text-xs text-[#DFC99E]/85">K. J. Somaiya College of Engineering</span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5 text-[#E5C368]/90">
            <span className="hidden sm:inline text-xs font-medium text-[#DFC99E]/75">E-Cell</span>
            <span className="font-bold text-[#E5C368] font-cinzel tracking-widest px-2 py-0.5 rounded bg-[#8B2616]/50 border border-[#CBA344]/40 shadow-sm">
              BloomBox
            </span>
          </div>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="flex items-center gap-1.5 text-xs text-[#DFC99E] hover:text-[#E5C368] px-2.5 py-1 rounded bg-[#2C160B] border border-[#CBA344]/40 hover:border-[#E5C368] transition-colors shadow-sm"
            title={isMuted ? "Sound is muted" : "Tactile sounds active"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#E5C368]" />}
            <span className="text-[11px] hidden sm:inline uppercase font-mono tracking-wider font-semibold">
              {isMuted ? "Muted" : "Audio On"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
