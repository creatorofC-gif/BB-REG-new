import React from "react";
import { Calendar, Clock, MapPin, ArrowDown, Sparkles, Navigation } from "lucide-react";
import { EVENT_DETAILS } from "../config/constants";
import GreekBorder from "./GreekBorder";
import BloomBoxCube from "./BloomBoxCube";
import { sounds } from "../utils/audio";

export function HeroSection({ onRegisterClick }) {
  const handleCtaClick = (e) => {
    e.preventDefault();
    sounds.playFrictionTick(0.2);
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      const el = document.getElementById("registration-cheque");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section-hero relative flex flex-col items-center justify-center">
      {/* Radiant ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] pointer-events-none opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(200, 90, 23, 0.5) 0%, rgba(123, 31, 19, 0.28) 55%, transparent 75%)"
        }}
      />

      <div className="page-container text-center relative z-10 flex flex-col items-center">
        
        {/* Top Decorative Greek Key Border */}
        <GreekBorder className="mb-10 sm:mb-14 opacity-85 max-w-4xl" />

        {/* Presenter Subtitle Ribbon */}
        <div className="inline-flex items-center gap-2.5 px-6 py-2 mb-6 sm:mb-8 rounded-full bg-[#3D2010]/95 border border-[#CBA344]/70 shadow-2xl">
          <Sparkles className="w-4 h-4 text-[#E5C368]" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#F8F3E6] font-cinzel">
            BLOOMBOX PRESENTS
          </span>
          <Sparkles className="w-4 h-4 text-[#E5C368]" />
        </div>

        {/* Main Event Title: CONNECTIFY'26 with Compass 'O' */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider text-[#F8F3E6] my-4 sm:my-6 drop-shadow-2xl flex items-center justify-center flex-wrap">
          <span>C</span>
          {/* Compass Rose for O */}
          <span className="relative inline-flex items-center justify-center mx-2 sm:mx-4 text-[#E5C368]">
            <svg 
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-compass drop-shadow-xl" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" stroke="#CBA344" strokeWidth="2.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" stroke="#E5C368" strokeWidth="2" />
              {/* Star / Compass Points */}
              <polygon points="50,8 55,42 92,50 55,58 50,92 45,58 8,50 45,42" fill="#8B2616" stroke="#CBA344" strokeWidth="1.5" />
              <polygon points="50,14 53,44 86,50 53,56 50,86 47,56 14,50 47,44" fill="#C85A17" />
              <circle cx="50" cy="50" r="7" fill="#F8F3E6" stroke="#2C160B" strokeWidth="2.5" />
            </svg>
          </span>
          <span>NNECTI</span>
          <span className="text-[#E5C368]">FY</span>
          <span className="text-[#FF9955] text-4xl sm:text-6xl md:text-7xl lg:text-8xl align-top ml-2">'26</span>
        </h1>

        {/* Premium Cursive / Calligraphic Tagline */}
        <p className="font-cursive text-3xl sm:text-5xl md:text-6xl text-[#E5C368] mt-3 mb-10 sm:mb-14 drop-shadow-md tracking-normal font-normal">
          Start Your Journey Towards Entrepreneurship
        </p>

        {/* BLOOMBOX 3D ISOMETRIC EMBLEM CARD (The official BB cube in theme colors) */}
        <div className="relative my-6 sm:my-10 w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#CBA344]/80 bg-gradient-to-b from-[#8A340D]/40 via-[#2A160A]/95 to-[#142834]/95 shadow-3xl p-8 sm:p-12 md:p-14 flex flex-col items-center text-center transition-all hover:border-[#E5C368]">
          
          {/* Top Vintage Coordinates */}
          <div className="w-full flex items-center justify-between text-xs sm:text-sm text-[#CBA344] font-mono mb-8 pb-4 border-b border-[#CBA344]/30">
            <span>✦ LAT 19.0760° N • KJSCE</span>
            <span className="hidden sm:inline text-[#E5C368] font-bold font-cinzel tracking-widest uppercase">
              THE ENTREPRENEURSHIP CELL
            </span>
            <span>LONG 72.8777° E ✦</span>
          </div>

          {/* THE OFFICIAL BLOOMBOX 3D ISOMETRIC CUBE */}
          <div className="my-4 sm:my-6">
            <BloomBoxCube className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72" />
          </div>

          {/* Editorial Headline & Subtitle */}
          <div className="pt-8 sm:pt-10 w-full text-center border-t border-[#CBA344]/35">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#F8F3E6] font-cinzel tracking-wide">
              {EVENT_DETAILS.heroHeadline}
            </h2>
            <p className="font-editorial italic text-base sm:text-xl text-[#DFC99E] mt-3 max-w-2xl mx-auto leading-relaxed">
              "{EVENT_DETAILS.subtext}"
            </p>
          </div>
        </div>

        {/* Event Logistics Badges (Date, Time, Venue) - Prominent on PC & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl my-12 sm:my-16">
          {/* Date */}
          <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#2A160A]/95 border-2 border-[#CBA344]/55 shadow-2xl text-left transition-all hover:border-[#E5C368] hover:scale-[1.02]">
            <div className="w-14 h-14 rounded-full bg-[#8B2616]/65 border-2 border-[#E5C368] flex items-center justify-center text-[#E5C368] shrink-0 shadow-inner">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#CBA344] font-bold block">DATE</span>
              <p className="text-base sm:text-lg font-bold text-[#F8F3E6] font-cinzel mt-0.5">{EVENT_DETAILS.date.toUpperCase()}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#2A160A]/95 border-2 border-[#CBA344]/55 shadow-2xl text-left transition-all hover:border-[#E5C368] hover:scale-[1.02]">
            <div className="w-14 h-14 rounded-full bg-[#8B2616]/65 border-2 border-[#E5C368] flex items-center justify-center text-[#E5C368] shrink-0 shadow-inner">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#CBA344] font-bold block">TIME</span>
              <p className="text-base sm:text-lg font-bold text-[#F8F3E6] font-cinzel mt-0.5">{EVENT_DETAILS.time.toUpperCase()}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#2A160A]/95 border-2 border-[#CBA344]/55 shadow-2xl text-left transition-all hover:border-[#E5C368] hover:scale-[1.02]">
            <div className="w-14 h-14 rounded-full bg-[#8B2616]/65 border-2 border-[#E5C368] flex items-center justify-center text-[#E5C368] shrink-0 shadow-inner">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#CBA344] font-bold block">VENUE</span>
              <p className="text-base sm:text-lg font-bold text-[#F8F3E6] font-cinzel mt-0.5">ROOM {EVENT_DETAILS.venue}</p>
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col items-center gap-4 my-6">
          <a
            href="#registration-cheque"
            onClick={handleCtaClick}
            className="btn-vintage rounded-2xl text-lg sm:text-xl px-12 sm:px-20 py-5 sm:py-6 shadow-3xl group cursor-pointer"
          >
            <Navigation className="w-6 h-6 text-[#FFE8A3] rotate-45 group-hover:scale-110 transition-transform" />
            <span>BEGIN YOUR JOURNEY — REGISTER NOW</span>
            <ArrowDown className="w-5 h-5 ml-1 animate-bounce" />
          </a>
          <span className="text-xs sm:text-sm text-[#DFC99E]/85 font-mono tracking-wider mt-1">
            Exclusively for KJSCE & Somaiya Vidyavihar University Students
          </span>
        </div>

        {/* Bottom Decorative Border */}
        <GreekBorder className="mt-12 sm:mt-16 opacity-85 max-w-4xl" />
      </div>
    </section>
  );
}

export default HeroSection;
