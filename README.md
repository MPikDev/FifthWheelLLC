# Fifth Wheel LLC — Website

Marketing website and quote-request server for **Fifth Wheel LLC**, a car transportation company.

- **Frontend:** Vite + React + TypeScript, Tailwind CSS v4, React Router
- **Backend:** Node.js + Express (`/server`), emails quote requests to dispatch with Nodemailer over SMTP

## Requirements

- Node.js **20.12 or newer** (22 LTS recommended). Check with `node -v`.

## Setup

```bash
npm install            # installs the frontend and the server (npm workspaces)
cp .env.example .env   # then edit .env with your SMTP settings and dispatch email
```

Add your logo as **`public/logo.png`** (a black logo on a **transparent** background works best; the footer
turns it white automatically). A placeholder logo is included until you replace it.

## Development

```bash
npm run dev
```

This starts both apps together:

| App | URL | Notes |
| --- | --- | --- |
| Website (Vite) | http://localhost:5173 | Hot reloads as you edit |
| Quote server (Express) | http://localhost:3001 | Vite forwards `/api/*` here |

If SMTP isn't configured in `.env`, submitted quotes are **printed in the terminal** instead of emailed, so you
can test the form without sending real email.

Other useful scripts:

```bash
npm run typecheck   # type-check the frontend and server
npm run build       # production build of both
```

## Production

```bash
npm run build   # builds the site into /dist and the server into /server/dist
npm start       # serves the site and the quote API on PORT (default 3001)
```

In production, the Express server serves the built site **and** handles `/api/quote`, so you only run one
process. Put it behind a reverse proxy such as nginx or Caddy for HTTPS, and set `TRUST_PROXY=true` in `.env`
when you do. In production, quote submissions fail with a friendly error (showing your phone number) if SMTP
isn't configured, rather than silently dropping requests.

## Environment variables

All settings live in `.env` (never committed). See `.env.example` for the full list:

| Variable | Purpose |
| --- | --- |
| `PORT` | Server port (default `3001`) |
| `DISPATCH_EMAIL` | Where quote requests are sent |
| `MAIL_FROM` | "From" address on quote emails |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Your email provider's SMTP settings |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MINUTES` | Max quote submissions per IP per window |
| `TRUST_PROXY` | `true` when running behind a reverse proxy |

## Before launch: things to replace

| What | Where |
| --- | --- |
| Email and business hours (phone, address, USDOT/MC are filled in from the FMCSA SAFER record) | `src/config/site.ts` (one file, used site-wide) |
| Logo | `public/logo.png` |
| Photos (placeholder illustrations for now) | `public/images/`, then update `src/config/images.ts` |
| Sample reviews (clearly tagged "Sample review") | `src/content/reviews.ts` — use real reviews and set `sample: false` |
| Company story | `src/pages/About.tsx` (marked `PLACEHOLDER`) |
| Payment terms | `src/content/faqs.tsx` (marked `PLACEHOLDER`) |

Also double-check the service and FAQ copy (`src/content/`) matches how you actually operate, such as transit
times and insurance details.

## Project structure

```
├── public/
│   ├── logo.png              # your logo (placeholder included)
│   └── images/               # all site images, in one place
├── shared/
│   └── quote.ts              # quote form fields + validation, used by BOTH frontend and server
├── server/
│   └── src/
│       ├── index.ts          # Express app: /api/quote, rate limiting, honeypot, serves /dist in production
│       ├── mailer.ts         # builds and sends the dispatch email
│       └── config.ts         # reads .env
└── src/
    ├── config/               # site details (site.ts) and image list (images.ts)
    ├── content/              # services, steps, FAQs, reviews — edit copy here
    ├── components/           # Button, Section, ServiceCard, StepCard, TestimonialCard, FaqAccordion, QuoteForm, ...
    ├── pages/                # Home, Services, How It Works, About, FAQ, Reviews, Contact
    └── index.css             # Tailwind theme: brand colors and fonts
```

## How the quote form works

1. The form validates in the browser using the shared rules in `shared/quote.ts`, with inline error messages.
2. It POSTs JSON to `/api/quote`.
3. The server checks the hidden **honeypot** field (bots fill it in; those requests are silently dropped),
   applies **per-IP rate limiting**, and validates again with the same shared rules.
4. It emails dispatch with the subject **"New Quote Request – [Pickup] to [Delivery]"**, a highlighted banner
   showing the customer's preferred contact method (email or text), and a note when a motorcycle or inoperable
   vehicle fee applies. Replying to the email goes straight to the customer.

## Brand

Colors are defined as Tailwind theme tokens in `src/index.css`:

- `navy-*`: primary (deep navy, `navy-900` = `#0f2240`)
- `accent-*`: warm amber/orange for buttons and highlights (`accent-500` = `#f28a0b`)
- `surface` / `surface-muted`: white and light gray backgrounds
- Body text uses Tailwind's `slate` grays

Fonts: **Montserrat** for headings, **Inter** for body text (loaded from Google Fonts in `index.html`).
