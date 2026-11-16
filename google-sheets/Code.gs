/**
 * Google Sheets date form endpoint for Vibgyor Equator.
 * 1. Create a Google Sheet with a tab named "Date Enquiries".
 * 2. Extensions > Apps Script; paste this file.
 * 3. Deploy > New deployment > Web app; Execute as: Me; access: Anyone.
 * 4. Copy the /exec URL into VITE_GOOGLE_SCRIPT_URL in your frontend .env.
 */
function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Date Enquiries');
  if (!sheet) sheet = spreadsheet.insertSheet('Date Enquiries');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Day', 'Month', 'Year', 'Source']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  const p = (e && e.parameter) || {};
  sheet.appendRow([new Date(), p.day || '', p.month || '', p.year || '', p.source || 'Website']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
