import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EventStoryline from "./components/EventStoryline";
import ChequeForm from "./components/ChequeForm";
import SuccessReceipt from "./components/SuccessReceipt";
import { submitRegistration } from "./services/googleSheets";

export function App() {
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
        setTimeout(() => document.getElementById("registration-cheque")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setServerError(result.message || "Failed to complete registration. Please check your network and try again.");
      }
    } catch {
      setServerError("An unexpected network error occurred while submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(false);
    setRegisteredData(null);
    setServerError(null);
    setTimeout(() => document.getElementById("registration-cheque")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center text-[#F8F3E6] selection:bg-[#C85A17] selection:text-[#FFF]">
      <Header />
      <main className="w-full flex-1 flex flex-col items-center">
        <HeroSection />
        <EventStoryline />
        <div id="registration-cheque" className="w-full flex flex-col items-center scroll-mt-4">
          {submissionSuccess ? <SuccessReceipt registrationData={registeredData} onReset={handleReset} /> : <ChequeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} serverError={serverError} />}
        </div>
      </main>
      <footer className="w-full relative z-20 bg-transparent py-6 sm:py-8 px-4 text-center text-xs text-[#DFC99E]/80 flex flex-col items-center">
        <div className="page-container flex flex-col items-center gap-1">
          <div className="text-[#E5C368] font-cinzel font-bold text-sm sm:text-base tracking-widest">CONNECTIFY'26</div>
          <p className="text-xs sm:text-sm text-[#DFC99E]/65 mt-0.5 font-sans">© 2026 BloomBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
