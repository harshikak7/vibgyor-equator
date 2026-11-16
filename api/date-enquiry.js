
import { google } from "googleapis";
import { Resend } from "resend";
import { randomUUID } from "node:crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

function sendJson(res, status, data) {
  return res.status(status).json(data);
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, {
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      name,
      email,
      date,
      website,
    } = req.body || {};

    // Simple honeypot spam protection.
    // Real visitors should leave this hidden field empty.
    if (clean(website)) {
      return sendJson(res, 200, {
        success: true,
        message: "Enquiry received",
      });
    }

    const visitorName = clean(name);
    const visitorEmail = clean(email).toLowerCase();
    const requestedDate = clean(date);

    // Validate input
    if (!visitorName || !visitorEmail || !requestedDate) {
      return sendJson(res, 400, {
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (visitorName.length > 100 || visitorEmail.length > 200) {
      return sendJson(res, 400, {
        success: false,
        message: "The submitted details are too long.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(visitorEmail)) {
      return sendJson(res, 400, {
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Validate the date and prevent impossible dates.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) {
      return sendJson(res, 400, {
        success: false,
        message: "Please select a valid date.",
      });
    }

    const parsedDate = new Date(`${requestedDate}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== requestedDate
    ) {
      return sendJson(res, 400, {
        success: false,
        message: "The selected date is invalid.",
      });
    }

    // Check required server credentials.
    const requiredEnv = [
      "GOOGLE_CLIENT_EMAIL",
      "GOOGLE_PRIVATE_KEY",
      "GOOGLE_SHEET_ID",
      "RESEND_API_KEY",
      "OWNER_EMAIL",
      "FROM_EMAIL",
    ];

    const missing = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missing.length) {
      console.error("Missing environment variables:", missing);

      return sendJson(res, 500, {
        success: false,
        message: "The enquiry service is not configured.",
      });
    }

    // Connect to Google Sheets using a service account.
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const submittedAt = new Date().toISOString();
    const submissionId = randomUUID();

    // First save the enquiry.
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Date Enquiries'!A:G",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          submittedAt,
          visitorName,
          visitorEmail,
          requestedDate,
          "Website",
          submissionId,
          "Pending",
        ]],
      },
    });

    // Confirm Google Sheets returned an updated range.
    const updatedRange = result.data?.updates?.updatedRange;

    if (!updatedRange) {
      throw new Error("Google Sheets did not confirm the row update.");
    }

    // Find the row that was just inserted.
    const match = updatedRange.match(/![A-Z]+(\d+):/);

    if (!match) {
      throw new Error("Could not identify the inserted sheet row.");
    }

    const rowNumber = Number(match[1]);

    // Send notification to the business owner.
    let notificationStatus = "Failed";

    try {
      const emailResult = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: [process.env.OWNER_EMAIL],
        replyTo: visitorEmail,
        subject: "New Date Enquiry Received - Vibgyor Equator",
        text: `
A new date enquiry has been submitted on the Vibgyor Equator website.

Visitor details:

Name: ${visitorName}
Email: ${visitorEmail}
Requested date: ${requestedDate}
Submitted at: ${submittedAt}

You can reply directly to this email to contact the visitor.

Submission ID: ${submissionId}
        `,
      });

      if (emailResult.error) {
        throw new Error(emailResult.error.message);
      }

      notificationStatus = "Sent";
    } catch (emailError) {
      // The enquiry is already saved.
      // Do not lose it if email delivery fails.
      console.error("Owner notification failed:", emailError);
    }

    // Update the notification status in Google Sheets.
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'Date Enquiries'!G${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[notificationStatus]],
      },
    });

    return sendJson(res, 200, {
      success: true,
      notificationSent: notificationStatus === "Sent",
      message:
        notificationStatus === "Sent"
          ? "Your date enquiry has been submitted successfully."
          : "Your enquiry has been saved. The business notification is pending.",
    });

  } catch (error) {
    console.error("Date enquiry API error:", error);

    return sendJson(res, 500, {
      success: false,
      message: "We couldn't submit your enquiry. Please try again.",
    });
  }
}
