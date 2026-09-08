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
              <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="2" />
                <polygon points="50,10 56,43 90,50 56,57 50,90 44,57 10,50 44,43" fill="#8B2616" stroke="currentColor" strokeWidth="2" />
                <polygon points="50,17 53,45 83,50 53,55 50,83 47,55 17,50 47,45" fill="#C85A17" />
                <circle cx="50" cy="50" r="6" fill="#F8F3E6" stroke="#2C160B" strokeWidth="2" />
              </svg>
            </span>
            <span>NNECTIFY</span><sup>'26</sup>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={250}><p className="hero-tagline">{EVENT_DETAILS.tagline}</p></ScrollReveal>
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
          <Navigation className="w-5 h-5 rotate-45" aria-hidden="true" />
          <span>Begin your journey — register now</span>
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default HeroSection;
