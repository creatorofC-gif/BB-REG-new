import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Scissors } from "lucide-react";

export function TearToSubmit({ onTearComplete, isSubmitting, isValid, onValidateBeforeTear }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [keyHoldProgress, setKeyHoldProgress] = useState(0);
  const dragStartXRef = useRef(0);
  const keyIntervalRef = useRef(null);
  const containerRef = useRef(null);

  const TEAR_THRESHOLD = 95; // Pixels of rightward drag required to trigger tear

  // Handle Drag Start (Mouse or Touch)
  const handlePointerDown = (e) => {
    if (isSubmitting || isTorn) return;

    // First validate the form
    const valid = onValidateBeforeTear ? onValidateBeforeTear() : isValid;
    if (!valid) {
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(100);
      }
      return;
    }

    setIsDragging(true);
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  // Handle Pointer Move
  const handlePointerMove = (e) => {
    if (!isDragging || isSubmitting || isTorn) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartXRef.current;

    if (deltaX > 0) {
      // Apply slight damping resistance
      const dampedX = Math.min(deltaX * 0.85, TEAR_THRESHOLD + 25);
      setDragX(dampedX);

      // Check if threshold reached
      if (dampedX >= TEAR_THRESHOLD) {
        triggerTear();
      }
    } else {
      setDragX(0);
    }
  };

  // Execute the official tear
  const triggerTear = () => {
    setIsDragging(false);
    setIsTorn(true);
    setDragX(TEAR_THRESHOLD + 30);

    // Haptic feedback
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 30, 80]);
    }

    // Notify parent to process submission
    setTimeout(() => {
      onTearComplete();
    }, 450);
  };

  // Accessible Keyboard Hold Interaction (Enter or Space)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isSubmitting || isTorn) return;

      const valid = onValidateBeforeTear ? onValidateBeforeTear() : isValid;
      if (!valid) {
        return;
      }

      if (!keyIntervalRef.current) {
        keyIntervalRef.current = setInterval(() => {
          setKeyHoldProgress((prev) => {
            if (prev >= 100) {
              clearInterval(keyIntervalRef.current);
              keyIntervalRef.current = null;
              triggerTear();
              return 100;
            }
            return prev + 12;
          });
        }, 50);
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (keyIntervalRef.current) {
        clearInterval(keyIntervalRef.current);
        keyIntervalRef.current = null;
      }
      if (keyHoldProgress < 100) {
        setKeyHoldProgress(0);
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragX(0);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      if (keyIntervalRef.current) clearInterval(keyIntervalRef.current);
    };
  }, [isDragging]);

  const tearPercentage = Math.min(100, Math.round((dragX / TEAR_THRESHOLD) * 100));

  return (
    <div 
      ref={containerRef}
      className="relative select-none w-full"
      onPointerMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Perforated Tear Line with Notches */}
      <div className="tear-perforation relative my-2">
        <div className="tear-notch-left" />
        <div className="tear-line-dashed" />
        <div className="tear-notch-right" />

        {/* Small Perforation Label in Center */}
        <div className="absolute bg-[#F7F1E1] px-2 sm:px-3 py-0.5 border border-[#8B2616]/30 text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#7B1F13] flex items-center gap-1 sm:gap-1.5 shadow-sm max-w-[90%] truncate">
          <Scissors className="w-3 h-3 rotate-90 shrink-0" />
          <span className="truncate">PERFORATION LINE • TEAR ALONG EDGE</span>
        </div>
      </div>

      {/* Visual Instruction & Prompt */}
      <div className="text-center pt-2 pb-1">
        <p className="font-editorial italic text-base sm:text-lg text-[#5C4736] font-semibold">
          Ready to begin your journey?
        </p>
        <p className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-widest mt-0.5">
          SWIPE RIGHT TO TEAR & SUBMIT
        </p>
      </div>

      {/* Tearable Stub / Pull Tab Handle */}
      <div 
        className={`relative mt-2 p-4 rounded-b-lg border-t border-dashed border-[#8B2616]/40 transition-transform ${
          isDragging ? "cursor-grabbing duration-75" : "cursor-grab duration-300"
        } ${isTorn ? "animate-torn-away pointer-events-none" : ""}`}
        style={{
          transform: `translateX(${dragX}px) ${dragX > 0 ? `rotate(${dragX * 0.01}deg)` : ''}`,
          backgroundColor: isDragging ? "#EEDDBB" : "#F1E4C9",
          boxShadow: isDragging ? "0 15px 30px rgba(44, 22, 11, 0.35)" : "0 4px 12px rgba(44, 22, 11, 0.12)"
        }}
        onPointerDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        tabIndex={0}
        role="button"
        aria-label="Swipe right or hold Enter to tear cheque and submit registration"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {/* Visual Handle with Grips & Arrows */}
        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
          {/* Grip Lines */}
          <div className="flex gap-1">
            <span className="w-8 h-1 bg-[#8B2616]/30 rounded-full" />
            <span className="w-8 h-1 bg-[#8B2616]/30 rounded-full" />
            <span className="w-8 h-1 bg-[#8B2616]/30 rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-2 mt-1 max-w-full">
            <ArrowRight className={`w-4 h-4 text-[#8B2616] shrink-0 ${isDragging ? "scale-125" : "animate-pulse"}`} />
            <span className="font-cinzel text-[11px] sm:text-sm font-bold tracking-wider sm:tracking-widest text-[#2C160B] max-w-full leading-tight">
              {isDragging 
                ? `TEARING... ${tearPercentage}%` 
                : isSubmitting 
                  ? "PROCESSING CHEQUE..." 
                  : "PULL RIGHT TO TEAR CHEQUE"}
            </span>
            <ArrowRight className={`w-4 h-4 text-[#8B2616] shrink-0 ${isDragging ? "scale-125" : "animate-pulse"}`} />
          </div>

          {/* Progress bar indication when dragging or holding key */}
          {(dragX > 0 || keyHoldProgress > 0) && (
            <div className="w-48 h-1.5 bg-[#DFC99E] rounded-full overflow-hidden mt-1 border border-[#8B2616]/20">
              <div 
                className="h-full bg-gradient-to-r from-[#D4621E] to-[#7B1F13] transition-all"
                style={{ width: `${Math.max(tearPercentage, keyHoldProgress)}%` }}
              />
            </div>
          )}

          {/* Accessible hint */}
          <span className="text-[10px] text-[#5C4736]/80 font-mono tracking-tight mt-0.5">
            [Touch & Drag Right or Hold Space/Enter to Submit]
          </span>
        </div>
      </div>

      {/* Accessible Direct Button Fallback (for Screen Readers & Assistive Devices) */}
      <div className="mt-3 text-center sm:hidden">
        <button
          type="button"
          onClick={() => {
            const valid = onValidateBeforeTear ? onValidateBeforeTear() : isValid;
            if (valid) triggerTear();
          }}
          className="text-xs text-[#7B1F13] underline font-semibold p-2"
        >
          Can't swipe? Tap here to validate & submit
        </button>
      </div>
    </div>
  );
}

export default TearToSubmit;
