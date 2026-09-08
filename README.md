# ConnectiFY'26 — Official Event Registration Microsite

A production-ready, mobile-first and desktop-responsive event registration website for **ConnectiFY'26**, presented by **BloomBox (The Entrepreneurship Cell of KJSCE)** in association with **Institution's Innovation Council & Somaiya Trust**.

---

## 🏛️ Event Details
- **Event**: ConnectiFY'26
- **Tagline**: *"This is where your voyage begins"*
- **Date**: 22nd September, 2026
- **Time**: 4:00 PM onwards
- **Venue**: Room B-113, K. J. Somaiya College of Engineering, Vidyavihar

---

## 🎨 Visual Identity & Key Features

1. **Poster Design Language**:
   - Palette: Burnt Orange, Antique Parchment, Deep Brown, Dark Maroon, Muted Gold, Dark Navy.
   - Ancient Greek Meander border motifs and vintage compass in the title.
   - 5 Waypoints: `IDEATE` ➔ `INNOVATE` ➔ `VALIDATE` ➔ `STRATEGIZE` ➔ `LAUNCH`.
   
2. **The Vintage Cheque Registration Leaf**:
   - Interactive vintage cheque UI with security patterns, bank watermark, serial number, and MICR encoding stripe.
   - Strict validation for `@somaiya.edu` student email addresses.
   - 10-digit phone number validation with real-time checkmarks.
   - Academic year and engineering branch dropdowns.

3. **Tactile Perforated Cheque-Tear Interaction**:
   - Physical swipe/drag downward along the perforated tear line on Mobile and PC.
   - Synthetic Web Audio API realistic paper tear crackle sound (zero external audio dependencies).
   - Haptic vibration feedback on supported mobile devices.
   - Form validation pre-check preventing tearing if fields are missing, with smooth auto-scroll to the first invalid field.
   - Accessible keyboard trigger (hold Space/Enter or accessible submit trigger).

4. **Official Stamped Confirmation**:
   - Post-tear wax seal / "OFFICIALLY ADMITTED" stamp animation.
   - Admitted explorer voyage receipt with event logistics.
   - "Add to Google Calendar" 1-click shortcut.
   - Printable / saveable pass button.
   - Gold & terracotta confetti burst.

---

## 🚀 Getting Started

### 1. Install Dependencies & Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Custom Hero Image / Artwork Template
In `src/config/constants.js`:
- To display your custom artwork image, drop your image (e.g. `hero-boat.png`) into the `public/` directory and set:
  ```javascript
  export const CUSTOM_HERO_IMAGE = "/hero-boat.png";
  ```
- If left empty (`""`), the high-resolution vector artwork template with the Greek galley ship, BB sail, and temple of SUCCESS will automatically render.

### 3. Connecting to Google Sheets (Google Apps Script)
1. Open Google Sheets ([sheets.new](https://sheets.new)) and create a new spreadsheet.
2. In the top menu, click **Extensions > Apps Script**.
3. Replace all code in the script editor with the contents of [`GoogleAppsScript.gs`](./GoogleAppsScript.gs).
4. Click **Deploy > New deployment**.
5. Choose **Web app**:
   - **Execute as**: *Me*
   - **Who has access**: *Anyone* (Important!)
6. Authorize permissions and copy the generated **Web App URL**.
7. Open [`src/config/constants.js`](./src/config/constants.js) and paste the URL:
   ```javascript
   export const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
8. Save and deploy! When students submit, their data is instantly validated and appended to your Google Sheet.

---

## 📱 Supported Devices
- **Mobile Phones**: 360px, 375px, 390px, 412px, 430px+
- **Tablets & iPads**: 768px - 1024px
- **Laptops & Desktops**: 1280px, 1440px, 1920px+
