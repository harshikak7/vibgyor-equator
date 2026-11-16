const BUSINESS_EMAIL = "equatorvibgyor@gmail.com";

function doPost(e) {
  try {
    const data = e.parameter || {};

    // Spam protection: ignore submissions with a filled honeypot.
    if (data.website) {
      return jsonResponse({ success: false });
    }

    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const date = String(data.date || "").trim();

    if (!name || !phone || !date) {
      return jsonResponse({
        success: false,
        message: "Please complete all required fields."
      });
    }

    if (name.length > 100 || phone.length > 20) {
      return jsonResponse({
        success: false,
        message: "Invalid form details."
      });
    }

    if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
      return jsonResponse({
        success: false,
        message: "Please enter a valid phone number."
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return jsonResponse({
        success: false,
        message: "Please enter a valid date."
      });
    }

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Date Enquiries");

    if (!sheet) {
      throw new Error('Sheet tab "Date Enquiries" was not found.');
    }

    const submittedAt = new Date();

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      sheet.appendRow([
        submittedAt,
        name,
        phone,
        date
      ]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: BUSINESS_EMAIL,
      subject: "New Date Enquiry - Vibgyor Equator",
      body:
        "A new date enquiry has been submitted.\n\n" +
        "Name: " + name + "\n" +
        "Phone Number: " + phone + "\n" +
        "Special Date: " + date + "\n" +
        "Submitted At: " + submittedAt
    });

    return jsonResponse({ success: true });

  } catch (error) {
    console.error(error);

    return jsonResponse({
      success: false,
      message: "Unable to process the enquiry."
    });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}