# C3 Unisex Salon — Design System

Light, warm, editorial. Clean layouts, rounded photography, pill controls, generous whitespace.

## Color
| Token | Value | Use |
|---|---|---|
| `cream` | #fbf8f4 | Page background |
| `sand` / `nude` | #f3ece3 / #e8dccd | Alternate sections, chips, glows |
| `ink` / `ink-soft` | #1e1916 / #2a231f | Text, primary buttons, dark bands, footer |
| `muted` | #6b6059 | Secondary text (≥ 5:1 on cream) |
| `bronze` | #8a6a3a | Accent text/icons on light (≥ 4.5:1 on cream) |
| `gold` | #d9bf8c | Accent on dark backgrounds only |

## Typography
- Display: **Instrument Serif** (400, italic for the accent line). Fluid `clamp()` sizes; tight leading (1.02).
- UI/body: **Plus Jakarta Sans**. Eyebrows: 0.75rem, uppercase, 0.18em tracking, 600.
- Loaded via `next/font` (self-hosted, `display: swap`).

## Layout & spacing
- Container `max-w-[1320px]`, gutters 20px → 40px. Sections `py-24` → `py-32`.
- Radii: images/cards 24–32px, arch hero frames, pills for buttons and tab bars. Soft shadow token `--shadow-soft`.
- Mobile-first; checked at 360 / 390 / 430 / 768 / 1024 / 1440 / 1920. Tap targets ≥ 44px.

## Components
`Navbar · Footer · WhatsAppButton · PageHero · SectionHeading · CtaBand · BookingSection (+BookingForm) · Faq · WhyC3 · Testimonials · Pricing · ServicesCatalog · GalleryGrid · BeforeAfter · MapEmbed`, home: `Hero · CategoryCards · Intro · FeaturedCarousel · BridalBanner · PricePreview · GalleryPreview`, primitives in `motion.tsx` and `ui.tsx`.

## Responsive behaviour
- Nav: transparent → frosted cream on scroll; pill menu ≥ 1024px, full-screen menu below.
- Mobile sticky bar (Book Appointment | WhatsApp) < 768px; floating WhatsApp ≥ 768px.
- Category and "Why C3" cards: 2 columns on phones, 4 on desktop. Featured services: swipe carousel with arrow buttons.
- Pricing: accordions on phones (first two open), all groups expanded in a 2-column masonry on tablet/desktop.

## Motion principles
One easing (`cubic-bezier(.22,1,.36,1)`), 0.4–1.1s. Masked line reveals for headings, fade-up for content, soft scale-in for images, subtle hover lifts, magnetic primary CTA, page-transition curtain on client navigation only. `prefers-reduced-motion` removes movement.

## Content rules
- Two branches (Belgaum, Kolhapur) in `lib/branches.ts`; the visitor picks one (cookie `branch`, default Belgaum) and phone, WhatsApp, address, map and prices follow it. The header shows only "UNISEX SALON".
- Prices come only from `lib/pricing.ts` (one list per branch, transcribed from each branch's rate card). Ranges shown verbatim; length-based services carry "Price depends on hair length and density."
- Photos are CC0 mood images (`assets/CREDITS.md`), not client results. No fabricated reviews or before/after results.
