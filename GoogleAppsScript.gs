/**
 * =========================================================================
 * CONNECTIFY'26 — GOOGLE APPS SCRIPT (DATA STORAGE ONLY)
 * =========================================================================
 * 
 * This script is responsible ONLY for validating and appending registration
 * records to Google Sheets. Confirmation emails are handled by the Node.js
 * backend server (Nodemailer).
 * 
 * Instructions to update Google Sheet:
 * 1. Open your Google Sheet (Extensions > Apps Script).
 * 2. Replace all code with THIS file content.
 * 3. Click "Deploy" > "Manage deployments" > Edit (pencil icon) > New version > "Deploy".
 * =========================================================================
 */

// If running as a standalone script, paste your Spreadsheet ID here.
// If attached to a Spreadsheet directly (Extensions > Apps Script), leave as empty string.
const SPREADSHEET_ID = "1frYUicbdTAuRJPTqr4Rg7imj-5P7DwBHyMGxnFC_gfA"; 
const SHEET_NAME = "Registrations";

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait for up to 30 seconds for concurrent submissions
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
    const emailExists = existingData.slice(1).some(function(row) {
      return (row[3] || "").toString().toLowerCase() === email;
    });

    if (emailExists) {
      return createJsonResponse({
        status: "success",
        isDuplicate: true,
        message: "You are already registered for ConnectiFY'26. Registration is confirmed."
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
      message: "Registration recorded successfully in Google Sheets.",
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
    service: "ConnectiFY'26 Registration Sheet Service",
    time: new Date().toISOString()
  }, 200);
}

function createJsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
