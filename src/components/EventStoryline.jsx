import React from "react";
import { WAYPOINTS } from "../config/constants";
import { Compass, Lightbulb, Rocket, Target, Users, Award } from "lucide-react";

const WAYPOINT_ICONS = [
  <Lightbulb className="w-5 h-5 text-[#E5C368]" />,
  <Rocket className="w-5 h-5 text-[#FF9955]" />,
  <Target className="w-5 h-5 text-[#E5C368]" />,
  <Users className="w-5 h-5 text-[#FF9955]" />,
  <Award className="w-5 h-5 text-[#E5C368]" />
];

export function EventStoryline() {
  return (
    <section className="section-storyline relative flex flex-col items-center justify-center z-10">
      <div className="page-container text-center flex flex-col items-center">
        {/* Section Headline */}
        <div className="mb-12 sm:mb-16">
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
        </div>

        {/* 5 Waypoint Cards - Centered & Spacious */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 w-full max-w-5xl">
          {WAYPOINTS.map((wp, index) => (
            <div 
              key={wp.step}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#2A160A]/95 border-2 border-[#CBA344]/40 hover:border-[#E5C368] transition-all hover:bg-[#341B0D]/95 hover:scale-[1.03] shadow-xl group text-left"
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
