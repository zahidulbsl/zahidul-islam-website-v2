import { Router, type Request, type Response } from 'express';
import { leadsDb } from './db.js';
import { sendLeadNotificationEmail, isEmailConfigured } from './email.js';
import {
  requireAdminAuth,
  verifyAdminCredentials,
  createAdminSession,
  revokeSessionToken,
  validateSessionToken,
} from './auth.js';
import type { CreateLeadPayload, LeadStatus, LeadSource } from '../types/crm.js';

export const apiRouter = Router();

// ==========================================
// 1. PUBLIC LEAD SUBMISSION (BOTH FORMS)
// ==========================================

apiRouter.post('/leads', async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<CreateLeadPayload>;

    // 1. Validate required fields
    const source: LeadSource =
      body.source === 'consultation_popup' ? 'consultation_popup' : 'contact_section';

    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const service = (body.service || '').trim();

    if (!fullName || fullName.length < 2) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid full name (minimum 2 characters).',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
      return;
    }

    if (!service) {
      res.status(400).json({
        success: false,
        error: 'Please select or specify a service.',
      });
      return;
    }

    // 2. Prevent rapid duplicate submissions (within 45s) via Supabase query
    const isDup = await leadsDb.isDuplicate(email, source, 45);
    if (isDup) {
      res.status(429).json({
        success: false,
        error:
          'A submission from this email was received just moments ago. We already have your inquiry and will be in touch shortly!',
      });
      return;
    }

    // 3. Create persistent lead in Supabase PostgreSQL database
    const newLead = await leadsDb.create({
      source,
      fullName,
      email,
      whatsappNumber: body.whatsappNumber,
      websiteUrl: body.websiteUrl,
      service,
      monthlyBudget: body.monthlyBudget,
      projectDetails: body.projectDetails,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      timezone: body.timezone,
    });

    console.info(`[Supabase CRM Lead Saved] ID: ${newLead.id} from ${source} (${fullName} <${email}>)`);

    // 4. Trigger email notification to NOTIFICATION_EMAIL
    let emailStatus: { success: boolean; simulated?: boolean; reason?: string; messageId?: string } = {
      success: true,
      simulated: true,
    };
    try {
      emailStatus = await sendLeadNotificationEmail(newLead);
    } catch (mailErr: any) {
      console.error('[CRM Lead Email Notification Error]:', mailErr);
      // Track that email delivery failed without failing the lead registration
      emailStatus = { success: false, simulated: false, reason: mailErr?.message || 'SMTP transmission failure' };
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry received successfully! Zahidul will be in touch shortly.',
      lead: {
        id: newLead.id,
        createdAt: newLead.createdAt,
      },
      emailStatus,
    });
  } catch (err: any) {
    console.error('[CRM Create Lead Error]:', err);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while saving your request to the database. Please try again.',
    });
  }
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================

apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body || {};

  if (!password) {
    res.status(400).json({ success: false, error: 'Password is required' });
    return;
  }

  const isValid = verifyAdminCredentials(password, username);
  if (!isValid) {
    console.warn('[Admin Login Failed]', {
      providedUser: username,
      isValid,
    });
    res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    return;
  }

  const session = createAdminSession(username || 'admin');

  // Set secure HTTP-only cookie
  res.cookie('crm_session', session.token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    token: session.token,
    username: session.username,
  });
});

apiRouter.post('/admin/logout', (req: Request, res: Response) => {
  let token = req.cookies?.crm_session;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (token) {
    revokeSessionToken(token);
  }

  res.clearCookie('crm_session');
  res.json({ success: true, message: 'Logged out successfully' });
});

apiRouter.get('/admin/me', (req: Request, res: Response) => {
  let token = req.cookies?.crm_session;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  const isAuthenticated = validateSessionToken(token);
  res.json({
    authenticated: isAuthenticated,
  });
});

// ==========================================
// 3. PROTECTED CRM ADMIN ENDPOINTS (ASYNC SUPABASE)
// ==========================================

apiRouter.get('/leads', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { status, source, service, search, sortBy } = req.query;

    const leads = await leadsDb.getAll({
      status: typeof status === 'string' ? status : undefined,
      source: typeof source === 'string' ? source : undefined,
      service: typeof service === 'string' ? service : undefined,
      search: typeof search === 'string' ? search : undefined,
      sortBy: sortBy === 'oldest' ? 'oldest' : 'newest',
    });

    res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (err: any) {
    console.error('[CRM Fetch Leads Error]:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to fetch leads' });
  }
});

apiRouter.get('/leads/stats', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const stats = await leadsDb.getStats();
    res.json({
      success: true,
      stats,
      isEmailConfigured: isEmailConfigured(),
    });
  } catch (err: any) {
    console.error('[CRM Fetch Stats Error]:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to fetch lead stats' });
  }
});

apiRouter.patch('/leads/:id/status', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body as { status?: LeadStatus; notes?: string };

    const validStatuses: LeadStatus[] = [
      'New',
      'Contacted',
      'In Discussion',
      'Converted',
      'Not Interested',
    ];

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
      return;
    }

    const updated = await leadsDb.updateStatus(id, (status || 'New') as LeadStatus, notes);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }

    res.json({
      success: true,
      lead: updated,
    });
  } catch (err: any) {
    console.error('[CRM Update Status Error]:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to update lead status' });
  }
});

apiRouter.delete('/leads/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await leadsDb.deleteLead(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }

    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err: any) {
    console.error('[CRM Delete Lead Error]:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to delete lead' });
  }
});
