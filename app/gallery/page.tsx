import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { Button, Instagram, JsonLd } from "@/components/ui";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "Gallery",
  "Hair, makeup, bridal, skin and salon inspiration from C3 Unisex Salon, Belgaum. Follow @c3_unisex_salon_belgaum for our latest work.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Hair · Makeup · Bridal · Skin · Salon"
        lines={["The C3", "look book"]}
        accent={1}
        intro="Colours, textures and looks we love to create. For our latest client work, follow us on Instagram."
      >
        <Button href={SITE.instagramUrl} variant="outline">
          <Instagram className="size-4" /> Follow @{SITE.instagram}
        </Button>
      </PageHero>
      <GalleryGrid />
      <div className="bg-sand/50">
        <BeforeAfter />
      </div>
      <CtaBand />
      <JsonLd data={breadcrumbSchema("Gallery", "/gallery")} />
    </>
  );
}
