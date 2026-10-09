/**
 * Builds and sends the "New Quote Request" email to dispatch.
 */
import nodemailer, { type Transporter } from 'nodemailer';
import { LABELS, type QuoteRequest } from '../../shared/quote.js';
import { config, smtpConfigured } from './config.js';

let transporter: Transporter | undefined;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  if (smtpConfigured) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });
  } else {
    // No SMTP configured (typical in local development): build the message but
    // print it to the console instead of sending it.
    transporter = nodemailer.createTransport({ jsonTransport: true });
  }
  return transporter;
}

/** Escape user input before placing it in the HTML email. */
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

/** Format YYYY-MM-DD as e.g. "Friday, October 16, 2026". */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Keep the subject on one line and reasonably short. */
const oneLine = (value: string) => value.replace(/\s+/g, ' ').slice(0, 60);

export function buildQuoteEmail(q: QuoteRequest) {
  const contactLabel = q.contactMethod ? LABELS.contactMethod[q.contactMethod] : '';
  const vehicleType = q.vehicleType ? LABELS.vehicleType[q.vehicleType] : '';
  const runs = q.runs ? LABELS.runs[q.runs] : '';
  const service = q.serviceType ? LABELS.serviceType[q.serviceType] : '';
  const vehicle = `${q.vehicleYear} ${q.vehicleMake} ${q.vehicleModel}`;
  const replyHow =
    q.contactMethod === 'text' ? `TEXT the customer at ${q.phone}` : `EMAIL the customer at ${q.email}`;

  const notes: string[] = [];
  if (q.vehicleType === 'motorcycle') notes.push('Motorcycle — additional fee applies.');
  if (q.runs === 'no') notes.push('Inoperable vehicle — additional fee applies (winch/forklift needed).');

  const subject = `New Quote Request – ${oneLine(q.pickup)} to ${oneLine(q.delivery)}`;

  const rows: [string, string][] = [
    ['Name', q.name],
    ['Email', q.email],
    ['Phone', q.phone],
    ['Preferred contact', contactLabel],
    ['Pickup', q.pickup],
    ['Delivery', q.delivery],
    ['Vehicle', vehicle],
    ['Vehicle type', vehicleType],
    ['Runs?', runs],
    ['Service', service],
    ['Preferred pickup date', formatDate(q.pickupDate)],
    ['Notes', q.notes || '—'],
  ];

  const text = [
    `>>> PREFERRED CONTACT: ${contactLabel.toUpperCase()} — please ${replyHow}`,
    ...(notes.length ? ['', ...notes.map((n) => `!! ${n}`)] : []),
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Submitted ${new Date().toLocaleString('en-US')}`,
  ].join('\n');

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#334155;">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border-collapse:collapse;">
    <tr><td style="background:#0f2240;color:#ffffff;padding:20px 24px;">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8;">Fifth Wheel LLC</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px;">New Quote Request</div>
      <div style="font-size:15px;margin-top:4px;">${escapeHtml(q.pickup)} &rarr; ${escapeHtml(q.delivery)}</div>
    </td></tr>
    <tr><td style="padding:20px 24px 0;">
      <div style="background:#fef3c7;border-left:6px solid #f59e0b;padding:14px 16px;border-radius:4px;font-size:16px;color:#78350f;">
        <strong>Preferred contact: ${escapeHtml(contactLabel)}</strong><br>
        Please ${escapeHtml(replyHow)}.
      </div>
      ${notes
        .map(
          (n) =>
            `<div style="margin-top:10px;background:#fff7ed;border-left:6px solid #ea580c;padding:10px 16px;border-radius:4px;color:#7c2d12;">${escapeHtml(n)}</div>`,
        )
        .join('')}
    </td></tr>
    <tr><td style="padding:20px 24px 24px;">
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:15px;">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 12px 8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join('')}
      </table>
      <p style="font-size:12px;color:#94a3b8;margin:16px 0 0;">Sent from the quote form on the Fifth Wheel LLC website.</p>
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

export async function sendQuoteEmail(q: QuoteRequest): Promise<void> {
  if (config.isProduction && !smtpConfigured) {
    // Never pretend a quote went through when it can't reach dispatch.
    throw new Error('SMTP is not configured: set SMTP_HOST and DISPATCH_EMAIL in .env');
  }

  const { subject, text, html } = buildQuoteEmail(q);
  await getTransporter().sendMail({
    from: config.mailFrom,
    to: config.dispatchEmail || 'dispatch@example.com',
    replyTo: `${q.name.replace(/[<>"]/g, '')} <${q.email}>`,
    subject,
    text,
    html,
  });

  if (!smtpConfigured) {
    console.log('\n[quote] SMTP is not configured, so this email was NOT sent. It would have said:\n');
    console.log(`Subject: ${subject}\n\n${text}\n`);
  }
}
