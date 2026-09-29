import Image from "next/image";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { Reveal } from "../motion";
import { ArrowLink, Button, Instagram } from "../ui";
import { SectionHeading } from "../SectionHeading";

// Six tiles (two tall, four square) fill an exact 4×2 grid on desktop and 2×4 on phones.
const TILES = [
  { p: IMG.bridalBraid, tall: true },
  { p: IMG.makeupEyes },
  { p: IMG.hairWaves },
  { p: IMG.haircutWomen, tall: true },
  { p: IMG.skinCare },
  { p: IMG.nails },
];

export function GalleryPreview() {
  return (
    <section aria-labelledby="gp-h" className="container-lux py-20 md:py-28">
      <SectionHeading
        id="gp-h"
        eyebrow="Gallery"
        lines={["Looks we", "love to create"]}
        accent={1}
        action={<ArrowLink href="/gallery">View gallery</ArrowLink>}
      />
      <ul className="mt-10 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[240px]">
        {TILES.map((t, i) => (
          <Reveal as="li" key={t.p.alt} delay={i * 0.05} className={t.tall ? "row-span-2" : ""}>
            <div className="group relative h-full overflow-hidden rounded-[1.25rem] bg-sand md:rounded-[1.5rem]">
              <Image
                src={t.p.src}
                alt={t.p.alt}
                fill
                placeholder="blur"
                sizes="(min-width:768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-8 flex justify-center">
        <Button href={SITE.instagramUrl} variant="outline">
          <Instagram className="size-4" /> Follow us @{SITE.instagram}
        </Button>
      </Reveal>
    </section>
  );
}
