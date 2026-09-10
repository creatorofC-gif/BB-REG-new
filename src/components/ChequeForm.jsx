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
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue
    }));

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

  const isSomaiyaEmailValid = formData.email && /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/i.test(formData.email.trim());
  const isPhoneValid = formData.contact && formData.contact.length === 10;
  const isNameValid = formData.fullName && formData.fullName.trim().length >= 2;

  return (
    <section id="registration-cheque" className="section-cheque relative flex flex-col items-center justify-center z-20 pt-10 pb-16 px-4">
      <div className="page-container flex flex-col items-center w-full max-w-4xl">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-8 flex flex-col items-center">
          <div 
            className="inline-flex items-center gap-2 rounded-full bg-[#8B2616]/45 border border-[#CBA344]/60 text-[#E5C368] text-xs font-mono uppercase tracking-wider mb-3 shadow-lg"
            style={{ padding: "0.4rem 1.25rem" }}
          >
            <Sparkles className="w-4 h-4 text-[#E5C368] shrink-0" />
            <span>OFFICIAL REGISTRATION CHEQUE</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-[#F8F3E6] tracking-wide leading-tight mb-2">
            Make Your Commitment
          </h2>

          <p className="font-cursive text-2xl sm:text-4xl text-[#E5C368] max-w-xl mx-auto font-normal leading-snug">
            Fill in your details and prepare to set sail.
          </p>
        </ScrollReveal>

        {/* Server Error Banner */}
        {serverError && (
          <div className="w-full mb-6 p-4 rounded-xl bg-[#561108]/95 border-2 border-[#E5C368] text-[#F8F3E6] shadow-2xl flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-[#FF9955] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm font-cinzel text-[#FF9955]">SUBMISSION FAILED</h4>
              <p className="text-xs mt-0.5 text-[#DFC99E]">{serverError}</p>
            </div>
          </div>
        )}

        {/* THE VINTAGE CHEQUE LEAF */}
        <ScrollReveal
          className={`cheque-leaf security-pattern rounded-2xl p-6 sm:p-10 md:p-12 shadow-3xl relative overflow-hidden transition-all w-full ${
            shakeError ? "animate-shake ring-4 ring-red-600/50" : ""
          }`}
        >
          {/* Top Cheque Header */}
          <div className="cheque-header-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#8B2616]/30 pb-5 mb-8">
            
            {/* Bank Emblem & Branding */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#8B2616] border border-[#CBA344] flex items-center justify-center text-[#E5C368] shrink-0 shadow-lg">
                <Compass className="w-7 h-7 sm:w-9 sm:h-9 animate-compass" />
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-cinzel font-black tracking-wide text-[#2C160B] leading-tight">
                  REGISTER NOW
                </div>
                <div className="text-[11px] sm:text-xs text-[#5C4736] font-mono mt-0.5">
                  BRANCH: KJSCE • ROOM B-113 • MUMBAI
                </div>
              </div>
            </div>

            {/* Vintage Boxed Date */}
            <div className="cheque-date-container flex items-center gap-1.5 ml-auto sm:ml-0">
              <span className="text-xs font-mono font-bold text-[#5C4736] mr-1">DATE:</span>
              <div className="flex items-center gap-1">
                <span className="date-box">{dateDigits[0][0]}</span>
                <span className="date-box">{dateDigits[0][1]}</span>
                <span className="text-xs font-bold text-[#5C4736]">/</span>
                <span className="date-box">{dateDigits[1][0]}</span>
                <span className="date-box">{dateDigits[1][1]}</span>
                <span className="text-xs font-bold text-[#5C4736]">/</span>
                {dateDigits[2].split("").map((digit, index) => (
                  <span className="date-box" key={index}>{digit}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CHEQUE FORM FIELDS */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-7 sm:gap-8 mb-6" noValidate>
            
            {/* FIELD 1: FULL NAME */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="fullName" 
                className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider"
              >
                NAME:
              </label>
              <div className="relative">
                <input
                  ref={nameRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`cheque-input min-h-[42px] py-2 pr-8 w-full text-base font-serif bg-transparent border-b-2 border-[#8B2616]/40 focus:outline-none focus:border-[#8B2616] ${
                    errors.fullName ? "has-error" : ""
                  }`}
                  autoComplete="name"
                  required
                />
                {isNameValid && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-1 bottom-3" />
                )}
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-700 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* FIELD 2: SOMAIYA EMAIL ID */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="email" 
                className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider"
              >
                SOMAIYA EMAIL ID:
              </label>
              <div className="relative">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`cheque-input min-h-[42px] py-2 pr-8 w-full text-base font-serif bg-transparent border-b-2 border-[#8B2616]/40 focus:outline-none focus:border-[#8B2616] ${
                    errors.email ? "has-error" : ""
                  }`}
                  autoComplete="email"
                  required
                />
                {isSomaiyaEmailValid && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-1 bottom-3" />
                )}
              </div>
              {errors.email && (
                <p className="text-xs text-red-700 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            {/* TWO COLUMN ROW: CONTACT NUMBER & YEAR OF STUDY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
              
              {/* FIELD 3: CONTACT NUMBER */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="contact" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider"
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
                    className={`cheque-input min-h-[42px] py-2 pr-8 w-full text-base font-mono bg-transparent border-b-2 border-[#8B2616]/40 focus:outline-none focus:border-[#8B2616] ${
                      errors.contact ? "has-error" : ""
                    }`}
                    autoComplete="tel"
                    required
                  />
                  {isPhoneValid && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-1 bottom-3" />
                  )}
                </div>
                {errors.contact && (
                  <p className="text-xs text-red-700 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.contact}
                  </p>
                )}
              </div>

              {/* FIELD 4: YEAR OF STUDY */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="year" 
                  className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider"
                >
                  YEAR OF STUDY:
                </label>
                <div className="relative">
                  <select
                    ref={yearRef}
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`cheque-select min-h-[42px] py-2 w-full text-base font-serif bg-transparent border-b-2 border-[#8B2616]/40 focus:outline-none focus:border-[#8B2616] ${
                      errors.year ? "has-error" : ""
                    }`}
                    required
                  >
                    <option value="">-- Select Year of Study --</option>
                    {YEAR_OPTIONS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.year && (
                  <p className="text-xs text-red-700 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.year}
                  </p>
                )}
              </div>
            </div>

            {/* FIELD 5: COLLEGE / ENGINEERING BRANCH */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="branch" 
                className="font-cinzel text-xs sm:text-sm font-bold text-[#7B1F13] tracking-wider"
              >
                COLLEGE / ENGINEERING BRANCH:
              </label>
              <div className="relative">
                <select
                  ref={branchRef}
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`cheque-select min-h-[42px] py-2 w-full text-base font-serif bg-transparent border-b-2 border-[#8B2616]/40 focus:outline-none focus:border-[#8B2616] ${
                    errors.branch ? "has-error" : ""
                  }`}
                  required
                >
                  <option value="">-- Select Your Branch --</option>
                  {BRANCH_OPTIONS.map((br) => (
                    <option key={br} value={br}>
                      {br}
                    </option>
                  ))}
                </select>
              </div>
              {errors.branch && (
                <p className="text-xs text-red-700 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.branch}
                </p>
              )}
            </div>

            {/* TEAR-TO-SUBMIT PERFORATED COMPONENT */}
            <div className="pt-4">
              <TearToSubmit
                isValid={Object.keys(errors).length === 0}
                isSubmitting={isSubmitting}
                onValidateBeforeTear={validateFormBeforeTear}
                onTearComplete={handleTearComplete}
              />
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ChequeForm;
