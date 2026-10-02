# Salon Deleuran website — notes for AI agents

Read this before touching tracking, ads, cookies or anything a partner asked for.
Keep it up to date: add to the history below when something changes.

## The site

- salondeleuran.dk — custom Next.js (App Router) site for Salon Deleuran (owner: Emilie),
  Trekronergade 124A, 2500 Valby. Built and hosted by Oliver Rørbæk (Bison Company).
- Pages switch client-side (no full page reload between pages).
- Booking happens on Planway (external). Every "Book tid" button opens a booking box on our site
  (`?booking=true`); only "Gå til booking" inside the box sends people to Planway.
- `/tak-for-din-booking` is a standalone page (`public/tak-for-din-booking.html`) people land on
  after booking.
- Cookie banner (`components/ui/cookie-consent.tsx`, `lib/consent.ts`): two buttons, "Kun
  nødvendige" / "Accepter alle". Choice stored in localStorage `sd-cookie-consent`.

## Working rules (from Oliver)

- **Partners' requests: do exactly what they ask, nothing more.** No extra events, consent
  wiring, policy edits or "improvements" unless Oliver asks. Partners' setups behind the scenes
  vary; if something is off, it should be on their end, not ours. Spot a problem → tell Oliver in
  one line, don't fix it unasked.
- **Only look at this project.** Don't read or copy from Oliver's other client projects.
- Oliver writes partner replies himself in casual Danish; drafts should match that tone.

## Tracking on the site

| What | Who asked | Where in code |
|---|---|---|
| Meta pixel `1149455719876218` + domain verification | Johannes Rosenkrantz, July 2026 | `components/analytics/meta-pixel.tsx`, `lib/meta-pixel.ts`, `booking-modal.tsx`, `app/layout.tsx` (metadata) |
| Google Tag Manager `GTM-NZKL938S` | Mikkel Dickow (PurposeAds), Oct 2026 | `app/layout.tsx`, `public/tak-for-din-booking.html` |

## History

**July 2026 — Meta pixel (Johannes Rosenkrantz).** Johannes got Oliver's mail from Emilie and set
up her Meta Business Manager. He sent the pixel + domain-verification tag. Installed 14 July
(commit `5424c31`), loading only after "Accepter alle". Events: PageView (all pages),
ViewContent (/behandlinger, /galleri), InitiateCheckout (booking box opens — Johannes asked for
this), Schedule (click on "Gå til booking"). Johannes said the completed booking is tracked as a
Lead on the booking thank-you page. Conversions API (CAPI) was postponed to "next round" — never
done.

**2 Oct 2026 — Google Tag Manager (Mikkel, PurposeAds).** Mikkel sent the standard GTM snippets
(head + noscript) for GTM-NZKL938S, no site named; Oliver confirmed it is for Salon Deleuran.
Installed exactly as sent, on every page incl. `/tak-for-din-booking`, nothing else added
(commit `566d211`; an earlier attempt with extra consent wiring and events was reverted at
Oliver's instruction).

Found while testing, and told Mikkel in Oliver's reply (2 Oct): his container fires Google Ads
(`AW-16795953518`) and the Meta pixel as soon as someone lands, before they answer the cookie
banner. His container uses the same Meta pixel ID as the one already on the site, so people who
accept cookies get counted twice in Meta. The container also already counts a Google Ads
conversion on `/tak-for-din-booking`. Waiting on Mikkel: either it's on purpose, or he says what
to change (e.g. remove the site's own pixel). Don't change anything until he answers.
