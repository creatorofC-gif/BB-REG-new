// Google Apps Script integration service

import { GOOGLE_APPS_SCRIPT_URL, EVENT_DETAILS } from "../config/constants";

/**
 * Validates registration data before transmission
 */
export function validateRegistration(formData) {
  const errors = {};

  // Full Name
  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (First and Last name)";
  }

  // Somaiya Email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/i;
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Somaiya email ID is required";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Must be a valid Somaiya email address ending in @somaiya.edu";
  }

  // Contact Number (exactly 10 digits)
  const contactClean = (formData.contact || "").replace(/\D/g, "");
  if (!contactClean) {
    errors.contact = "Contact number is required";
  } else if (contactClean.length !== 10) {
    errors.contact = "Contact number must be exactly 10 digits";
  }

  // Year of Study
  if (!formData.year || !formData.year.trim()) {
    errors.year = "Please select your year of study";
  }

  // Branch
  if (!formData.branch || !formData.branch.trim()) {
    errors.branch = "Please select your engineering / college branch";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Submits registration payload to Google Apps Script Web App
 */
export async function submitRegistration(formData) {
  const validation = validateRegistration(formData);
  if (!validation.isValid) {
    return {
      success: false,
      validationErrors: validation.errors,
      message: "Please correct the highlighted fields before submitting."
    };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    event: EVENT_DETAILS.name,
    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    contact: formData.contact.replace(/\D/g, "").trim(),
    year: formData.year.trim(),
    branch: formData.branch.trim()
  };

  // Check if user has updated the URL
  const isUrlConfigured =
    GOOGLE_APPS_SCRIPT_URL &&
    GOOGLE_APPS_SCRIPT_URL !== "PASTE_YOUR_APPS_SCRIPT_URL_HERE" &&
    GOOGLE_APPS_SCRIPT_URL.startsWith("https://script.google.com");

  if (!isUrlConfigured) {
    console.warn(
      "⚠️ Google Apps Script URL not configured yet. Simulating successful registration for preview.\n" +
      "To connect live Google Sheets, paste your deployed Web App URL into src/config/constants.js"
    );
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      data: payload,
      isSimulated: true,
      message: "Registration completed (Preview Mode - configure Google Apps Script URL to save to live sheet)"
    };
  }

  try {
    // We send payload as text/plain to avoid CORS preflight options blocking
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result && result.status === "success") {
      return {
        success: true,
        data: payload,
        message: result.message || "Registration recorded successfully"
      };
    } else {
      throw new Error(result?.message || "Server returned unsuccessful status");
    }
  } catch (error) {
    console.error("Google Sheets submission error:", error);
    return {
      success: false,
      error: error.message || "Failed to reach Google Sheets endpoint",
      message: "Something went wrong while processing your registration. Please try again."
    };
  }
}
