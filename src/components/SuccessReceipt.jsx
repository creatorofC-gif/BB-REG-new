import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Compass,
  Mail
} from "lucide-react";
import GreekBorder from "./GreekBorder";

export function SuccessReceipt({ registrationData, onReset }) {
  useEffect(() => {
    // Trigger celebratory gold and terracotta confetti
    try {
      const end = Date.now() + 1.2 * 1000;
      const colors = ["#C85A17", "#D4AF37", "#8B2616", "#F8F3E6", "#E5C368"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.warn("Confetti skipped:", e);
    }
  }, []);

  const { fullName, email, contact, year, branch } = registrationData || {};

  return (
    <section className="section-cheque relative flex flex-col items-center justify-center z-20">
      <div className="page-container success-layout flex flex-col items-center text-center">
        
        <GreekBorder className="mb-8 sm:mb-12 opacity-85 max-w-2xl" />
        
        {/* Animated Celebration Title */}
        <h2 className="success-title font-cinzel font-black text-[#E5C368] tracking-widest uppercase drop-shadow-2xl">
          YOU'RE IN.
        </h2>
        <p className="success-subtitle font-cursive text-[#DFC99E] font-normal">
          Your journey towards entrepreneurship begins on 22 September.
        </p>

        {/* PROCESSED REGISTRATION CERTIFICATE / CHEQUE VOUCHER */}
        <div className="success-receipt cheque-leaf security-pattern rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xl border-2 border-[#CBA344] relative overflow-hidden text-left w-full">
          
          {/* Official Processed Stamp (Slam Animation) */}
          <div className="success-stamp animate-stamp-slam pointer-events-none">
            <div className="registered-stamp bg-[#F7F1E1]/90 backdrop-blur-sm">
              <div className="text-xs tracking-widest text-[#8B2616]">BLOOMBOX E-CELL</div>
              <div className="text-xl sm:text-2xl font-black text-[#7B1F13]">OFFICIALLY ADMITTED</div>
              <div className="text-xs tracking-wider text-[#8B2616]">CONNECTIFY '26 • B-113</div>
            </div>
          </div>

          {/* Header of Receipt */}
          <div className="success-receipt-header border-b-2 border-[#8B2616]/30 pb-6 mb-7">
            <div className="flex items-center gap-4">
              <Compass className="w-10 h-10 text-[#C85A17] animate-compass" />
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B2616] block">
                  OFFICIAL VOYAGE PASS & PROCESSED CHEQUE
                </span>
                <h3 className="font-cinzel text-2xl sm:text-4xl font-black text-[#2C160B]">
                  CONNECTIFY'26
                </h3>
              </div>
            </div>
          </div>

          {/* Student Details Grid */}
          <div className="success-details grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 mb-8 text-left">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#EBDDBE]/75 border border-[#CBA344]/50 shadow-sm">
              <span className="text-xs font-cinzel font-bold text-[#7B1F13] uppercase tracking-wider block">
                ADMITTED EXPLORER
              </span>
              <span className="font-sans text-xl font-bold text-[#2C160B] block mt-1">
                {fullName || "Registered Student"}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#EBDDBE]/75 border border-[#CBA344]/50 shadow-sm">
              <span className="text-xs font-cinzel font-bold text-[#7B1F13] uppercase tracking-wider block">
                SOMAIYA ID
              </span>
              <span className="font-mono text-base font-semibold text-[#2C160B] block mt-1 break-all">
                {email || "student@somaiya.edu"}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#EBDDBE]/75 border border-[#CBA344]/50 shadow-sm">
              <span className="text-xs font-cinzel font-bold text-[#7B1F13] uppercase tracking-wider block">
                ACADEMIC YEAR & BRANCH
              </span>
              <span className="font-sans text-base font-semibold text-[#2C160B] block mt-1">
                {year || "First Year"} • {branch || "Engineering"}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#EBDDBE]/75 border border-[#CBA344]/50 shadow-sm">
              <span className="text-xs font-cinzel font-bold text-[#7B1F13] uppercase tracking-wider block">
                CONTACT NUMBER
              </span>
              <span className="font-mono text-base font-semibold text-[#2C160B] block mt-1">
                +91 {contact || "9876543210"}
              </span>
            </div>
          </div>

          {/* Event Schedule Reminders */}
          <div className="success-logistics my-8 p-6 sm:p-7 md:p-8 rounded-2xl bg-[#2C160B] text-[#F8F3E6] border border-[#CBA344] shadow-xl">
            <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C368] tracking-widest uppercase mb-5">
              EVENT LOGISTICS & VENUE BRIEFING
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm sm:text-base">
              <div className="flex items-center gap-3.5">
                <Calendar className="w-6 h-6 text-[#FF9955] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#DFC99E]/70 font-mono">DATE</div>
                  <div className="font-bold font-cinzel text-base sm:text-lg">22 SEPT 2026</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Clock className="w-6 h-6 text-[#FF9955] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#DFC99E]/70 font-mono">TIME</div>
                  <div className="font-bold font-cinzel text-base sm:text-lg">4:00 PM ONWARDS</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <MapPin className="w-6 h-6 text-[#FF9955] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#DFC99E]/70 font-mono">VENUE</div>
                  <div className="font-bold font-cinzel text-base sm:text-lg">ROOM B-113, KJSCE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation and next action */}
          <div className="success-actions flex flex-wrap items-center justify-between gap-4 pt-8 border-t-2 border-[#8B2616]/30">
            <div className="flex items-center gap-3 text-sm sm:text-base text-[#5C4736]">
              <Mail className="w-5 h-5 text-[#8B2616] shrink-0" />
              <span>A confirmation has been sent to <strong>{email}</strong>.</span>
            </div>

            <button
              onClick={onReset}
              className="text-xs sm:text-sm md:text-base font-cinzel font-bold text-[#7B1F13] hover:text-[#561108] underline px-4 py-2 transition-colors ml-auto cursor-pointer whitespace-nowrap"
            >
              Register Another Student →
            </button>
          </div>
        </div>

        <GreekBorder className="mt-12 sm:mt-16 opacity-85 max-w-2xl" />
      </div>
    </section>
  );
}

export default SuccessReceipt;
