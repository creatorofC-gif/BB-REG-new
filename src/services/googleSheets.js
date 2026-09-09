// Google Apps Script integration service

import { EVENT_DETAILS } from "../config/constants";

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
 * Submits registration payload to our backend API (which sends email and saves to Google Sheets)
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

  // Get backend URL from environment variable (defaults to relative /api/register on Vercel)
  const apiUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : "/api/register";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error("Server returned non-JSON response");
    }

    if (result && result.status === "success") {
      return {
        success: true,
        data: payload,
        message: result.message || "Registration successful! Confirmation email has been sent."
      };
    } else {
      throw new Error(result?.message || "Server returned unsuccessful status");
    }
  } catch (error) {
    console.error("Submission error:", error);
    return {
      success: false,
      error: error.message || "Failed to reach backend endpoint",
      message: error.message || "Something went wrong while processing your registration. Please try again."
    };
  }
}