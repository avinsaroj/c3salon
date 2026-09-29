import { Armchair, HeartHandshake, Scissors, Sparkles } from "lucide-react";
import { IMG } from "@/lib/images";
import { ImageReveal, Reveal, SplitReveal } from "../motion";
import { ArrowLink, Eyebrow } from "../ui";

const POINTS = [
  { icon: Scissors, title: "Professional stylists", text: "Skilled hands for cuts, colour and styling." },
  { icon: Sparkles, title: "Premium services", text: "Quality products and treatments you can feel." },
  { icon: HeartHandshake, title: "Personal consultation", text: "We listen first, then create your look." },
  { icon: Armchair, title: "Comfortable space", text: "A calm, modern salon made for you to unwind." },
];

export function Intro() {
  return (
    <section aria-labelledby="about-h" className="bg-sand/50 py-20 md:py-28">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-[520px]">
          <ImageReveal
            image={IMG.skinPortrait}
            className="aspect-[4/5] w-[82%] rounded-[2rem]"
            sizes="(min-width:1024px) 420px, 80vw"
            parallax={6}
          />
          <div className="absolute -bottom-8 right-0 w-[52%] rounded-[1.75rem] border-[6px] border-cream shadow-[var(--shadow-soft)]">
            <ImageReveal image={IMG.salonInterior} className="aspect-[4/3] rounded-[1.4rem]" sizes="(min-width:1024px) 270px, 50vw" />
          </div>
        </div>

        <div>
          <Eyebrow>About C3</Eyebrow>
          <h2 id="about-h" className="display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)]">
            <SplitReveal lines={["More than a salon.", "It’s your self‑care", "experience."]} accent={1} />
          </h2>
          <Reveal className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            At C3, every visit begins with a conversation. Our professional stylists take time to understand your
            hair, your skin and your style, then bring real expertise to every detail in a calm, modern space.
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.06} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream text-bronze shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <ArrowLink href="/about">Our story</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
