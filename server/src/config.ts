/**
 * Loads server settings from the .env file at the repository root.
 * See .env.example for every available setting.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Walk up from this file until we find the repository root (it has .env.example). */
function findRepoRoot(start: string): string {
  let dir = start;
  while (dir !== path.dirname(dir)) {
    if (existsSync(path.join(dir, '.env.example'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

export const repoRoot = findRepoRoot(here);

// Load .env if present. Values already set in the real environment win, so the
// server also works on hosts that inject environment variables directly.
const envFile = path.join(repoRoot, '.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const env = (key: string, fallback = ''): string => process.env[key]?.trim() || fallback;
const num = (key: string, fallback: number): number => {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  port: num('PORT', 3001),
  dispatchEmail: env('DISPATCH_EMAIL'),
  mailFrom: env('MAIL_FROM', 'Fifth Wheel Website <no-reply@example.com>'),
  smtp: {
    host: env('SMTP_HOST'),
    port: num('SMTP_PORT', 587),
    secure: env('SMTP_SECURE') === 'true',
    user: env('SMTP_USER'),
    pass: env('SMTP_PASS'),
  },
  rateLimit: {
    max: num('RATE_LIMIT_MAX', 5),
    windowMs: num('RATE_LIMIT_WINDOW_MINUTES', 15) * 60 * 1000,
  },
  /** Built frontend (from `npm run build:web`), served by Express in production. */
  webDist: path.join(repoRoot, 'dist'),
} as const;

/** True when enough SMTP settings exist to actually send email. */
export const smtpConfigured = Boolean(config.smtp.host && config.dispatchEmail);
