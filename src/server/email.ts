import nodemailer from 'nodemailer';
import type { Lead } from '../types/crm.js';

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'zahidul.pro.bd@gmail.com';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  reason?: string;
  simulated?: boolean;
}

function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendLeadNotificationEmail(lead: Lead): Promise<EmailDispatchResult> {
  const sourceLabel =
    lead.source === 'consultation_popup'
      ? 'Consultation Request (Popup)'
      : 'Contact Section Inquiry';

  const cleanPhone = lead.whatsappNumber ? lead.whatsappNumber.replace(/[^0-9+]/g, '') : '';
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : null;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Notification - ${lead.id}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090D14; color: #E5E7EB; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #0E131F; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #090D14 0%, #151D2C 100%); padding: 28px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(163,230,53,0.15); color: #a3e635; border: 1px solid rgba(163,230,53,0.3); }
    .id-tag { color: #9CA3AF; font-size: 13px; font-family: monospace; margin-top: 8px; }
    .title { color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 12px 0 0 0; }
    .content { padding: 28px; }
    .table { width: 100%; border-collapse: collapse; }
    .table td { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
    .table td.label { width: 38%; color: #9CA3AF; font-weight: 500; }
    .table td.value { color: #FFFFFF; font-weight: 600; }
    .project-box { margin-top: 20px; padding: 16px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #E5E7EB; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; background: #a3e635; color: #090D14; text-decoration: none; font-weight: 700; border-radius: 8px; font-size: 14px; margin-right: 8px; }
    .btn-secondary { display: inline-block; padding: 12px 20px; background: rgba(255,255,255,0.08); color: #FFFFFF; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 14px; border: 1px solid rgba(255,255,255,0.15); }
    .footer { padding: 16px 28px; background: #070A10; font-size: 12px; color: #6B7280; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">${sourceLabel}</span>
      <div class="id-tag">Lead ID: ${lead.id}</div>
      <h1 class="title">New Client Inquiry Received</h1>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${lead.fullName}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${lead.email}" style="color: #a3e635; text-decoration: none;">${lead.email}</a></td>
        </tr>
        ${
          lead.whatsappNumber
            ? `<tr>
                <td class="label">WhatsApp Number</td>
                <td class="value">${lead.whatsappNumber} ${
                waLink
                  ? `(<a href="${waLink}" style="color: #a3e635; text-decoration: none;">Chat on WhatsApp</a>)`
                  : ''
              }</td>
              </tr>`
            : ''
        }
        ${
          lead.websiteUrl
            ? `<tr>
                <td class="label">Website / Store URL</td>
                <td class="value"><a href="${lead.websiteUrl}" target="_blank" style="color: #a3e635; text-decoration: none;">${lead.websiteUrl}</a></td>
              </tr>`
            : ''
        }
        <tr>
          <td class="label">Requested Service</td>
          <td class="value" style="color: #a3e635;">${lead.service}</td>
        </tr>
        ${
          lead.monthlyBudget
            ? `<tr>
                <td class="label">Estimated Monthly Spend</td>
                <td class="value">${lead.monthlyBudget}</td>
              </tr>`
            : ''
        }
        ${
          lead.preferredDate
            ? `<tr>
                <td class="label">Preferred Consultation Date</td>
                <td class="value">${lead.preferredDate}</td>
              </tr>`
            : ''
        }
        ${
          lead.preferredTime
            ? `<tr>
                <td class="label">Preferred Time Window</td>
                <td class="value">${lead.preferredTime}</td>
              </tr>`
            : ''
        }
        ${
          lead.timezone
            ? `<tr>
                <td class="label">Client Time Zone</td>
                <td class="value">${lead.timezone}</td>
              </tr>`
            : ''
        }
        <tr>
          <td class="label">Submission Source</td>
          <td class="value">${sourceLabel}</td>
        </tr>
        <tr>
          <td class="label">Submission Timestamp</td>
          <td class="value">${new Date(lead.createdAt).toUTCString()}</td>
        </tr>
      </table>

      ${
        lead.projectDetails
          ? `<div style="margin-top: 20px;">
              <strong style="color: #D1D5DB; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Project Details / Message:</strong>
              <div class="project-box">${lead.projectDetails}</div>
            </div>`
          : ''
      }

      <div class="actions">
        <a href="mailto:${lead.email}?subject=Re:%20Strategy%20Consultation%20-%20Zahidul%20Islam&body=Hi%20${encodeURIComponent(
    lead.fullName
  )},%0A%0AThank%20you%20for%20reaching%20out%20regarding%20${encodeURIComponent(
    lead.service
  )}.%0A%0A" class="btn">Reply via Email</a>
        ${
          waLink
            ? `<a href="${waLink}" target="_blank" class="btn-secondary">Message on WhatsApp</a>`
            : ''
        }
      </div>
    </div>
    <div class="footer">
      Sent to ${NOTIFICATION_EMAIL} from Zahidul Pro CRM Server &bull; Lead Ref: ${lead.id}
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
New Lead Received: ${lead.fullName} (${lead.service})
Lead ID: ${lead.id}
Source: ${sourceLabel}
Email: ${lead.email}
${lead.whatsappNumber ? `WhatsApp: ${lead.whatsappNumber}\n` : ''}${
    lead.websiteUrl ? `Website: ${lead.websiteUrl}\n` : ''
  }Service: ${lead.service}
${lead.monthlyBudget ? `Monthly Budget: ${lead.monthlyBudget}\n` : ''}${
    lead.preferredDate ? `Preferred Date: ${lead.preferredDate}\n` : ''
  }${lead.preferredTime ? `Preferred Time: ${lead.preferredTime}\n` : ''}${
    lead.timezone ? `Timezone: ${lead.timezone}\n` : ''
  }Submitted At: ${lead.createdAt}

Project Details:
${lead.projectDetails || 'None provided'}
  `.trim();

  const transporter = getMailTransporter();

  if (!transporter) {
    console.info(
      `[CRM Email Notification] [Simulated Delivery to ${NOTIFICATION_EMAIL}]\n` +
        `New lead received from ${lead.fullName} (${lead.id}).\n` +
        `Note: To send real external emails, set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your environment.\n` +
        `Summary: ${textContent}`
    );
    return {
      success: true,
      simulated: true,
      reason: 'smtp_not_configured',
    };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Zahidul Pro CRM" <${process.env.SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: lead.email,
      subject: `[New Lead - ${lead.id}] ${lead.fullName} (${lead.service})`,
      text: textContent,
      html: htmlContent,
    });

    console.info(`[CRM Email Notification] Delivered successfully to ${NOTIFICATION_EMAIL}: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      simulated: false,
    };
  } catch (error: any) {
    console.error(`[CRM Email Notification] Delivery failed to ${NOTIFICATION_EMAIL}:`, error);
    return {
      success: false,
      reason: error?.message || 'SMTP transmission error',
      simulated: false,
    };
  }
}
