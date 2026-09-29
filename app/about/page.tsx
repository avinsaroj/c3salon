import { PageHero } from "@/components/PageHero";
import { WhyC3 } from "@/components/WhyC3";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageReveal, Reveal } from "@/components/motion";
import { JsonLd } from "@/components/ui";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "About Us",
  "C3 Unisex Salon is a modern hair, beauty and grooming salon in Belgaum built around personal consultation, professional stylists and premium care.",
  "/about",
);

const PILLARS = [
  {
    word: "Cut",
    image: IMG.haircutWomen,
    text: "Precision cutting for women, men and children. Every cut starts with how you wear your hair day to day, not just how it looks leaving the chair.",
  },
  {
    word: "Color",
    image: IMG.hairColor,
    text: "Global colour, highlights and root touch-ups, applied with care for your hair's length, density and health, so it looks rich and stays that way.",
  },
  {
    word: "Care",
    image: IMG.facialSerum,
    text: "Spa, protein and repair treatments for hair; facials, clean-ups and D-tan for skin; and the grooming details that finish everything off.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Our story"
        lines={["More than", "a salon."]}
        accent={1}
        intro="C3 Unisex Salon is a modern space in Belgaum for hair, beauty and grooming, where every visit begins with listening."
        image={IMG.salonInterior}
      />

      <section className="container-lux py-20 md:py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.15]">
            We believe great hair and beauty begin with a conversation. So we take the time to understand you, then{" "}
            <span className="italic text-bronze">bring real expertise to every detail.</span>
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="pillars-h" className="bg-sand/50 py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading id="pillars-h" eyebrow="What we stand for" lines={["Cut. Color.", "Care."]} accent={1} center />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.word} delay={i * 0.1} className="overflow-hidden rounded-[2rem] bg-cream">
                <ImageReveal image={p.image} className="aspect-[4/3]" sizes="(min-width:768px) 33vw, 100vw" />
                <div className="p-8">
                  <p className="text-sm font-bold text-bronze">0{i + 1}</p>
                  <h3 className="display mt-2 text-5xl">{p.word}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WhyC3 />

      <section aria-labelledby="space-h" className="container-lux pb-12">
        <SectionHeading id="space-h" eyebrow="The salon" lines={["A calm,", "modern space"]} accent={1} lead="Comfortable chairs, unhurried appointments, and room to switch off." />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <ImageReveal image={IMG.salonTools} className="col-span-2 aspect-[16/10] rounded-[1.75rem]" sizes="(min-width:768px) 50vw, 100vw" />
          <ImageReveal image={IMG.massage} className="aspect-square rounded-[1.75rem] md:aspect-auto" sizes="25vw" />
          <ImageReveal image={IMG.barber} className="aspect-square rounded-[1.75rem] md:aspect-auto" sizes="25vw" />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema("About", "/about")} />
    </>
  );
}
