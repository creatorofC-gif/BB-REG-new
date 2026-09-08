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
 *    [Timestamp, Event, Full Name, Somaiya Email, Contact Number, Year of Study, Branch, Status, Confirmation Email]
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
const SPREADSHEET_ID = "1frYUicbdTAuRJPTqr4Rg7imj-5P7DwBHyMGxnFC_gfA"; 
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
        "Submission Status",
        "Confirmation Email"
      ]);
      sheet.getRange("A1:I1").setFontWeight("bold").setBackground("#DFCBA0");
    } else if (sheet.getLastColumn() < 9) {
      // Add this column automatically for sheets created with an older script version.
      sheet.getRange(1, 9).setValue("Confirmation Email").setFontWeight("bold").setBackground("#DFCBA0");
    }

    // Check for duplicate Somaiya Email (prevent double registration)
    const existingData = sheet.getDataRange().getValues();
    // email column is index 3 (4th column)
    const emailExists = existingData.slice(1).some(function(row) {
      return (row[3] || "").toString().toLowerCase() === email;
    });

    if (emailExists) {
      const existingRowIndex = existingData.slice(1).findIndex(function(row) {
        return (row[3] || "").toString().toLowerCase() === email;
      });
      const existingRow = existingData[existingRowIndex + 1];

      // Re-send the pass for an existing registration, rather than creating a duplicate.
      sendConfirmationEmail({
        fullName: existingRow[2],
        email: email,
        contact: existingRow[4],
        year: existingRow[5],
        branch: existingRow[6],
        eventName: existingRow[1] || eventName
      });
      sheet.getRange(existingRowIndex + 2, 9).setValue(
        "RESENT - " + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
      );

      return createJsonResponse({
        status: "success",
        isDuplicate: true,
        message: "You are already registered for ConnectiFY'26. Your confirmation email has been sent again."
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
      "CONFIRMED",
      "PENDING"
    ]);

    const insertedRow = sheet.getLastRow();
    try {
      sendConfirmationEmail({ fullName, email, contact, year, branch, eventName });
      sheet.getRange(insertedRow, 9).setValue("SENT - " + formattedTimestamp);
    } catch (mailError) {
      sheet.getRange(insertedRow, 9).setValue("FAILED - " + mailError.toString());
      console.error("Confirmation email failed for " + email + ": " + mailError);
      throw new Error("Registration was saved, but the confirmation email could not be sent. Please contact the event team.");
    }

    return createJsonResponse({
      status: "success",
      message: "Your response has been submitted successfully. Welcome aboard ConnectiFY'26!",
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

function sendConfirmationEmail(registration) {
  const subject = "Registration confirmed: " + registration.eventName;
  const plainBody =
    "Hi " + registration.fullName + ",\n\n" +
    "Your registration for " + registration.eventName + " has been confirmed.\n\n" +
    "Event details\n" +
    "Date: 22 September 2026\n" +
    "Time: 4:00 PM onwards\n" +
    "Venue: Room B-113, K. J. Somaiya College of Engineering, Vidyavihar\n\n" +
    "Registration details\n" +
    "Email: " + registration.email + "\n" +
    "Year: " + registration.year + "\n" +
    "Branch: " + registration.branch + "\n\n" +
    "We look forward to seeing you there!\n\n" +
    "BloomBox — The Entrepreneurship Cell of KJSCE";

  const htmlBody =
    "<p>Hi " + escapeHtml(registration.fullName) + ",</p>" +
    "<p>Your registration for <strong>" + escapeHtml(registration.eventName) + "</strong> has been confirmed.</p>" +
    "<h3>Event details</h3>" +
    "<p><strong>Date:</strong> 22 September 2026<br>" +
    "<strong>Time:</strong> 4:00 PM onwards<br>" +
    "<strong>Venue:</strong> Room B-113, K. J. Somaiya College of Engineering, Vidyavihar</p>" +
    "<h3>Registration details</h3>" +
    "<p><strong>Email:</strong> " + escapeHtml(registration.email) + "<br>" +
    "<strong>Year:</strong> " + escapeHtml(registration.year) + "<br>" +
    "<strong>Branch:</strong> " + escapeHtml(registration.branch) + "</p>" +
    "<p>We look forward to seeing you there!</p>" +
    "<p>BloomBox &mdash; The Entrepreneurship Cell of KJSCE</p>";

  MailApp.sendEmail({
    to: registration.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: "BloomBox E-Cell"
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
