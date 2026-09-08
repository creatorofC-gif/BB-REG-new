import React, { useEffect, useRef, useState } from "react";
import { WAYPOINTS } from "../config/constants";
import { Compass, Lightbulb, Rocket, Target, Users, Award, Ship } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WAYPOINT_ICONS = [
  <Lightbulb key="ideate" className="w-5 h-5 text-[#E5C368]" />,
  <Rocket key="innovate" className="w-5 h-5 text-[#FF9955]" />,
  <Target key="validate" className="w-5 h-5 text-[#E5C368]" />,
  <Users key="strategize" className="w-5 h-5 text-[#FF9955]" />,
  <Award key="launch" className="w-5 h-5 text-[#E5C368]" />
];

export function EventStoryline() {
  const routeRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const route = routeRef.current;
    if (!route) return undefined;

    const updateBoatPosition = () => {
      const bounds = route.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.58;
      const distance = bounds.height || 1;
      const progress = Math.min(1, Math.max(0, (viewportCenter - bounds.top) / distance));
      setActiveStep(Math.min(4, Math.floor(progress * 5)));
    };

    updateBoatPosition();
    window.addEventListener("scroll", updateBoatPosition, { passive: true });
    window.addEventListener("resize", updateBoatPosition);
    return () => {
      window.removeEventListener("scroll", updateBoatPosition);
      window.removeEventListener("resize", updateBoatPosition);
    };
  }, []);

  return (
    <section className="section-storyline relative flex flex-col items-center justify-center z-10">
      <div className="page-container text-center flex flex-col items-center">
        {/* Section Headline */}
        <ScrollReveal className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#E5C368] font-bold mb-3">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '24s' }} />
            <span>THE ENTREPRENEURIAL NAVIGATION MAP</span>
          </div>
          <h3 className="font-cinzel text-3xl sm:text-5xl font-black text-[#F8F3E6] tracking-wide mt-2">
            5 Waypoints Towards Startup Success
          </h3>
          <p className="font-cursive text-2xl sm:text-4xl text-[#E5C368] max-w-xl mx-auto mt-3 font-normal">
            Your pathway from initial college sparks to venture launch.
          </p>
        </ScrollReveal>

        {/* 5 Waypoint Cards - Centered & Spacious */}
        <div
          ref={routeRef}
          className="journey-route grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-7 w-full max-w-5xl"
          style={{ "--journey-position": `${10 + activeStep * 20}%` }}
        >
          <div className="journey-waterline" aria-hidden="true" />
          <div className="journey-boat" aria-label={`Journey boat at step ${activeStep + 1} of 5`}>
            <Ship />
          </div>
          {WAYPOINTS.map((wp, index) => (
            <div
              key={wp.step}
              className={`journey-step relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#2A160A]/95 border-2 border-[#CBA344]/40 hover:border-[#E5C368] hover:bg-[#341B0D]/95 hover:scale-[1.03] shadow-xl group text-left ${index <= activeStep ? "is-revealed" : ""}`}
            >
              <div>
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#8B2616]/75 text-[#F8F3E6] border border-[#CBA344]/40">
                    STEP {wp.step}
                  </span>
                  <div className="p-2 rounded-full bg-[#140C07] border border-[#CBA344]/40 group-hover:scale-110 transition-transform shadow-inner">
                    {WAYPOINT_ICONS[index]}
                  </div>
                </div>

                <h4 className="font-cinzel font-bold text-lg sm:text-xl text-[#E5C368] tracking-wider mb-2">
                  {wp.name}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#DFC99E]/85 leading-relaxed font-sans mt-3">
                {wp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventStoryline;
