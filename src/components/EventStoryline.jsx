import React, { useEffect, useRef, useState } from "react";
import { WAYPOINTS } from "../config/constants";
import { 
  Compass, 
  UserCheck, 
  Sparkles, 
  GitMerge, 
  Lightbulb, 
  Rocket, 
  Trophy, 
  ChevronRight,
  Star
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WAYPOINT_ICONS = [
  <UserCheck key="identity" className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C368]" />,
  <Sparkles key="ai" className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF9955]" />,
  <GitMerge key="engineer" className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C368]" />,
  <Lightbulb key="observations" className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF9955]" />,
  <Rocket key="product" className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C368]" />,
  <Trophy key="gamified" className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD700]" />
];

export function EventStoryline() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const coreWaypoints = WAYPOINTS.slice(0, 5);
  const grandFinale = WAYPOINTS[5] || null;

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.75;
      const end = viewportHeight * 0.25;
      const totalDist = rect.height;

      // Calculate progress from 0 to 1 through the container
      const current = start - rect.top;
      const progress = Math.min(1, Math.max(0, current / (totalDist + (start - end))));
      
      setScrollProgress(progress);

      // Determine active step (0 to 5)
      const step = Math.min(5, Math.floor(progress * 6));
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Keep the flowing timeline light within the route bounds.
  const lightProgressPercent = Math.min(95, Math.max(5, scrollProgress * 100));

  return (
    <section className="section-storyline relative flex flex-col items-center justify-center z-10 py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="page-container flex flex-col items-center w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center flex flex-col items-center w-full mb-16 sm:mb-20 lg:mb-28">
          
          <h3 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-[#F8F3E6] tracking-wide text-center leading-tight">
            6 Waypoints of Success
          </h3>

          <p className="font-cursive text-xl sm:text-3xl text-[#DFC99E] max-w-2xl mx--4  mt-3 sm:mt-4 font-normal text-center leading-relaxed">
            Your step-by-step voyage from college spark to high-impact venture.
          </p>
        </ScrollReveal>

        {/* Nautical Voyage Timeline */}
        <div ref={containerRef} className="relative w-full flex flex-col items-center">

          <div className="hidden lg:block relative w-full">
            {/* Central Meridian Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-[#CBA344]/40 to-[#CBA344]/20 pointer-events-none" />
            
            {/* Active Progress Gold Line */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#C85A17] via-[#E5C368] to-[#FF9955] shadow-[0_0_15px_rgba(229,195,104,0.6)] transition-all duration-300 pointer-events-none"
              style={{ height: `${lightProgressPercent}%` }}
            />

           

            {/* Desktop 5 Waypoint Cards with Spacious Gaps */}
            <div className="w-full flex flex-col gap-24 lg:gap-28">
              {coreWaypoints.map((wp, index) => {
                const isEven = index % 2 === 0;
                const isReached = index <= activeStep;

                return (
                  <div
                    key={wp.step}
                    className={`relative flex items-center w-full ${
                      isEven ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Node Anchor Marker at Center */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isReached
                          ? "bg-[#8B2616] border-[#FFD700] text-[#FFD700] shadow-[0_0_16px_rgba(229,195,104,0.7)] scale-110"
                          : "bg-[#140C07] border-[#CBA344]/40 text-[#CBA344]/50 scale-95"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">0{index + 1}</span>
                    </div>

                    {/* Card Body - Generous Padding & Space */}
                    <div className={`w-[45%] ${isEven ? "pr-8" : "pl-8"}`}>
                      <ScrollReveal delay={index * 90}>
                        <div
                          className={`storyline-waypoint-card relative rounded-3xl p-8 lg:p-9 transition-all duration-500 group text-left border ${
                            isReached
                              ? "bg-gradient-to-br from-[#33180B]/95 via-[#231006]/95 to-[#2E1408]/95 border-[#E5C368]/70 shadow-[0_16px_36px_rgba(200,90,23,0.3)] -translate-y-1"
                              : "bg-[#200F06]/85 border-[#CBA344]/30 hover:border-[#E5C368]/60 hover:bg-[#2A150A]/90 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3.5">
                            <h4 className="font-cinzel font-bold text-xl sm:text-2xl text-[#F8F3E6] group-hover:text-[#E5C368] tracking-wide leading-snug transition-colors">
                              {wp.name}
                            </h4>

                            <div className={`storyline-waypoint-icon w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 shadow-inner ${
                              isReached
                                ? "bg-[#8B2616] border-[#FFD700] text-[#FFD700] scale-105 shadow-[0_0_12px_rgba(229,195,104,0.4)]"
                                : "bg-[#140C07] border-[#CBA344]/40 text-[#CBA344]/60 group-hover:border-[#E5C368]"
                            }`}>
                              {WAYPOINT_ICONS[index]}
                            </div>
                          </div>

                          <p className="text-sm sm:text-base text-[#DFC99E]/90 leading-relaxed font-sans">
                            {wp.desc}
                          </p>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* =========================================================================
              MOBILE & TABLET LAYOUT (< 1024px): Spacious Gaps & Generous Internal Box Padding
             ========================================================================= */}
          <div className="lg:hidden w-full flex flex-col gap-12 sm:gap-16">
            {coreWaypoints.map((wp, index) => {
              const isReached = index <= activeStep;

              return (
                <div key={wp.step} className="flex items-stretch gap-5 sm:gap-7 w-full">
                  
                  {/* Left Voyage Track Gutter */}
                  <div className="flex flex-col items-center shrink-0 w-8 sm:w-10 relative">
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                        isReached
                          ? "bg-[#8B2616] border-[#FFD700] text-[#FFD700] shadow-[0_0_12px_rgba(229,195,104,0.6)]"
                          : "bg-[#140C07] border-[#CBA344]/40 text-[#CBA344]/50"
                      }`}
                    >
                      <span className="font-mono text-[10px] sm:text-xs font-bold">0{index + 1}</span>
                    </div>

                    {index < coreWaypoints.length - 1 && (
                      <div className={`w-0.5 flex-1 my-2 transition-all duration-300 ${
                        isReached ? "bg-gradient-to-b from-[#FFD700] to-[#C85A17]" : "bg-[#CBA344]/25"
                      }`} />
                    )}
                  </div>

                  {/* Right Card Container - Spacious with Generous Internal Padding */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`storyline-waypoint-card rounded-2xl p-7 sm:p-8 transition-all duration-300 text-left border ${
                        isReached
                          ? "bg-gradient-to-br from-[#33180B]/95 via-[#231006]/95 to-[#2E1408]/95 border-[#E5C368]/70 shadow-[0_8px_24px_rgba(200,90,23,0.25)]"
                          : "bg-[#200F06]/85 border-[#CBA344]/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3.5">
                        <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#F8F3E6] tracking-wide leading-snug">
                          {wp.name}
                        </h4>

                        <div className={`storyline-waypoint-icon p-2 rounded-xl flex items-center justify-center border shrink-0 ${
                          isReached
                            ? "bg-[#8B2616] border-[#FFD700] text-[#FFD700]"
                            : "bg-[#140C07] border-[#CBA344]/40 text-[#CBA344]/60"
                        }`}>
                          {WAYPOINT_ICONS[index]}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#DFC99E]/85 leading-relaxed font-sans">
                        {wp.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>


          {/* =========================================================================
              GRAND FINALE ROUND (Generous Gap & Spacious Internal Padding)
             ========================================================================= */}
          {grandFinale && (
            <div className="storyline-finale w-full mt-2 sm:mt-32 lg:mt-40 z-10">
              <ScrollReveal delay={200} className="w-full max-w-4xl mx-auto">
                <div className="storyline-finale-card relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#45180B]/95 via-[#2A1107]/98 to-[#4A1607]/95 border-2 border-[#FFD700] shadow-[0_20px_50px_rgba(200,90,23,0.35)] text-left group transition-all duration-300">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-10">
                    <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                      <div className="storyline-finale-trophy p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#8B2616] to-[#5C1408] border-2 border-[#FFD700] text-[#FFD700] shadow-lg shrink-0">
                        <Trophy className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" style={{ animationDuration: '3s' }} />
                      </div>

                      <div>
                        <h4 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-black text-[#F8F3E6] tracking-wide">
                          {grandFinale.name}
                        </h4>

                        <p className="text-xs sm:text-sm lg:text-base text-[#DFC99E]/90 mt-2 max-w-2xl font-sans leading-relaxed">
                          {grandFinale.desc}
                        </p>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default EventStoryline;
