/**
 * CC0 photography (StockSnap / WordPress Photo Directory via Openverse).
 * Credits: assets/CREDITS.md. These are mood images, not client results;
 * swap in the salon's own work as it becomes available. Static imports give
 * next/image intrinsic sizes and blur placeholders.
 */
import barber from "@/assets/barber.jpg";
import beard from "@/assets/beard.jpg";
import bridalBouquet from "@/assets/bridal-bouquet.jpg";
import bridalBraid from "@/assets/bridal-braid.jpg";
import bridalDetail from "@/assets/bridal-detail.jpg";
import facialSerum from "@/assets/facial-serum.jpg";
import hairColor from "@/assets/hair-color.jpg";
import hairStyling from "@/assets/hair-styling.jpg";
import hairWaves from "@/assets/hair-waves.jpg";
import hairWoman from "@/assets/hair-woman.jpg";
import haircutMen from "@/assets/haircut-men.jpg";
import haircutWomen from "@/assets/haircut-women.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import makeupArtist from "@/assets/makeup-artist.jpg";
import makeupEyes from "@/assets/makeup-eyes.jpg";
import makeupTools from "@/assets/makeup-tools.jpg";
import massage from "@/assets/massage.jpg";
import nails from "@/assets/nails.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import salonTools from "@/assets/salon-tools.jpg";
import skinCare from "@/assets/skin-care.jpg";
import skinGlow from "@/assets/skin-glow.jpg";
import skinPortrait from "@/assets/skin-portrait.jpg";
import type { StaticImageData } from "next/image";

export type Photo = { src: StaticImageData; alt: string };

const p = (src: StaticImageData, alt: string): Photo => ({ src, alt });

export const IMG = {
  barber: p(barber, "Barber trimming a man's hair with clippers"),
  beard: p(beard, "Beard being shaped with a straight razor"),
  bridalBouquet: p(bridalBouquet, "Bride holding a white bouquet"),
  bridalBraid: p(bridalBraid, "Smiling bride with a braided hairstyle and flowers"),
  bridalDetail: p(bridalDetail, "Bridal necklace and gown detail"),
  facialSerum: p(facialSerum, "Woman applying facial serum with a dropper"),
  hairColor: p(hairColor, "Soft blonde highlighted hair"),
  hairStyling: p(hairStyling, "Hair set in rollers for styling"),
  hairWaves: p(hairWaves, "Woman with soft golden waves"),
  hairWoman: p(hairWoman, "Woman running a hand through glossy dark hair"),
  haircutMen: p(haircutMen, "Stylist cutting a man's hair with scissors"),
  haircutWomen: p(haircutWomen, "Stylist trimming hair with scissors"),
  heroPortrait: p(heroPortrait, "Woman with a sleek ponytail and glowing skin"),
  makeupArtist: p(makeupArtist, "Makeup artist applying lipstick to a client"),
  makeupEyes: p(makeupEyes, "Eyeliner and lip makeup being applied"),
  makeupTools: p(makeupTools, "Makeup brushes and eyeshadow palette"),
  massage: p(massage, "Relaxing massage treatment"),
  nails: p(nails, "Nail technician painting nails"),
  salonInterior: p(salonInterior, "Modern salon with styling chairs"),
  salonTools: p(salonTools, "Salon tools laid out on a wooden counter"),
  skinCare: p(skinCare, "Smiling woman in a towel applying skin cream"),
  skinGlow: p(skinGlow, "Woman with radiant, glowing skin"),
  skinPortrait: p(skinPortrait, "Portrait of a woman with clear, radiant skin"),
} satisfies Record<string, Photo>;
