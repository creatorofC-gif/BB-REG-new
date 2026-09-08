/**
 * =========================================================================
 * CONNECTIFY'26 — GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * 
 * Instructions to connect Google Sheet:
 * 
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
 * 2. Rename the sheet tab to "Registrations" (or leave as "Sheet1").
 * 3. (Optional) Set the first row header:
 *    [Timestamp, Event, Full Name, Somaiya Email, Contact Number, Year of Study, Branch, Status]
 * 4. In the spreadsheet menu, go to: Extensions > Apps Script
 * 5. Replace all code in the Apps Script editor with THIS file content.
 * 6. (Optional) If you want to specify a specific Sheet ID, set SPREADSHEET_ID below.
 *    Otherwise, it will automatically use the active spreadsheet where this script is attached!
 * 7. Click "Deploy" > "New deployment"
 * 8. Select type: "Web app"
 * 9. Set Configuration:
 *    - Description: ConnectiFY'26 Registration Endpoint
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so students can submit without logging into your script)
 * 10. Click "Deploy", authorize permissions, and COPY the Web App URL.
 * 11. Paste the URL into `src/config/constants.js` in `GOOGLE_APPS_SCRIPT_URL`.
 * =========================================================================
 */

// If running as standalone script, paste your Spreadsheet ID here.
// If attached to a Spreadsheet directly (Extensions > Apps Script), leave as empty string.
const SPREADSHEET_ID = ""; 
const SHEET_NAME = "Registrations";

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait for up to 30 seconds for other processes to finish
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "Empty request payload received."
      }, 400);
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({
        status: "error",
        message: "Invalid JSON format: " + parseError.message
      }, 400);
    }

    // --- SERVER-SIDE VALIDATION ---
    const fullName = (data.fullName || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const contact = (data.contact || "").toString().replace(/\D/g, "").trim();
    const year = (data.year || "").trim();
    const branch = (data.branch || "").trim();
    const eventName = data.event || "ConnectiFY'26";

    // Validate required fields
    if (!fullName || !email || !contact || !year || !branch) {
      return createJsonResponse({
        status: "error",
        message: "All fields are required (Full Name, Email, Contact, Year, Branch)."
      }, 422);
    }

    // Strict Somaiya email validation
    const somaiyaEmailRegex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/i;
    if (!somaiyaEmailRegex.test(email)) {
      return createJsonResponse({
        status: "error",
        message: "Only @somaiya.edu email addresses are permitted for registration."
      }, 422);
    }

    // Strict 10-digit phone number validation
    if (contact.length !== 10) {
      return createJsonResponse({
        status: "error",
        message: "Contact number must be exactly 10 digits."
      }, 422);
    }

    // Open Target Sheet
    let spreadsheet;
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    } else {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.getActiveSheet();
    }

    // Setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Event",
        "Full Name",
        "Somaiya Email",
        "Contact Number",
        "Year of Study",
        "Branch",
        "Submission Status"
      ]);
      sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#DFCBA0");
    }

    // Check for duplicate Somaiya Email (prevent double registration)
    const existingData = sheet.getDataRange().getValues();
    // email column is index 3 (4th column)
    const emailExists = existingData.slice(1).some(function(row) {
      return (row[3] || "").toString().toLowerCase() === email;
    });

    if (emailExists) {
      return createJsonResponse({
        status: "success",
        isDuplicate: true,
        message: "You are already registered for ConnectiFY'26! We have your booking on record."
      }, 200);
    }

    // Append registration row
    const formattedTimestamp = Utilities.formatDate(
      new Date(),
      "Asia/Kolkata",
      "yyyy-MM-dd HH:mm:ss"
    );

    sheet.appendRow([
      formattedTimestamp,
      eventName,
      fullName,
      email,
      "'" + contact, // Prepended with apostrophe to preserve leading zero formatting
      year,
      branch,
      "CONFIRMED"
    ]);

    return createJsonResponse({
      status: "success",
      message: "Registration successful! Welcome aboard ConnectiFY'26.",
      entry: {
        timestamp: formattedTimestamp,
        fullName: fullName,
        email: email
      }
    }, 200);

  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: "An internal server error occurred: " + err.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "online",
    service: "ConnectiFY'26 Registration API",
    time: new Date().toISOString()
  }, 200);
}

function createJsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
