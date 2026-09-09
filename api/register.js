import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed. Use POST.' });
  }

  try {
    const { fullName, email, contact, year, branch } = req.body || {};

    // Validate required fields
    if (!fullName || !email || !contact || !year || !branch) {
      return res.status(422).json({
        status: 'error',
        message: 'All fields are required (Full Name, Email, Contact, Year, Branch).'
      });
    }

    // Setup Nodemailer Transporter
    const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
    const isSecure = process.env.EMAIL_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: port,
      secure: isSecure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"BloomBox E-Cell" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Registration confirmed: ConnectiFY'26`,
      text: `
Hi ${fullName},

Your registration for ConnectiFY'26 has been confirmed.

Event details:
Date: 22 September 2026
Time: 4:00 PM onwards
Venue: Room B-113, K. J. Somaiya College of Engineering, Vidyavihar

Registration details:
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

    // Send confirmation email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${email}`);

    // Save to Google Sheets
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl) {
      const payload = {
        timestamp: new Date().toISOString(),
        event: "ConnectiFY'26",
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        contact: contact.replace(/\D/g, '').trim(),
        year: year.trim(),
        branch: branch.trim()
      };

      const gasResponse = await fetch(googleAppsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await gasResponse.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Google Apps Script returned invalid response');
      }

      if (result && result.status === 'success') {
        return res.status(200).json({
          status: 'success',
          message: 'Registration successful! Confirmation email has been sent.',
          entry: result.entry
        });
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'Registration successful! Confirmation email has been sent.'
    });

  } catch (error) {
    console.error('Vercel API error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong while processing your registration.'
    });
  }
}
