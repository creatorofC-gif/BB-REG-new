import React from "react";

export function GreekBorder({ className = "" }) {
  return (
    <div className={`w-full overflow-hidden select-none py-1 ${className}`} aria-hidden="true">
      <svg 
        className="w-full h-4 text-[#CBA344] opacity-85" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="repeat-x"
        viewBox="0 0 120 16"
      >
        <pattern id="greek-key" width="30" height="16" patternUnits="userSpaceOnUse">
          {/* Authentic Greek Meander Motif */}
          <path 
            d="M0,2 H28 V14 H16 V6 H22 V10 H20 V8 H18 V12 H26 V4 H2 V14 H0 Z" 
            fill="none" 
            stroke="#CBA344" 
            strokeWidth="1.6" 
          />
          <line x1="0" y1="1" x2="30" y2="1" stroke="#8B2616" strokeWidth="1" />
          <line x1="0" y1="15" x2="30" y2="15" stroke="#8B2616" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="16" fill="url(#greek-key)" />
      </svg>
    </div>
  );
}

export default GreekBorder;
