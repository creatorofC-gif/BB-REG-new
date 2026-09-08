import React from "react";
import { Calendar, Clock, MapPin, ArrowDown, Navigation } from "lucide-react";
import { EVENT_DETAILS } from "../config/constants";
import BloomBoxCube from "./BloomBoxCube";
import ScrollReveal from "./ScrollReveal";

export function HeroSection({ onRegisterClick }) {
  const handleCtaClick = (event) => {
    event.preventDefault();
    if (onRegisterClick) return onRegisterClick();
    document.getElementById("registration-cheque")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const details = [
    { label: "Date", value: EVENT_DETAILS.date, Icon: Calendar },
    { label: "Time", value: EVENT_DETAILS.time, Icon: Clock },
    { label: "Venue", value: `Room ${EVENT_DETAILS.venue}`, Icon: MapPin }
  ];

  return (
    <section className="section-hero relative flex flex-col items-center justify-center">
      <div className="hero-glow" aria-hidden="true" />
      <div className="page-container hero-content relative z-10 flex flex-col items-center text-center">
        <ScrollReveal delay={0} className="hero-logo" aria-label="BloomBox logo">
          <BloomBoxCube className="w-32 h-32 sm:w-40 sm:h-40" />
        </ScrollReveal>
        <ScrollReveal delay={90}><p className="hero-presenter">BloomBox presents</p></ScrollReveal>
        <ScrollReveal delay={170}>
          <h1 className="hero-title hero-title-compass">
            <span>C</span>
            <span className="title-compass" aria-label="O">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* Outer Fine Dotted Ring */}
                <circle cx="50" cy="50" r="48" stroke="#CBA344" strokeWidth="0.8" strokeDasharray="1.2 2" />
                
                {/* Outer Solid Ring */}
                <circle cx="50" cy="50" r="45.5" stroke="#E5C368" strokeWidth="1.2" />
                
                {/* Degree Scale Ring */}
                <circle cx="50" cy="50" r="41.5" stroke="#CBA344" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="39" stroke="#E5C368" strokeWidth="0.6" strokeDasharray="1 1" />
                
                {/* Inner Track Ring */}
                <circle cx="50" cy="50" r="33" stroke="#CBA344" strokeWidth="0.8" />
                
                {/* Degree Ticks */}
                <g stroke="#CBA344" strokeWidth="0.75" opacity="0.85">
                  <line x1="50" y1="41.5" x2="50" y2="45.5" />
                  <line x1="50" y1="54.5" x2="50" y2="58.5" />
                  <line x1="41.5" y1="50" x2="45.5" y2="50" />
                  <line x1="54.5" y1="50" x2="58.5" y2="50" />
                  <line x1="56.2" y1="39.2" x2="54.2" y2="42.7" />
                  <line x1="43.8" y1="60.8" x2="45.8" y2="57.3" />
                  <line x1="60.8" y1="43.8" x2="57.3" y2="45.8" />
                  <line x1="39.2" y1="56.2" x2="42.7" y2="54.2" />
                  <line x1="60.8" y1="56.2" x2="57.3" y2="54.2" />
                  <line x1="39.2" y1="43.8" x2="42.7" y2="45.8" />
                  <line x1="56.2" y1="60.8" x2="54.2" y2="57.3" />
                  <line x1="43.8" y1="39.2" x2="45.8" y2="42.7" />
                </g>

                {/* Cardinal & Ordinal Direction Labels */}
                <text x="50" y="7.5" textAnchor="middle" dominantBaseline="central" fill="#F8F3E6" fontFamily="Cinzel, serif" fontWeight="900" fontSize="5.5">N</text>
                <text x="50" y="92.5" textAnchor="middle" dominantBaseline="central" fill="#E5C368" fontFamily="Cinzel, serif" fontWeight="900" fontSize="5.5">S</text>
                <text x="92.5" y="50" textAnchor="middle" dominantBaseline="central" fill="#E5C368" fontFamily="Cinzel, serif" fontWeight="900" fontSize="5.5">E</text>
                <text x="7.5" y="50" textAnchor="middle" dominantBaseline="central" fill="#E5C368" fontFamily="Cinzel, serif" fontWeight="900" fontSize="5.5">W</text>
                
                <text x="79" y="21" textAnchor="middle" dominantBaseline="central" fill="#CBA344" fontFamily="Cinzel, serif" fontWeight="700" fontSize="3.2">NE</text>
                <text x="79" y="79" textAnchor="middle" dominantBaseline="central" fill="#CBA344" fontFamily="Cinzel, serif" fontWeight="700" fontSize="3.2">SE</text>
                <text x="21" y="79" textAnchor="middle" dominantBaseline="central" fill="#CBA344" fontFamily="Cinzel, serif" fontWeight="700" fontSize="3.2">SW</text>
                <text x="21" y="21" textAnchor="middle" dominantBaseline="central" fill="#CBA344" fontFamily="Cinzel, serif" fontWeight="700" fontSize="3.2">NW</text>

                {/* Intermediate Minor Points */}
                <g opacity="0.9">
                  <polygon points="50,50 50,22 53.5,37" fill="#8B2616" />
                  <polygon points="50,50 50,22 46.5,37" fill="#C85A17" />
                  <polygon points="50,50 50,78 46.5,63" fill="#8B2616" />
                  <polygon points="50,50 50,78 53.5,63" fill="#C85A17" />
                  <polygon points="50,50 78,50 63,46.5" fill="#8B2616" />
                  <polygon points="50,50 78,50 63,53.5" fill="#C85A17" />
                  <polygon points="50,50 22,50 37,53.5" fill="#8B2616" />
                  <polygon points="50,50 22,50 37,46.5" fill="#C85A17" />
                </g>

                {/* Ordinal 4-Point Medium Star (NE, SE, SW, NW) */}
                <g>
                  <polygon points="50,50 72,28 50,37" fill="#E5C368" />
                  <polygon points="50,50 72,28 63,50" fill="#8B2616" />
                  <polygon points="50,50 72,72 63,50" fill="#E5C368" />
                  <polygon points="50,50 72,72 50,63" fill="#8B2616" />
                  <polygon points="50,50 28,72 50,63" fill="#E5C368" />
                  <polygon points="50,50 28,72 37,50" fill="#8B2616" />
                  <polygon points="50,50 28,28 37,50" fill="#E5C368" />
                  <polygon points="50,50 28,28 50,37" fill="#8B2616" />
                </g>

                {/* Cardinal 4-Point Dominant Star (N, S, E, W) */}
                <g>
                  <polygon points="50,10 50,50 43,50" fill="#E5C368" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="50,10 50,50 57,50" fill="#8B2616" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="50,90 50,50 57,50" fill="#E5C368" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="50,90 50,50 43,50" fill="#8B2616" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="90,50 50,50 50,43" fill="#E5C368" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="90,50 50,50 50,57" fill="#8B2616" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="10,50 50,50 50,57" fill="#E5C368" stroke="#2C160B" strokeWidth="0.4" />
                  <polygon points="10,50 50,50 50,43" fill="#8B2616" stroke="#2C160B" strokeWidth="0.4" />
                </g>

                {/* Inner Accent Rings */}
                <circle cx="50" cy="50" r="16" stroke="#E5C368" strokeWidth="0.75" fill="none" opacity="0.9" />
                <circle cx="50" cy="50" r="11" stroke="#CBA344" strokeWidth="0.6" strokeDasharray="1.5 1.5" fill="none" />

                {/* Center Brass Hub */}
                <circle cx="50" cy="50" r="6.5" fill="#2C160B" stroke="#E5C368" strokeWidth="1" />
                <circle cx="50" cy="50" r="4.5" fill="#8B2616" stroke="#CBA344" strokeWidth="0.75" />
                <circle cx="50" cy="50" r="2.2" fill="#F8F3E6" stroke="#2C160B" strokeWidth="0.5" />
              </svg>
            </span>
            <span>NNECTIFY</span><sup>'26</sup>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={250} className="text-center flex flex-col items-center w-full">
          <p className="hero-tagline text-center mx-auto">{EVENT_DETAILS.tagline}</p>
        </ScrollReveal>
        <ScrollReveal delay={330} className="hero-introduction">
          <h2>{EVENT_DETAILS.heroHeadline}</h2>
          <p>{EVENT_DETAILS.subtext}</p>
        </ScrollReveal>
        <ScrollReveal delay={410} className="event-details" aria-label="Event details">
          {details.map(({ label, value, Icon }) => (
            <div className="event-detail" key={label}>
              <Icon aria-hidden="true" />
              <div><span>{label}</span><strong>{value}</strong></div>
            </div>
          ))}
        </ScrollReveal>
        <ScrollReveal delay={490}>
          <a href="#registration-cheque" onClick={handleCtaClick} className="btn-vintage hero-cta">
            <Navigation className="w-5 h-5 rotate-45 shrink-0" aria-hidden="true" />
            <span>Begin your journey — register now</span>
            <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default HeroSection;
