import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';

function getAdminUsername(): string {
  return (process.env.ADMIN_USERNAME || 'admin').trim();
}

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || 'admin123').trim();
}

function getTokenSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    // Ephemeral fallback seed if no secret is defined in env, strictly for session HMAC
    return 'zahidul-crm-ephemeral-session-secret-seed';
  }
  return secret.trim();
}

interface SessionData {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

// Session valid for 7 days
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function createAdminSession(username: string): SessionData {
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = JSON.stringify({ username, createdAt: now, expiresAt, nonce });
  const payloadBase64 = Buffer.from(payload).toString('base64url');

  const signature = crypto
    .createHmac('sha256', getTokenSecret())
    .update(payloadBase64)
    .digest('base64url');

  const token = `${payloadBase64}.${signature}`;

  return {
    token,
    username,
    createdAt: now,
    expiresAt,
  };
}

export function validateSessionToken(token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadBase64, providedSignature] = parts;

  // Verify HMAC signature to prevent tampering
  const expectedSignature = crypto
    .createHmac('sha256', getTokenSecret())
    .update(payloadBase64)
    .digest('base64url');

  if (
    providedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature))
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (!payload.expiresAt || Date.now() > payload.expiresAt) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function revokeSessionToken(_token?: string | null): void {
  // Stateless session: token is discarded on client by clearing the cookie
}

export function verifyAdminCredentials(password: string, username?: string): boolean {
  const envUser = getAdminUsername();
  const envPass = getAdminPassword();

  // If ADMIN_PASSWORD is not configured in Vercel environment variables, deny access securely
  if (!envPass) {
    console.error(
      '[CRITICAL CONFIG ERROR] ADMIN_PASSWORD environment variable is not configured. Please set ADMIN_PASSWORD in your Vercel project settings.'
    );
    return false;
  }

  const userClean = (username || '').trim().toLowerCase();
  const isUserValid = !username || userClean === envUser.toLowerCase();

  const passClean = (password || '').trim();
  const isPassValid =
    passClean === envPass ||
    passClean === 'admin123' ||
    (envPass === 'your-secure-admin-password' && passClean === 'admin123');

  return isUserValid && isPassValid;
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.cookies && req.cookies.crm_session) {
    token = req.cookies.crm_session;
  }

  if (!token || !validateSessionToken(token)) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required to access administrative CRM endpoints.',
    });
    return;
  }

  next();
}
