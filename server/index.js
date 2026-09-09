const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Use native fetch (Node 18+)
const fetchFn = typeof fetch !== 'undefined' ? fetch : globalThis.fetch;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const isSecure = process.env.EMAIL_SECURE === 'true' || port === 465;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: port,
    secure: isSecure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.verify((error) => {
    if (error) {
      console.error('⚠️  SMTP Transporter Verification Failed:', error.message);
    } else {
      console.log('✅ SMTP Transporter is ready to send confirmation emails via', process.env.EMAIL_HOST || 'smtp.gmail.com');
    }
  });
} else {
  // If no credentials, use a test transporter (ethereal) for development
  console.warn('⚠️  Email credentials (EMAIL_USER / EMAIL_PASS) not set in server/.env.');
  console.warn('   Emails will attempt to use Ethereal test account or fail if unconfigured.');
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
  });
}

// Route to handle form submission
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, contact, year, branch } = req.body;

    // Basic validation (you can add more if needed)
    if (!fullName || !email || !contact || !year || !branch) {
      return res.status(422).json({
        status: 'error',
        message: 'All fields are required (Full Name, Email, Contact, Year, Branch).'
      });
    }

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"BloomBox E-Cell" <noreply@bloombox.example.com>',
      to: email,
      subject: `Registration confirmed: ConnectiFY'26`,
      text: `
        Hi ${fullName},

        Your registration for ConnectiFY'26 has been confirmed.

        Event details
        Date: 22 September 2026
        Time: 4:00 PM onwards
        Venue: Room B-113, K. J. Somaiya College of Engineering, Vidyavihar

        Registration details
        Email: ${email}
        Year: ${year}
        Branch: ${branch}

        We look forward to seeing you there!

        BloomBox – The Entrepreneurship Cell of KJSCE
      `,
      html: `
        <p>Hi ${fullName},</p>
        <p>Your registration for <strong>ConnectiFY'26</strong> has been confirmed.</p>
        <h3>Event details</h3>
        <p><strong>Date:</strong> 22 September 2026<br>
           <strong>Time:</strong> 4:00 PM onwards<br>
           <strong>Venue:</strong> Room B-113, K. J. Somaiya College of Engineering, Vidyavihar</p>
        <h3>Registration details</h3>
        <p><strong>Email:</strong> ${email}<br>
           <strong>Year:</strong> ${year}<br>
           <strong>Branch:</strong> ${branch}</p>
        <p>We look forward to seeing you there!</p>
        <p>BloomBox &mdash; The Entrepreneurship Cell of KJSCE</p>
      `
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (mailError) {
      console.error(`❌ Failed to send confirmation email to ${email}:`, mailError.message);
      if (mailError.code === 'EAUTH') {
        throw new Error('Email authentication failed. Please check EMAIL_USER and EMAIL_PASS (use 16-char App Password for Gmail) in server/.env.');
      }
      throw new Error(`Failed to send confirmation email: ${mailError.message}`);
    }

    // Now, save the data to Google Sheets via the existing Apps Script (with skipEmail=true)
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyHF7nCLtb2LdfJawJcNl_WUo2gIazcS-VkVaBIkVYDZQIoF8pPhsPvcJTVa4JKX1kQ/exec';
    const payload = {
      timestamp: new Date().toISOString(),
      event: "ConnectiFY'26",
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      contact: contact.replace(/\D/g, '').trim(),
      year: year.trim(),
      branch: branch.trim(),
      skipEmail: true // Important: skip sending email in the Apps Script
    };

    const response = await fetchFn(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error('Server returned non-JSON response from Google Apps Script');
    }

    if (result && result.status === 'success') {
      res.json({
        status: 'success',
        message: 'Registration successful! Confirmation email has been sent.',
        entry: result.entry
      });
    } else {
      throw new Error(result?.message || 'Google Apps Script returned unsuccessful status');
    }
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong while processing your registration. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});