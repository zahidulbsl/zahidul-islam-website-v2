# Serverless Client Lead Management System — Deployment Guide

This website submits both the **Main Contact Section** and the **Strategy Call / Book Call Popup** directly from the static frontend (GitHub Pages) to a **Google Apps Script Web App**, storing every lead in a private **Google Sheet** and sending a full email notification to `zahidul.pro.bd@gmail.com` via `MailApp`.

---

## 1. Google Sheets Database Setup

1. Sign in to Google Drive with the Google account that owns `zahidul.pro.bd@gmail.com` (or has permission to send email via Gmail/MailApp).
2. Create a new blank **Google Sheet** (for example: `Zahidul Islam — Client Leads Database`).
3. Keep the spreadsheet **Private / Restricted** (`Share -> Restricted` — never set it to "Anyone with the link").
4. In the Google Sheet, open **Extensions → Apps Script**.
5. Delete any starter code in `Code.gs` and paste the entire contents of `google-apps-script/Code.gs` from this repository.
6. Save the project (**Ctrl+S / Cmd+S**) and name it `Zahidul Islam Lead Backend`.

The script automatically creates and formats two tabs on first run:
- **`Leads`**:
  1. `Submission ID`
  2. `Submission Date & Time`
  3. `Form Source` (`Main Contact Section` or `Strategy Call Popup`)
  4. `Full Name`
  5. `Email`
  6. `WhatsApp`
  7. `Website URL`
  8. `Requested Service`
  9. `Project Details`
  10. `Lead Status` (default: `New`)
- **`SubmissionLogs`**: Audit log of accepted submissions, duplicate blocks, validation errors, and spam blocks.

---

## 2. Google Authorization Steps

1. In the Apps Script Editor toolbar, select the function **`setupSheets`** from the function dropdown.
2. Click **Run**.
3. When prompted with **Authorization required**, click **Review permissions**.
4. Choose your Google account.
5. If Google shows *"Google hasn't verified this app"*, click **Advanced → Go to Zahidul Islam Lead Backend (unsafe)** (safe because it is your own private script).
6. Click **Allow** to grant permissions for:
   - **Google Sheets** (`SpreadsheetApp` — to append lead rows and logs)
   - **Send email as you** (`MailApp` — to send lead notifications to `zahidul.pro.bd@gmail.com`)
7. Optional pre-deploy check: Select **`testLeadSubmission`** in the dropdown and click **Run**. Confirm that:
   - A test row appears in the `Leads` tab with `Lead Status = New`.
   - A test email arrives at `zahidul.pro.bd@gmail.com`.
   - Delete the test row afterward if desired.

---

## 3. Deploy as a Google Apps Script Web App

1. In the Apps Script Editor, click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Configure:
   - **Description**: `Production Lead Handler v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(required so visitors on GitHub Pages can submit the public contact forms)*
4. Click **Deploy**.
5. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).
6. Open that URL in a browser tab once to confirm it returns:
   `{"ok":true,"service":"Zahidul Islam Lead Management API","status":"ready",...}`

> Note: Whenever you edit `Code.gs` in the future, use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy** so the same `/exec` URL receives your changes.

---

## 4. Configure the Website Endpoint (GitHub Pages)

Configure the Web App URL in **one** of these ways (never commit Google Sheet IDs or secrets):

### Option A: Vite Build Environment Variable (Recommended for GitHub Actions)
Set `VITE_GOOGLE_APPS_SCRIPT_URL` in your `.env.production` or GitHub Actions build environment:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then run:
```bash
npm run build
```
Deploy the generated `dist/` folder to GitHub Pages.

### Option B: Direct Constant in `src/config/leads.ts`
If building manually without `.env`, set `CONFIGURED_WEB_APP_URL` in `src/config/leads.ts` to your deployed `https://script.google.com/macros/s/.../exec` URL, then run `npm run build` and publish `dist/` to GitHub Pages.

---

## 5. Testing Checklist (Both Forms)

After deploying the Apps Script Web App and configuring `VITE_GOOGLE_APPS_SCRIPT_URL`:

1. **Test Main Contact Section**:
   - Fill out Name, Email, optional WhatsApp & Website URL, Service, Budget, and Project Details.
   - Click **Send Inquiry**.
   - Confirm the inline success screen appears (`Project Inquiry Received`).
   - Confirm a new row is appended in the `Leads` tab with `Form Source = Main Contact Section` and `Lead Status = New`.
   - Confirm an email notification arrives at `zahidul.pro.bd@gmail.com`.
2. **Test Strategy Call / Book Call Popup**:
   - Click **Book a Call** / **Schedule a Call** to open the modal.
   - Fill out Name, Email, optional WhatsApp & Website URL, Service, and Project Details.
   - Click **Request My Free Strategy Session**.
   - Confirm the modal success screen appears (`Strategy Session Requested`).
   - Confirm a new row is appended in the `Leads` tab with `Form Source = Strategy Call Popup` and `Lead Status = New` (previous rows untouched).
   - Confirm an email notification arrives at `zahidul.pro.bd@gmail.com`.
3. **Test Duplicate & Error Protection**:
   - Re-submitting the identical inquiry within 45–60 seconds is safely blocked without creating duplicate rows.
   - Submitting while offline or with an invalid endpoint displays an error banner and preserves all typed form values for retry.
