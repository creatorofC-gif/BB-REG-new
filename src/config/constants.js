// ConnectiFY'26 Configuration & Constants

/**
 * GOOGLE APPS SCRIPT WEB APP URL
 * Replace the string below with your deployed Google Apps Script Web App URL.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 */
export const GOOGLE_APPS_SCRIPT_URL = 
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL) 
    ? import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL 
    : "https://script.google.com/macros/s/AKfycbyuOv5cfnzZV3dGXJqG2nE10UUh7pgGW0xO8vwrgrXZMKEjXZMXgX8T2fndtaNY3jE/exec";

/**
 * HERO ARTWORK / POSTER IMAGE PATH
 * If you have an image file (e.g. hero-boat.png, poster.jpg), place it in the 'public/' folder
 * and set its filename here (e.g. "/hero-boat.png").
 * If left empty or null, the built-in SVG vector artwork template will be rendered.
 */
export const CUSTOM_HERO_IMAGE = ""; 

export const EVENT_DETAILS = {
  name: "ConnectiFY'26",
  tagline: "This is where your voyage begins",
  heroHeadline: "Your First Step Into Entrepreneurship Starts Here.",
  subtext: "An exclusive induction for newly admitted students to begin their entrepreneurial journey, connect with bold ideas, visionary peers, and transformative opportunities.",
  date: "22nd September, 2026",
  dateFormatted: "22 / 09 / 2026",
  time: "4:00 PM onwards",
  venue: "B-113",
  location: "K. J. Somaiya College of Engineering, Vidyavihar",
  organizer: "BloomBox — The Entrepreneurship Cell of KJSCE",
  council: "Institution's Innovation Council & Somaiya Trust"
};

export const WAYPOINTS = [
  { step: "01", name: "IDEATE", desc: "Discover market sparks & student ventures" },
  { step: "02", name: "INNOVATE", desc: "Craft bold solutions beyond conventions" },
  { step: "03", name: "VALIDATE", desc: "Test hypotheses with mentors & real users" },
  { step: "04", name: "STRATEGIZE", desc: "Build sustainable models & team synergy" },
  { step: "05", name: "LAUNCH", desc: "Sail into the startup ecosystem" }
];

export const YEAR_OPTIONS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Other"
];

export const BRANCH_OPTIONS = [
  "Computer Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Telecommunication",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Other"
];
