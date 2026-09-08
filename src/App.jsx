import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EventStoryline from "./components/EventStoryline";
import ChequeForm from "./components/ChequeForm";
import SuccessReceipt from "./components/SuccessReceipt";
import { submitRegistration } from "./services/googleSheets";
import { EVENT_DETAILS } from "./config/constants";
import { sounds } from "./utils/audio";

export function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await submitRegistration(formData);

      if (result.success) {
        setRegisteredData(result.data || formData);
        setSubmissionSuccess(true);
        // Scroll to success receipt
        setTimeout(() => {
          const el = document.getElementById("registration-cheque");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setServerError(result.message || "Failed to complete registration. Please check your network and try again.");
      }
    } catch (err) {
      setServerError("An unexpected network error occurred while submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(false);
    setRegisteredData(null);
    setServerError(null);
    sounds.playFrictionTick(0.2);
    setTimeout(() => {
      const el = document.getElementById("registration-cheque");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center text-[#F8F3E6] selection:bg-[#C85A17] selection:text-[#FFF]">
      {/* Top institution header with sound toggle */}
      <Header isMuted={isMuted} setIsMuted={setIsMuted} />

      {/* Main Content (Centered & Full Width) */}
      <main className="w-full flex-1 flex flex-col items-center">
        {/* 1. Hero / Opening Experience */}
        <HeroSection />

        {/* 2. Visual Storytelling / 5 Waypoints */}
        <EventStoryline />

        {/* 3. The Registration Cheque / Success Experience */}
        <div id="registration-cheque" className="w-full flex flex-col items-center scroll-mt-4">
          {submissionSuccess ? (
            <SuccessReceipt 
              registrationData={registeredData} 
              onReset={handleReset} 
            />
          ) : (
            <ChequeForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
              serverError={serverError} 
            />
          )}
        </div>
      </main>

      {/* Minimalistic & Editorial Footer */}
      <footer className="w-full relative z-20 border-t border-[#8B2616]/40 bg-[#100905] py-10 sm:py-12 px-4 text-center text-xs text-[#DFC99E]/80 flex flex-col items-center">
        <div className="page-container flex flex-col items-center gap-3.5">
          <div className="flex items-center gap-2 text-[#E5C368] font-cinzel font-bold text-sm sm:text-base tracking-widest">
            <span>CONNECTIFY'26</span>
            <span>•</span>
            <span>BLOOMBOX E-CELL</span>
          </div>

          <p className="text-xs sm:text-sm text-[#DFC99E]/75 max-w-lg mx-auto leading-relaxed">
            The Official Entrepreneurship Induction for Newly Admitted Students • K. J. Somaiya College of Engineering, Vidyavihar
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-[#CBA344]/90 mt-1">
            <span>DATE: 22 SEPT 2026</span>
            <span>•</span>
            <span>TIME: 4:00 PM</span>
            <span>•</span>
            <span>VENUE: ROOM B-113</span>
          </div>

          <p className="text-[11px] text-[#DFC99E]/50 mt-3">
            © 2026 BloomBox KJSCE. All rights reserved. Built with pride for student entrepreneurs.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
