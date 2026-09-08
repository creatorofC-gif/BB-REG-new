import React, { useEffect, useRef, useState } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Compass
} from "lucide-react";
import { YEAR_OPTIONS, BRANCH_OPTIONS } from "../config/constants";
import { validateRegistration } from "../services/googleSheets";
import TearToSubmit from "./TearToSubmit";
import ScrollReveal from "./ScrollReveal";

export function ChequeForm({ onSubmit, isSubmitting, serverError }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    year: "",
    branch: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeError, setShakeError] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Keep the cheque date current, including if the page remains open overnight.
  useEffect(() => {
    const updateDate = () => setCurrentDate(new Date());
    const intervalId = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const dateDigits = [
    String(currentDate.getDate()).padStart(2, "0"),
    String(currentDate.getMonth() + 1).padStart(2, "0"),
    String(currentDate.getFullYear())
  ];

  // Field refs for auto-focus on error
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const yearRef = useRef(null);
  const branchRef = useRef(null);

  const fieldRefs = {
    fullName: nameRef,
    email: emailRef,
    contact: contactRef,
    year: yearRef,
    branch: branchRef
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === "contact") {
      // Allow only digits, max 10
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue
    }));

    // Real-time re-validation for touched field
    if (touched[name]) {
      const nextData = { ...formData, [name]: processedValue };
      const validation = validateRegistration(nextData);
      setErrors((prev) => ({
        ...prev,
        [name]: validation.errors[name] || null
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validation = validateRegistration(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: validation.errors[name] || null
    }));
  };

  // Pre-tear validation check
  const validateFormBeforeTear = () => {
    const validation = validateRegistration(formData);
    setTouched({
      fullName: true,
      email: true,
      contact: true,
      year: true,
      branch: true
    });
    setErrors(validation.errors);

    if (!validation.isValid) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 450);

      // Auto-scroll to first invalid input
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField && fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
        fieldRefs[firstErrorField].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  };

  const handleTearComplete = () => {
    if (validateFormBeforeTear()) {
      onSubmit(formData);
    }
  };

  // Check validity statuses
  const isSomaiyaEmailValid = formData.email && /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/i.test(formData.email.trim());
  const isPhoneValid = formData.contact && formData.contact.length === 10;
  const isNameValid = formData.fullName && formData.fullName.trim().length >= 2;

  return (
    <section id="registration-cheque" className="section-cheque relative flex flex-col items-center justify-center z-20">
      <div className="page-container flex flex-col items-center">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 sm:mb-14 pb-2">
          <div 
            className="inline-flex items-center gap-2.5 rounded-full bg-[#8B2616]/45 border border-[#CBA344]/60 text-[#E5C368] text-xs font-mono uppercase tracking-wider mb-4 shadow-lg"
            style={{ padding: "0.5rem 1.45rem" }}
          >
            <Sparkles className="w-4 h-4 text-[#E5C368] shrink-0" />
            <span>OFFICIAL REGISTRATION CHEQUE</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-[#F8F3E6] tracking-wide">
            Make Your Commitment
          </h2>
          <p className="font-cursive text-3xl sm:text-5xl text-[#E5C368] mt-3 max-w-xl mx-auto font-normal">
            Fill in your details and prepare to set sail.
          </p>
        </ScrollReveal>

        {/* Server Error Banner */}
        {serverError && (
          <div className="w-full max-w-4xl mb-10 p-5 rounded-2xl bg-[#561108]/95 border-2 border-[#E5C368] text-[#F8F3E6] shadow-2xl flex items-start gap-4 animate-shake">
            <AlertCircle className="w-6 h-6 text-[#FF9955] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base font-cinzel text-[#FF9955]">SUBMISSION FAILED</h4>
              <p className="text-sm mt-1 text-[#DFC99E]">{serverError}</p>
              <p className="text-xs text-[#DFC99E]/80 mt-1">Your details have been preserved. Please retry the tear.</p>
            </div>
          </div>
        )}

        {/* THE VINTAGE CHEQUE LEAF (Centered & Spacious on PC & Mobile) */}
        <ScrollReveal
          className={`cheque-leaf security-pattern rounded-3xl p-8 sm:p-12 md:p-16 shadow-3xl relative overflow-hidden transition-all max-w-4xl w-full ${
            shakeError ? "animate-shake ring-4 ring-red-600/50" : ""
          }`}
        >
          {/* Top Cheque Header */}
          <div className="flex flex-wrap items-center justify-between gap-5 pb-8 border-b-2 border-[#8B2616]/30">
            
            {/* Bank Emblem & Branding */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#8B2616] border-2 border-[#CBA344] flex items-center justify-center text-[#E5C368] shrink-0 shadow-2xl">
                <Compass className="w-8 h-8 sm:w-11 sm:h-11 animate-compass" />
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-cinzel font-black tracking-wide text-[#2C160B]">
                  REGISTER NOW
                </div>
                <div className="text-xs text-[#5C4736] font-mono mt-1">
                  BRANCH: KJSCE • ROOM B-113 • MUMBAI
                </div>
              </div>
            </div>

            {/* Vintage Boxed Date */}
            <div className="flex flex-col items-end gap-2.5 ml-auto">
              {/* Live date boxes (DD / MM / YYYY) */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-mono font-bold text-[#5C4736] mr-1">DATE:</span>
                <span className="date-box">{dateDigits[0][0]}</span>
                <span className="date-box">{dateDigits[0][1]}</span>
                <span className="text-sm font-bold text-[#5C4736]">/</span>
                <span className="date-box">{dateDigits[1][0]}</span>
                <span className="date-box">{dateDigits[1][1]}</span>
                <span className="text-sm font-bold text-[#5C4736]">/</span>
                {dateDigits[2].split("").map((digit, index) => (
                  <span className="date-box" key={index}>{digit}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CHEQUE FORM FIELDS */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 sm:mt-10 space-y-7 sm:space-y-9 mb-4" noValidate>
            
            {/* FIELD 1: FULL NAME */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label 
                  htmlFor="fullName" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider shrink-0"
                >
                  REGISTER TO THE ORDER OF:
                </label>
                <div className="flex-1 relative">
                  <input
                    ref={nameRef}
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Full Name of Student (First & Last Name)"
                    className={`cheque-input pr-10 ${errors.fullName ? "has-error" : ""}`}
                    autoComplete="name"
                    required
                  />
                  {isNameValid && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-2 top-3.5" />
                  )}
                </div>
              </div>
              {errors.fullName && (
                <p className="text-xs sm:text-sm text-red-700 font-semibold mt-2 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-4 h-4" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* FIELD 2: SOMAIYA EMAIL ID */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label 
                  htmlFor="email" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider shrink-0"
                >
                  SOMAIYA EMAIL ID:
                </label>
                <div className="flex-1 relative">
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="student.name@somaiya.edu"
                    className={`cheque-input pr-10 ${errors.email ? "has-error" : ""}`}
                    autoComplete="email"
                    required
                  />
                  {isSomaiyaEmailValid && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-2 top-3.5" />
                  )}
                </div>
              </div>
              {errors.email && (
                <p className="text-xs sm:text-sm text-red-700 font-semibold mt-2 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* TWO COLUMN ROW: CONTACT NUMBER & YEAR OF STUDY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9">
              
              {/* FIELD 3: CONTACT NUMBER (10 Digits) */}
              <div className="relative">
                <label 
                  htmlFor="contact" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider block mb-2"
                >
                  CONTACT NUMBER (10 DIGITS):
                </label>
                <div className="relative">
                  <input
                    ref={contactRef}
                    id="contact"
                    name="contact"
                    type="tel"
                    maxLength={10}
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    className={`cheque-input pr-10 font-mono ${errors.contact ? "has-error" : ""}`}
                    autoComplete="tel"
                    required
                  />
                  {isPhoneValid && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-2 top-3.5" />
                  )}
                </div>
                {errors.contact && (
                  <p className="text-xs sm:text-sm text-red-700 font-semibold mt-2 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-4 h-4" /> {errors.contact}
                  </p>
                )}
              </div>

              {/* FIELD 4: YEAR OF STUDY */}
              <div className="relative">
                <label 
                  htmlFor="year" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider block mb-2"
                >
                  YEAR OF STUDY:
                </label>
                <select
                  ref={yearRef}
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`cheque-select ${errors.year ? "has-error" : ""}`}
                  required
                >
                  <option value="">-- Select Year of Study --</option>
                  {YEAR_OPTIONS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-xs sm:text-sm text-red-700 font-semibold mt-2 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-4 h-4" /> {errors.year}
                  </p>
                )}
              </div>
            </div>

            {/* FIELD 5: COLLEGE / ENGINEERING BRANCH */}
            <div className="relative">
              <label 
                htmlFor="branch" 
                className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider block mb-2"
              >
                COLLEGE / ENGINEERING BRANCH:
              </label>
              <select
                ref={branchRef}
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`cheque-select ${errors.branch ? "has-error" : ""}`}
                required
              >
                <option value="">-- Select Your Branch --</option>
                {BRANCH_OPTIONS.map((br) => (
                  <option key={br} value={br}>
                    {br}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-xs sm:text-sm text-red-700 font-semibold mt-2 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-4 h-4" /> {errors.branch}
                </p>
              )}
            </div>

            {/* SIGNATURE TEAR-TO-SUBMIT PERFORATED COMPONENT */}
            <TearToSubmit
              isValid={Object.keys(errors).length === 0}
              isSubmitting={isSubmitting}
              onValidateBeforeTear={validateFormBeforeTear}
              onTearComplete={handleTearComplete}
            />
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ChequeForm;
