# GTM / PurposeAds — Salon Deleuran · context & handoff

> Same job as OSMA Klima, Skovbo Byg and D-EL (see `Skovbo Byg/GTM-PURPOSEADS-CONTEXT.md`),
> different container and codebase. If Mikkel reports a problem, start here.

**Container ID: `GTM-NZKL938S`** (sent by Mikkel 2026-10-02, no site named in the mail; set up
on Salon Deleuran at Oliver's instruction). The container already holds a Google Ads tag
(`AW-16795953518`).

## Where it lives

- `lib/gtm.ts` — container ID, the inline Consent Mode default, the GTM snippet (verbatim from
  Mikkel), `pushEvent()` and `updateConsent()`.
- `app/layout.tsx` — both inline scripts in `<head>` (consent default **first**, GTM second) and
  the `<noscript>` iframe as the first thing in `<body>`. Covers every Next.js page.
- `public/tak-for-din-booking.html` — standalone page, so it carries its own copy of the
  consent default + GTM + noscript. Keep in sync with `lib/gtm.ts`.
- `lib/consent.ts` — `setConsent()` now also calls `updateConsent()`. The existing banner
  (`components/ui/cookie-consent.tsx`) and storage key `sd-cookie-consent` (`granted`/`denied`)
  are unchanged; the Meta Pixel is untouched.
- `components/analytics/gtm-events.tsx` — delegated capture-phase listener for tel:/mailto:.

## Event contracts (Custom Event triggers in GTM)

Every event carries `page_path`.

| event | when | extra fields |
|---|---|---|
| `booking_open` | booking box opens (`?booking=true`) | — |
| `booking_click` | "Gå til booking" → Planway | `link_url` |
| `booking_confirmed` | `/tak-for-din-booking` loads (Planway's post-booking redirect) | — |
| `phone_click` / `email_click` | any tel:/mailto: link | `link_url`, `link_location` |
| `consent_update` | visitor answers the banner | `analytics_consent`, `marketing_consent` |

`link_location`: `footer`, `booking` (booking box), `privatlivspolitik` (not a lead — exclude),
`tak-for-booking` (number on the thank-you page), `side` (fallback).

## Things Mikkel needs to know

- **Client-side navigation.** Next.js swaps pages without a page load → per-page pageviews need
  the **History Change** trigger. Opening the booking box also changes the URL
  (`?booking=true`), so History Change fires on that too; `booking_open` is the clean signal.
- **Consent Mode v2.** All four signals denied by default (`wait_for_update: 500`,
  `ads_data_redaction`, `url_passthrough`), granted on "Accepter alle". A returning visitor's
  choice is re-applied before `gtm.js`. Accept the banner when testing.
- **Thank-you page has no banner.** It reads the choice made on the main site (same domain). A
  visitor who never answered stays denied there → Google gets only cookieless pings (modelled).

## Verified 2026-10-02

Production build (`next start`) in headless Chrome over CDP: consent default is first in
`dataLayer` and lands before `gtm.js` on first visit, return-granted, return-denied and the
thank-you page; container returns 200 and initialises; Google hits go out as `gcs=G100` before
consent and `G111` after. All events above fire with the right fields, including after a
client-side navigation. No console errors.
