/**
 * Fifth Wheel LLC web server.
 *
 * - POST /api/quote  validates a quote request and emails it to dispatch
 * - GET  /api/health simple health check
 * - In production, also serves the built React site from /dist
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import { normalizeQuote, todayISO, validateQuote } from '../../shared/quote.js';
import { config, smtpConfigured } from './config.js';
import { sendQuoteEmail } from './mailer.js';

const app = express();

app.disable('x-powered-by');
// Set TRUST_PROXY=true when running behind a reverse proxy (nginx, Caddy, a
// hosting platform) so rate limiting sees each visitor's real IP address.
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Simple per-IP rate limit on quote submissions to slow down spam.
const quoteLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many quote requests from this connection. Please wait a few minutes or give us a call.',
  },
});

app.post('/api/quote', quoteLimiter, async (req: Request, res: Response) => {
  const quote = normalizeQuote(req.body);

  // Honeypot: real visitors never see this field. Pretend success so bots
  // don't learn they were caught, but don't send anything.
  if (quote.honeypot) {
    console.warn(`[quote] Honeypot triggered from ${req.ip}; request discarded.`);
    res.json({ ok: true });
    return;
  }

  // Allow yesterday as the earliest date so customers in time zones behind
  // the server aren't rejected late in their day.
  const errors = validateQuote(quote, todayISO(-1));
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, error: 'Please correct the highlighted fields.', fields: errors });
    return;
  }

  try {
    await sendQuoteEmail(quote);
    console.log(`[quote] Request sent: ${quote.pickup} -> ${quote.delivery} (${quote.contactMethod})`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[quote] Failed to send email:', err);
    res.status(502).json({ ok: false, error: 'We couldn’t send your request right now.' });
  }
});

// Unknown API routes return JSON, not the website.
app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// In production, serve the built React app and let React Router handle page URLs.
if (config.isProduction) {
  if (existsSync(config.webDist)) {
    app.use(express.static(config.webDist, { maxAge: '1h', index: false }));
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      res.sendFile(path.join(config.webDist, 'index.html'));
    });
  } else {
    console.warn(`[server] No built site found at ${config.webDist}. Run "npm run build" first.`);
  }
}

// Final error handler (e.g. malformed JSON bodies).
app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status && err.status >= 400 && err.status < 500 ? err.status : 500;
  if (status === 500) console.error('[server] Unexpected error:', err);
  res.status(status).json({ ok: false, error: status === 500 ? 'Something went wrong.' : 'Bad request.' });
});

app.listen(config.port, () => {
  console.log(`[server] Listening on http://localhost:${config.port} (${config.isProduction ? 'production' : 'development'})`);
  if (!smtpConfigured) {
    console.warn(
      config.isProduction
        ? '[server] WARNING: SMTP is not configured. Quote requests will fail until SMTP_HOST and DISPATCH_EMAIL are set in .env.'
        : '[server] SMTP is not configured: quote emails will be printed here instead of sent.',
    );
  }
});
