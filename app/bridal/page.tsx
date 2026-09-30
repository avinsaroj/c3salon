import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarHeart, Palette, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageReveal, Reveal, SplitReveal } from "@/components/motion";
import { Button, Eyebrow, JsonLd, WhatsAppIcon } from "@/components/ui";
import { IMG, type Photo } from "@/lib/images";
import { bridalFaqsFor, servicesFor } from "@/lib/services";
import { bookHref, waLink } from "@/lib/site";
import { hasMakeup, type Prices } from "@/lib/branches";
import { getBranch } from "@/lib/branch-server";
import { breadcrumbSchema, faqSchema, pageMeta, servicesSchema } from "@/lib/schema";

export const metadata = pageMeta(
  "Bridal Makeup",
  "Bridal, engagement, haldi and pre-wedding makeup at C3 Unisex Salon. Bridal makeup from ₹8000 for a single look in Belgaum. Enquire on WhatsApp.",
  "/bridal",
);

const BRIDAL_MSG = "Hi C3 Unisex Salon, I would like to enquire about bridal makeup.";

// Prices from lib/pricing.ts (Belgaum makeup; the Kolhapur card has none). Each applies to a single look.
const PACKAGES = [
  { name: "Basic Makeup", service: "Makeup", price: "₹2000", desc: "Polished and fresh for parties, functions and family occasions." },
  { name: "Pre-Wedding Makeup", service: "Pre-Wedding Makeup", price: "₹3000", desc: "Camera-friendly looks for shoots and pre-wedding events." },
  { name: "Haldi Makeup", service: "Haldi Makeup", price: "₹4000", desc: "Radiant, fresh and made to celebrate in." },
  { name: "Engagement Makeup", service: "Engagement Makeup", price: "₹5000", desc: "A glowing, elegant look for the big announcement." },
];

const STEPS = [
  { icon: CalendarHeart, t: "Consult", d: "Share your date, outfit, jewellery and the look you love. We listen first." },
  { icon: Palette, t: "Design", d: "We plan a look around your features, your outfit and the occasion." },
  { icon: Sparkles, t: "Celebrate", d: "Relax on the day while our team creates your look." },
];

const EXTRAS: { name: string; price: Prices; image: Photo; service: string }[] = [
  { name: "Ironing / Tong Styling", price: { belgaum: "from ₹300", kolhapur: "from ₹600" }, image: IMG.hairStyling, service: "Styling" },
  { name: "Luxury Facial 24K Gold", price: { belgaum: "₹3000", kolhapur: "₹3500" }, image: IMG.skinGlow, service: "Luxury Facial 24K Gold" },
  { name: "Luxury Manicure & Pedicure", price: { belgaum: "₹1800", kolhapur: "₹2200" }, image: IMG.nails, service: "Manicure" },
];

export default async function BridalPage() {
  const branch = await getBranch();
  const makeup = hasMakeup(branch);
  const faqs = bridalFaqsFor(branch);
  const beauty = servicesFor(branch.id).filter((s) => s.category === "beauty");
  return (
    <>
      <PageHero
        crumb="Bridal"
        eyebrow="Bridal & occasion makeup"
        lines={["Your day.", "Your look."]}
        accent={1}
        intro="Makeup for every ritual, from haldi to the wedding day, designed around you and made to last through every moment and every photograph."
        image={IMG.bridalBraid}
        shape="portrait"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={waLink(branch, BRIDAL_MSG)}>
            <WhatsAppIcon className="size-4" /> Enquire on WhatsApp
          </Button>
          <Button href="#packages" variant="outline">View packages</Button>
        </div>
      </PageHero>

      {/* Signature package */}
      <section id="packages" className="container-lux grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <ImageReveal image={IMG.bridalBouquet} className="mx-auto aspect-[4/5] w-full max-w-[460px] rounded-[2rem]" sizes="(min-width:1024px) 460px, 90vw" parallax={6} />
        <div>
          <Eyebrow>The signature</Eyebrow>
          <h2 className="display mt-5 text-[clamp(3rem,6vw,5rem)]">
            <SplitReveal lines={["Bridal", "makeup"]} accent={1} />
          </h2>
          <Reveal className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Your wedding look, created with care: skin that glows, eyes that hold up to every photograph, and a finish that feels like you.
          </Reveal>
          <Reveal delay={0.1} className="mt-8 inline-flex items-end gap-4 rounded-3xl bg-sand/70 px-6 py-5">
            {makeup ? (
              <div>
                <p className="text-sm text-muted">Single look</p>
                <p className="display text-6xl">₹8000</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted">{branch.name}</p>
                <p className="display text-4xl">Price on request</p>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={waLink(branch, BRIDAL_MSG)}>Book bridal makeup</Button>
            <Button href={bookHref("Bridal Makeup")} variant="outline">Request a date</Button>
          </Reveal>
          <p className="mt-6 text-sm text-muted">
            {makeup
              ? "All makeup services are applicable for a single look only. Additional looks are charged separately."
              : `Makeup isn’t on the ${branch.name} rate card yet. Message us to check availability and prices.`}
          </p>
        </div>
      </section>

      {/* Occasion packages */}
      <section aria-labelledby="occasions-h" className="bg-sand/50 py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading id="occasions-h" eyebrow="Occasion makeup" lines={["For every", "celebration"]} accent={1} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.08}>
                <Link
                  href={bookHref(p.service)}
                  className="group flex h-full min-h-72 flex-col justify-between rounded-[1.75rem] border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between">
                    <span className={`display text-bronze ${makeup ? "text-5xl" : "text-3xl"}`}>{makeup ? p.price : "On request"}</span>
                    <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section aria-labelledby="journey-h" className="container-lux py-20 md:py-28">
        <SectionHeading id="journey-h" eyebrow="How it works" lines={["Your bridal", "journey"]} accent={1} center />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 0.1} className="relative rounded-[1.75rem] border border-line bg-white/60 p-8 text-center">
              <span className="absolute right-6 top-6 text-sm font-bold text-nude">0{i + 1}</span>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-bronze">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="display mt-6 text-3xl">{t}</h3>
              <p className="mt-3 leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Complete the look */}
      <section aria-labelledby="extras-h" className="container-lux pb-12">
        <SectionHeading id="extras-h" eyebrow="Add-ons" lines={["Complete", "the look"]} accent={1} lead="Pair your makeup with styling, skin prep and nail care." />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {EXTRAS.map((e, i) => (
            <Reveal as="li" key={e.name} delay={i * 0.08}>
              <Link href={bookHref(e.service)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sand">
                  <Image src={e.image.src} alt={e.image.alt} fill placeholder="blur" sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105" />
                  <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-sm font-bold backdrop-blur">{e.price[branch.id]}</span>
                </div>
                <h3 className="display mt-4 text-2xl">{e.name}</h3>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <Faq items={faqs} lines={["Bridal", "questions"]} />
      <CtaBand lines={["Say yes to", "your look."]} message={BRIDAL_MSG} />

      {beauty.length > 0 && <JsonLd data={servicesSchema(beauty, branch)} />}
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema("Bridal", "/bridal")} />
    </>
  );
}
