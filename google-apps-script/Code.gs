/**
 * ============================================================================
 * ZAHIDUL ISLAM PORTFOLIO — SERVERLESS CLIENT LEAD MANAGEMENT BACKEND
 * Runtime: Google Apps Script Web App (V8)
 * Database: Google Sheets (Bound Spreadsheet or Script Property SPREADSHEET_ID)
 * Email: Gmail via Google Apps Script MailApp
 * ============================================================================
 *
 * SECURITY NOTES:
 * - Keep this Google Sheet PRIVATE ("Restricted" sharing). Never publish it.
 * - Deploy this Web App with:
 *     Execute as: Me (your Google account)
 *     Who has access: Anyone
 * - Do NOT store API keys or credentials in frontend JavaScript.
 */

var CONFIG = {
  NOTIFICATION_EMAIL: 'zahidul.pro.bd@gmail.com',
  LEADS_SHEET_NAME: 'Leads',
  LOGS_SHEET_NAME: 'SubmissionLogs',
  DEFAULT_LEAD_STATUS: 'New',
  DUPLICATE_WINDOW_SECONDS: 60,
  RATE_LIMIT_WINDOW_SECONDS: 600,
  MAX_SUBMISSIONS_PER_WINDOW: 5,
  MIN_FORM_FILL_MS: 1200,
  EMAIL_SUBJECT_PREFIX: 'New Client Inquiry — Zahidul Islam Website',
};

var LEADS_HEADERS = [
  'Submission ID',
  'Submission Date & Time',
  'Form Source',
  'Full Name',
  'Email',
  'WhatsApp',
  'Website URL',
  'Requested Service',
  'Project Details',
  'Lead Status',
];

var LOGS_HEADERS = [
  'Timestamp',
  'Submission ID',
  'Outcome',
  'Form Source',
  'Email',
  'Message',
];

/**
 * Safe health-check endpoint (GET) for verifying Web App deployment.
 * Does NOT expose any sheet data, emails, or credentials.
 */
function doGet() {
  return jsonResponse({
    ok: true,
    service: 'Zahidul Islam Lead Management API',
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Primary form submission handler (POST).
 * Accepts CORS-simple `text/plain` JSON payloads or `application/x-www-form-urlencoded`.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    lockAcquired = lock.tryLock(15000);
    if (!lockAcquired) {
      return jsonResponse({
        ok: false,
        code: 'SERVER_BUSY',
        error: 'The submission system is momentarily busy. Please try again in a few seconds.',
      });
    }

    var payload = parseIncomingPayload_(e);
    if (!payload) {
      logSubmission_('', 'PARSE_ERROR', '', '', 'Empty or invalid request body');
      return jsonResponse({
        ok: false,
        code: 'INVALID_PAYLOAD',
        error: 'Invalid submission payload. Please refresh the page and try again.',
      });
    }

    // 1. Honeypot & automated timing spam protection
    var honeypotValue = cleanString_(payload.honeypot || payload._gotcha || payload.companyFax, 200);
    if (honeypotValue) {
      logSubmission_('', 'SPAM_HONEYPOT', cleanString_(payload.source, 40), cleanString_(payload.email, 120), 'Honeypot field populated');
      return jsonResponse({
        ok: false,
        code: 'SPAM_DETECTED',
        error: 'Your submission could not be verified. Please refresh and try again.',
      });
    }

    var formLoadedAt = Number(payload.formLoadedAt || 0);
    var submittedAt = Number(payload.submittedAt || Date.now());
    if (formLoadedAt > 0 && submittedAt > 0 && submittedAt - formLoadedAt < CONFIG.MIN_FORM_FILL_MS) {
      logSubmission_('', 'SPAM_TOO_FAST', cleanString_(payload.source, 40), cleanString_(payload.email, 120), 'Submitted faster than minimum threshold');
      return jsonResponse({
        ok: false,
        code: 'SPAM_DETECTED',
        error: 'Please take a moment to review your inquiry before submitting.',
      });
    }

    // 2. Server-side field extraction & strict validation
    var validated = validatePayload_(payload);
    if (!validated.valid) {
      logSubmission_('', 'VALIDATION_ERROR', validated.formSourceLabel || '', validated.email || '', validated.error);
      return jsonResponse({
        ok: false,
        code: 'VALIDATION_ERROR',
        error: validated.error,
      });
    }

    var data = validated.data;

    // 3. Duplicate & rate-limit protection (CacheService)
    var duplicateCheck = checkDuplicateAndRateLimit_(data);
    if (duplicateCheck.blocked) {
      logSubmission_('', duplicateCheck.code, data.formSourceLabel, data.email, duplicateCheck.error);
      return jsonResponse({
        ok: false,
        code: duplicateCheck.code,
        error: duplicateCheck.error,
      });
    }

    // 4. Prepare Spreadsheet & Submission Metadata
    var spreadsheet = getTargetSpreadsheet_();
    var leadsSheet = ensureLeadsSheet_(spreadsheet);

    var now = new Date();
    var timezone = spreadsheet.getSpreadsheetTimeZone() || Session.getScriptTimeZone() || 'UTC';
    var formattedDateTime = Utilities.formatDate(now, timezone, 'yyyy-MM-dd HH:mm:ss z');
    var submissionId = generateSubmissionId_(now);

    var sheetProjectDetails = data.monthlyBudget
      ? 'Estimated Monthly Ad Spend: ' + data.monthlyBudget + '\n\n' + data.projectDetails
      : data.projectDetails;

    // 5. Append row (never overwrites previous rows; sanitizes against formula injection)
    var rowValues = [
      submissionId,
      formattedDateTime,
      data.formSourceLabel,
      sanitizeForSheet_(data.fullName),
      sanitizeForSheet_(data.email),
      sanitizeForSheet_(data.whatsapp || 'Not provided'),
      sanitizeForSheet_(data.websiteUrl || 'Not provided'),
      sanitizeForSheet_(data.service),
      sanitizeForSheet_(sheetProjectDetails),
      CONFIG.DEFAULT_LEAD_STATUS,
    ];

    leadsSheet.appendRow(rowValues);

    // 6. Send complete email notification to zahidul.pro.bd@gmail.com
    sendLeadNotificationEmail_({
      submissionId: submissionId,
      formattedDateTime: formattedDateTime,
      formSourceLabel: data.formSourceLabel,
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      websiteUrl: data.websiteUrl,
      service: data.service,
      monthlyBudget: data.monthlyBudget,
      projectDetails: data.projectDetails,
    });

    // 7. Record duplicate lock & submission log
    markSubmissionProcessed_(data);
    logSubmission_(submissionId, 'SUCCESS', data.formSourceLabel, data.email, 'Saved to Google Sheets and email notification sent.');

    return jsonResponse({
      ok: true,
      submissionId: submissionId,
      submittedAt: formattedDateTime,
      status: CONFIG.DEFAULT_LEAD_STATUS,
      message: 'Inquiry received successfully.',
    });
  } catch (err) {
    var errorMessage = err && err.message ? String(err.message) : 'Unexpected server error';
    try {
      logSubmission_('', 'SYSTEM_ERROR', '', '', errorMessage);
    } catch (_logErr) {
      // Ignore secondary logging errors
    }

    return jsonResponse({
      ok: false,
      code: 'SERVER_ERROR',
      error: 'Unable to complete your submission right now. Please try again or reach out via WhatsApp.',
    });
  } finally {
    if (lockAcquired) {
      try {
        lock.releaseLock();
      } catch (_releaseErr) {
        // Ignore lock release errors
      }
    }
  }
}

/**
 * Run this once manually inside the Google Apps Script editor to:
 * 1) Initialize the Leads and SubmissionLogs tabs with headers & formatting.
 * 2) Trigger Google's OAuth authorization prompt for Sheets + MailApp.
 */
function setupSheets() {
  var ss = getTargetSpreadsheet_();
  ensureLeadsSheet_(ss);
  ensureLogsSheet_(ss);
  Logger.log('Setup complete. Spreadsheet URL: ' + ss.getUrl());
}

/**
 * Optional manual test function to run inside the Apps Script editor
 * (Run -> testLeadSubmission) to verify Sheets appendRow + MailApp email delivery.
 */
function testLeadSubmission() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        source: 'contact_section',
        fullName: 'Apps Script Test Client',
        email: 'test-client@example.com',
        whatsapp: '+1 555 234 5678',
        websiteUrl: 'https://example.com',
        service: 'Google Ads Management',
        monthlyBudget: '$3K - $10K',
        projectDetails: 'Test verification from Google Apps Script editor.',
        honeypot: '',
        formLoadedAt: Date.now() - 5000,
        submittedAt: Date.now(),
      }),
    },
  };

  var output = doPost(fakeEvent);
  Logger.log(output.getContent());
}

/* ============================================================================
 * INTERNAL HELPERS
 * ========================================================================== */

function parseIncomingPayload_(e) {
  if (!e) return null;

  if (e.postData && e.postData.contents) {
    try {
      var parsed = JSON.parse(e.postData.contents);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch (_jsonErr) {
      // Fall through to form-encoded parameters
    }
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  return null;
}

function validatePayload_(payload) {
  var rawSource = cleanString_(payload.source, 50).toLowerCase();
  var formSourceLabel = '';

  if (rawSource === 'contact_section' || rawSource === 'main contact section') {
    formSourceLabel = 'Main Contact Section';
  } else if (rawSource === 'consultation_popup' || rawSource === 'strategy call popup') {
    formSourceLabel = 'Strategy Call Popup';
  } else {
    return {
      valid: false,
      error: 'Unrecognized form source.',
    };
  }

  var fullName = cleanString_(payload.fullName, 120);
  if (!fullName || fullName.length < 2) {
    return {
      valid: false,
      formSourceLabel: formSourceLabel,
      error: 'Please enter your full name (minimum 2 characters).',
    };
  }

  var email = cleanString_(payload.email, 180).toLowerCase();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return {
      valid: false,
      formSourceLabel: formSourceLabel,
      email: email,
      error: 'Please enter a valid email address.',
    };
  }

  var service = cleanString_(payload.service, 150);
  if (!service || service.length < 2) {
    return {
      valid: false,
      formSourceLabel: formSourceLabel,
      email: email,
      error: 'Please select a primary service needed.',
    };
  }

  var projectDetails = cleanMultilineString_(payload.projectDetails, 4000);
  if (!projectDetails || projectDetails.length < 5) {
    return {
      valid: false,
      formSourceLabel: formSourceLabel,
      email: email,
      error: 'Please provide project details (at least 5 characters).',
    };
  }

  // Basic spam link-flood protection
  var urlMatches = projectDetails.match(/https?:\/\//gi);
  if (urlMatches && urlMatches.length > 5) {
    return {
      valid: false,
      formSourceLabel: formSourceLabel,
      email: email,
      error: 'Too many links detected in project details. Please summarize your inquiry.',
    };
  }

  var whatsapp = cleanString_(payload.whatsapp, 40);
  if (whatsapp) {
    var digitsOnly = whatsapp.replace(/\D/g, '');
    if (digitsOnly.length <= 3) {
      // Ignore dial-code-only placeholder like "+1"
      whatsapp = '';
    } else if (digitsOnly.length < 6 || digitsOnly.length > 18) {
      return {
        valid: false,
        formSourceLabel: formSourceLabel,
        email: email,
        error: 'Please enter a valid WhatsApp number or leave it blank.',
      };
    }
  }

  var websiteUrl = cleanString_(payload.websiteUrl, 300);
  if (websiteUrl) {
    if (!/^https?:\/\//i.test(websiteUrl)) {
      websiteUrl = 'https://' + websiteUrl;
    }
    var urlPattern = /^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}(:[0-9]+)?(\/.*)?$/i;
    if (!urlPattern.test(websiteUrl)) {
      return {
        valid: false,
        formSourceLabel: formSourceLabel,
        email: email,
        error: 'Please enter a valid Website / Store URL (e.g., https://yourwebsite.com) or leave it blank.',
      };
    }
  }

  var monthlyBudget = cleanString_(payload.monthlyBudget, 80);

  return {
    valid: true,
    data: {
      sourceKey: rawSource,
      formSourceLabel: formSourceLabel,
      fullName: fullName,
      email: email,
      whatsapp: whatsapp,
      websiteUrl: websiteUrl,
      service: service,
      monthlyBudget: monthlyBudget,
      projectDetails: projectDetails,
    },
  };
}

function checkDuplicateAndRateLimit_(data) {
  var cache = CacheService.getScriptCache();

  // Duplicate check (same email + source + service + details within 60 seconds)
  var fingerprintRaw = [
    data.email,
    data.formSourceLabel,
    data.service,
    data.projectDetails.slice(0, 200),
  ].join('|');
  var fingerprintHash = md5Hex_(fingerprintRaw);
  var dupKey = 'dup_' + fingerprintHash;

  if (cache.get(dupKey)) {
    return {
      blocked: true,
      code: 'DUPLICATE_SUBMISSION',
      error: 'We already received this inquiry moments ago. Please wait a minute before sending again.',
    };
  }

  // Per-email rate limit (max 5 submissions per 10 minutes)
  var rateKey = 'rate_' + md5Hex_(data.email);
  var currentCount = Number(cache.get(rateKey) || '0');
  if (currentCount >= CONFIG.MAX_SUBMISSIONS_PER_WINDOW) {
    return {
      blocked: true,
      code: 'RATE_LIMITED',
      error: 'Too many submissions from this email in a short time. Please try again later or message on WhatsApp.',
    };
  }

  return { blocked: false };
}

function markSubmissionProcessed_(data) {
  var cache = CacheService.getScriptCache();

  var fingerprintRaw = [
    data.email,
    data.formSourceLabel,
    data.service,
    data.projectDetails.slice(0, 200),
  ].join('|');
  var dupKey = 'dup_' + md5Hex_(fingerprintRaw);
  cache.put(dupKey, '1', CONFIG.DUPLICATE_WINDOW_SECONDS);

  var rateKey = 'rate_' + md5Hex_(data.email);
  var currentCount = Number(cache.get(rateKey) || '0');
  cache.put(rateKey, String(currentCount + 1), CONFIG.RATE_LIMIT_WINDOW_SECONDS);
}

function getTargetSpreadsheet_() {
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }

  var scriptProps = PropertiesService.getScriptProperties();
  var spreadsheetId = scriptProps.getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID Script Property is missing for standalone deployment.');
  }

  return SpreadsheetApp.openById(spreadsheetId);
}

function ensureLeadsSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(CONFIG.LEADS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.LEADS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(LEADS_HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, LEADS_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#090D14');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, LEADS_HEADERS.length);
  }

  return sheet;
}

function ensureLogsSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(CONFIG.LOGS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.LOGS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(LOGS_HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, LOGS_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#18181B');
    headerRange.setFontColor('#A3E635');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function logSubmission_(submissionId, outcome, formSource, email, message) {
  try {
    var ss = getTargetSpreadsheet_();
    var logsSheet = ensureLogsSheet_(ss);
    var timezone = ss.getSpreadsheetTimeZone() || Session.getScriptTimeZone() || 'UTC';
    var timestamp = Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd HH:mm:ss z');

    logsSheet.appendRow([
      timestamp,
      submissionId || '-',
      outcome,
      sanitizeForSheet_(formSource || '-'),
      sanitizeForSheet_(email || '-'),
      sanitizeForSheet_(cleanString_(message, 500)),
    ]);
  } catch (err) {
    Logger.log('Logging failed: ' + err);
  }
}

function sendLeadNotificationEmail_(lead) {
  var subject = CONFIG.EMAIL_SUBJECT_PREFIX + ' — ' + lead.fullName + ' (' + lead.submissionId + ')';

  var cleanDigits = lead.whatsapp ? lead.whatsapp.replace(/[^0-9]/g, '') : '';
  var waUrl = cleanDigits.length >= 6 ? 'https://wa.me/' + cleanDigits : '';

  var plainTextLines = [
    'NEW CLIENT INQUIRY RECEIVED',
    '========================================',
    'Submission ID:      ' + lead.submissionId,
    'Submission Type:    ' + lead.formSourceLabel,
    'Date & Time:        ' + lead.formattedDateTime,
    'Lead Status:        ' + CONFIG.DEFAULT_LEAD_STATUS,
    '----------------------------------------',
    'Full Name:          ' + lead.fullName,
    'Email Address:      ' + lead.email,
    'WhatsApp Number:    ' + (lead.whatsapp || 'Not provided'),
    'Website / Store URL:' + ' ' + (lead.websiteUrl || 'Not provided'),
    'Primary Service:    ' + lead.service,
  ];

  if (lead.monthlyBudget) {
    plainTextLines.push('Monthly Ad Spend:   ' + lead.monthlyBudget);
  }

  plainTextLines.push('----------------------------------------');
  plainTextLines.push('Project Details:');
  plainTextLines.push(lead.projectDetails);
  plainTextLines.push('========================================');

  var htmlBody =
    '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:24px;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#09090b;">' +
    '  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;box-shadow:0 12px 30px rgba(9,9,11,0.08);">' +
    '    <div style="background:#090d14;padding:28px 32px;color:#ffffff;">' +
    '      <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(163,230,53,0.16);border:1px solid rgba(163,230,53,0.4);color:#a3e635;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">' +
    escapeHtml_(lead.formSourceLabel) +
    '      </span>' +
    '      <h1 style="margin:14px 0 6px;font-size:22px;line-height:1.25;font-weight:700;color:#ffffff;">New Client Inquiry Received</h1>' +
    '      <p style="margin:0;font-size:13px;color:#a1a1aa;font-family:monospace;">ID: ' +
    escapeHtml_(lead.submissionId) +
    ' &bull; Status: New</p>' +
    '    </div>' +
    '    <div style="padding:28px 32px;">' +
    '      <table style="width:100%;border-collapse:collapse;font-size:14px;">' +
    emailRow_('Submission Type', lead.formSourceLabel) +
    emailRow_('Submission Date & Time', lead.formattedDateTime) +
    emailRow_('Full Name', lead.fullName) +
    emailRow_('Email Address', '<a href="mailto:' + escapeHtml_(lead.email) + '" style="color:#047857;font-weight:600;text-decoration:none;">' + escapeHtml_(lead.email) + '</a>', true) +
    emailRow_(
      'WhatsApp Number',
      lead.whatsapp
        ? escapeHtml_(lead.whatsapp) +
            (waUrl ? ' &nbsp;(<a href="' + escapeHtml_(waUrl) + '" style="color:#047857;font-weight:600;text-decoration:none;">Open WhatsApp</a>)' : '')
        : '<span style="color:#71717a;">Not provided</span>',
      true
    ) +
    emailRow_(
      'Website / Store URL',
      lead.websiteUrl
        ? '<a href="' + escapeHtml_(lead.websiteUrl) + '" target="_blank" style="color:#047857;font-weight:600;text-decoration:none;">' + escapeHtml_(lead.websiteUrl) + '</a>'
        : '<span style="color:#71717a;">Not provided</span>',
      true
    ) +
    emailRow_('Primary Service Needed', '<strong>' + escapeHtml_(lead.service) + '</strong>', true) +
    (lead.monthlyBudget ? emailRow_('Estimated Monthly Ad Spend', lead.monthlyBudget) : '') +
    '      </table>' +
    '      <div style="margin-top:24px;">' +
    '        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#52525b;margin-bottom:8px;">Project Details</div>' +
    '        <div style="padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;font-size:14px;line-height:1.65;color:#18181b;white-space:pre-wrap;">' +
    escapeHtml_(lead.projectDetails) +
    '        </div>' +
    '      </div>' +
    '      <div style="margin-top:26px;padding-top:20px;border-top:1px solid #e4e4e7;">' +
    '        <a href="mailto:' + escapeHtml_(lead.email) + '?subject=' + encodeURIComponent('Re: Your Inquiry — Zahidul Islam') + '" style="display:inline-block;padding:11px 20px;background:#09090b;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;border-radius:10px;margin-right:8px;">Reply via Email</a>' +
    (waUrl
      ? '<a href="' + escapeHtml_(waUrl) + '" target="_blank" style="display:inline-block;padding:11px 20px;background:#10b981;color:#09090b;text-decoration:none;font-weight:700;font-size:13px;border-radius:10px;">Message on WhatsApp</a>'
      : '') +
    '      </div>' +
    '    </div>' +
    '    <div style="padding:16px 32px;background:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;">' +
    '      Automated lead notification from zahidul-islam portfolio &bull; Saved to Google Sheets (' + escapeHtml_(lead.submissionId) + ')' +
    '    </div>' +
    '  </div>' +
    '</body></html>';

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    replyTo: lead.email,
    subject: subject,
    body: plainTextLines.join('\n'),
    htmlBody: htmlBody,
  });
}

function emailRow_(label, value, isRawHtml) {
  return (
    '<tr>' +
    '  <td style="padding:10px 12px 10px 0;border-bottom:1px solid #f4f4f5;color:#71717a;width:38%;vertical-align:top;font-weight:500;">' +
    escapeHtml_(label) +
    '</td>' +
    '  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;color:#09090b;font-weight:500;vertical-align:top;">' +
    (isRawHtml ? value : escapeHtml_(value)) +
    '</td>' +
    '</tr>'
  );
}

function generateSubmissionId_(dateObj) {
  var datePart = Utilities.formatDate(dateObj, 'UTC', 'yyyyMMdd');
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var suffix = '';
  for (var i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'LEAD-' + datePart + '-' + suffix;
}

function cleanString_(value, maxLength) {
  if (value === null || value === undefined) return '';
  var str = String(value).replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  if (maxLength && str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
}

function cleanMultilineString_(value, maxLength) {
  if (value === null || value === undefined) return '';
  var str = String(value)
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
  if (maxLength && str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
}

function sanitizeForSheet_(value) {
  var str = value === null || value === undefined ? '' : String(value);
  // Prevent Google Sheets formula injection and protect +phone numbers from #ERROR!
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function escapeHtml_(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function md5Hex_(input) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, input, Utilities.Charset.UTF_8);
  var hex = '';
  for (var i = 0; i < digest.length; i++) {
    var byteVal = digest[i];
    if (byteVal < 0) byteVal += 256;
    var byteStr = byteVal.toString(16);
    if (byteStr.length === 1) byteStr = '0' + byteStr;
    hex += byteStr;
  }
  return hex;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
