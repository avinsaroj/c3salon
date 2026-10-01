import { IMG, type Photo } from "./images";
import { hasMakeup, type Branch } from "./branches";
import { priceKey as k, priceLines } from "./pricing";

export type CategoryId = "hair" | "beauty" | "skin" | "grooming";

/** A service as offered at one branch. */
export type Service = { name: string; category: CategoryId; from: string; blurb: string };

/**
 * `lines` are the price list lines a service covers: priceKey()s, or group()
 * for every line in a group. Its "from" price is the cheapest of those in the
 * branch's live price list; a branch with none of them doesn't offer it.
 */
type ServiceDef = Omit<Service, "from"> & { lines: string[] };

export type Category = {
  id: CategoryId;
  title: string;
  tagline: string;
  intro: string;
  /** Price list tab; its cheapest line is the category's "from" price. */
  pricingTab: string;
  image: Photo;
};

export const CATEGORIES: Category[] = [
  {
    id: "hair",
    title: "Hair",
    tagline: "Cuts, colour, spa & treatments",
    intro:
      "Precision cuts for every age, rich global colour and highlights, and restorative spa, protein and straightening treatments, all tailored to your hair's length and texture.",
    pricingTab: "hair",
    image: IMG.hairWoman,
  },
  {
    id: "beauty",
    title: "Beauty",
    tagline: "Makeup for every occasion",
    intro:
      "From a polished everyday look to engagement, haldi, pre-wedding and bridal makeup, we design a look that feels like you, only camera-ready.",
    pricingTab: "makeup",
    image: IMG.makeupArtist,
  },
  {
    id: "skin",
    title: "Skin",
    tagline: "Facials, clean-ups & D-tan",
    intro:
      "Refreshing clean-ups, targeted facials for sensitive and dull skin, and our signature 24K gold facial for luminous, rested skin.",
    pricingTab: "skin",
    image: IMG.facialSerum,
  },
  {
    id: "grooming",
    title: "Grooming",
    tagline: "Beard, threading, waxing & nails",
    intro:
      "Sharp beard work, neat threading, premium waxing and hand and foot care: the finishing details that make everything else look better.",
    pricingTab: "grooming",
    image: IMG.barber,
  },
];

const s = (category: CategoryId, name: string, lines: string[], blurb: string): ServiceDef => ({ category, name, lines, blurb });
const group = (tab: string, title: string) => k(tab, title, "");

const ALL_SERVICES: ServiceDef[] = [
  s("hair", "Ladies Hair Cut", [k("hair", "Hair Cut", "Ladies Hair Cut")], "Shape and finish tailored to your face and lifestyle."),
  s("hair", "Men's Hair Cut", [k("hair", "Hair Cut", "Men's Hair Cut"), k("hair", "Hair Cut", "Adult Hair Cut")], "Clean, modern cuts with a precise finish."),
  s("hair", "Child Hair Cut", [k("hair", "Hair Cut", "Child Hair Cut")], "Gentle, patient styling for young clients."),
  s("hair", "Baby Hair Cut", [k("hair", "Hair Cut", "Baby Hair Cut")], "A calm first trim for the littlest ones."),
  s("hair", "Hair Wash", [group("hair", "Hair Wash")], "Relaxing wash, priced by hair length."),
  s("hair", "Blow Dry", [group("hair", "Blow Dry")], "Smooth, polished volume that lasts."),
  s("hair", "Styling", [group("hair", "Styling")], "Ironing and tong styling for every occasion."),
  s("hair", "Hair Spa", [group("hair", "Hair Spa")], "Deep nourishment for softer, healthier hair."),
  s("hair", "Root Touch Up", [group("hair", "Root Touchup")], "Seamless colour at the roots as your hair grows."),
  s("hair", "Global Color", [k("hair", "Global Color · Virgin Hair", "Shoulder length")], "Rich, even colour from root to tip."),
  s("hair", "Global Highlights", [k("hair", "Global Highlights · Virgin Hair", "Shoulder length")], "Dimension and shine, blended with care."),
  s("hair", "Protein Treatment", [group("hair", "Protein Treatment")], "Restorative smoothing and strength."),
  s("hair", "Straightening Treatment", [group("hair", "Straightening Treatment")], "Sleek, manageable hair for months."),
  s("beauty", "Makeup", [k("makeup", "Makeup", "Basic Makeup")], "Polished everyday and party looks."),
  s("beauty", "Bridal Makeup", [k("makeup", "Makeup", "Bridal Makeup")], "Your wedding-day look, for a single look."),
  s("beauty", "Engagement Makeup", [k("makeup", "Makeup", "Engagement Makeup")], "Camera-ready glow for the big announcement."),
  s("beauty", "Haldi Makeup", [k("makeup", "Makeup", "Haldi Makeup")], "Fresh, radiant and made for the celebration."),
  s("beauty", "Pre-Wedding Makeup", [k("makeup", "Makeup", "Pre-Wedding Makeup")], "Effortless looks for shoots and functions."),
  s("skin", "Clean Up", [k("skin", "Skin · Facials", "Clean Up")], "Refresh and clarify tired skin."),
  s("skin", "Advance Clean Up", [k("skin", "Skin · Facials", "Advance Clean Up")], "A deeper clean-up for congested, tired skin."),
  s("skin", "Facial", [k("skin", "Skin · Facials", "Facial")], "Cleansing, massage and a healthy glow."),
  s("skin", "Mini Facial", [k("skin", "Skin · Facials", "Mini Facial")], "A quick facial for an instant, healthy glow."),
  s("skin", "Premium Facial", [k("skin", "Skin · Facials", "Premium Facial")], "An elevated facial for visible radiance."),
  s("skin", "Luxury Facial 24K Gold", [k("skin", "Skin · Facials", "Luxury Facial 24K Gold")], "Our signature indulgence for luminous skin."),
  s("skin", "Sensitive Skin Facial", [k("skin", "Skin · Facials", "Advance Facial · Sensitive Skin")], "Soothing care formulated for delicate skin."),
  s("skin", "Brightening Skin Facial", [k("skin", "Skin · Facials", "Advance Facial · Brightening Skin")], "Targeted care for an even, brighter tone."),
  s("skin", "Peel Treatment", [group("skin", "Skin Treatment · Peel")], "Targeted peels for lightening, acne-prone, dehydrated and ageing skin."),
  s("skin", "Face D-Tan", [k("skin", "Skin · Facials", "Face D-Tan")], "Lifts tan for a fresher complexion."),
  s("skin", "Hand D-Tan", [k("skin", "Skin · Facials", "Hand D-Tan")], "Restores tone to sun-exposed hands."),
  s("grooming", "Beard", [k("grooming", "Beard & Massage", "Beard")], "Sharp shaping and clean lines."),
  s("grooming", "Beard Color", [k("grooming", "Beard & Massage", "Beard Color")], "Even, natural-looking colour."),
  s("grooming", "Head Massage", [k("grooming", "Beard & Massage", "Gents Head Massage"), k("grooming", "Beard & Massage", "Ladies Head Massage")], "Unwind with a soothing scalp massage."),
  s("grooming", "Eyebrows", [k("grooming", "Threading", "Eyebrows")], "Neat threading, expertly shaped."),
  s("grooming", "Forehead", [k("grooming", "Threading", "Forehead")], "Quick, gentle threading."),
  s("grooming", "Upper Lips", [k("grooming", "Threading", "Upperlips")], "Quick, gentle threading."),
  s("grooming", "Chin", [k("grooming", "Threading", "Chin")], "Quick, gentle threading."),
  s("grooming", "Waxing", [group("waxing", "Premium Waxing")], "Premium waxing for hands, legs and more."),
  s("grooming", "Manicure", [k("nails", "Manicure & Pedicure", "Premium Manicure")], "Premium hand care and finish."),
  s("grooming", "Pedicure", [k("nails", "Manicure & Pedicure", "Premium Pedicure")], "Premium foot care and finish."),
];

/** Services on the branch's price list, with that branch's starting price. */
export function servicesFor(branch: Branch): Service[] {
  const all = priceLines(branch.pricing);
  return ALL_SERVICES.flatMap(({ lines, ...rest }) => {
    const prices = all
      .filter((l) => lines.some((key) => (key.endsWith("/") ? l.key.startsWith(key) : l.key === key)))
      .map((l) => l.price.min);
    return prices.length ? [{ ...rest, from: `₹${Math.min(...prices)}` }] : [];
  });
}

export type Faq = { q: string; a: string };

export function faqsFor(b: Branch): Faq[] {
  return [
    {
      q: "Is C3 a unisex salon for both men and women?",
      a: `Yes. C3 Unisex Salon in ${b.name} offers hair, skin and grooming services${hasMakeup(b) ? ", plus makeup," : ""} for women, men, children and families.`,
    },
    {
      q: "How do I book an appointment?",
      a: `Use the booking form, tap WhatsApp to message us, or call ${b.phoneDisplay}. Our team will confirm your slot.`,
    },
    {
      q: "Why do some hair service prices show a range?",
      a: "Colour, highlights, protein and straightening treatments depend on hair length and density, so the final rate is charged accordingly.",
    },
    ...(hasMakeup(b)
      ? [
          {
            q: "Do you offer bridal, engagement and haldi makeup?",
            a: "Yes. We offer bridal, engagement, haldi and pre-wedding makeup along with basic makeup.",
          },
        ]
      : []),
    {
      q: "Do you cut children's and babies' hair?",
      a: "Yes. We offer child and baby haircuts, and a separate rate for girls under 10 with shoulder-to-long hair.",
    },
  ];
}

export function bridalFaqsFor(b: Branch): Faq[] {
  return [
    ...(hasMakeup(b)
      ? [
          {
            q: "Does the bridal makeup price include more than one look?",
            a: "No. All makeup prices apply to a single look. Additional looks are charged separately.",
          },
          {
            q: "Which occasion makeup do you offer?",
            a: "Basic, pre-wedding, haldi, engagement and bridal makeup.",
          },
        ]
      : [
          {
            q: `Is bridal makeup available in ${b.name}?`,
            a: `Makeup isn't on the ${b.name} rate card yet. Message us on WhatsApp and our ${b.name} team will confirm what's available and the price.`,
          },
        ]),
    {
      q: "How do I book bridal makeup?",
      a: `Message us on WhatsApp or call ${b.phoneDisplay} with your date and function details, and our team will get back to you.`,
    },
    {
      q: "Can I book hair styling and skin care before the wedding?",
      a: "Yes. Ironing and tong styling, facials including our 24K gold facial, and manicures and pedicures can all be booked alongside your makeup.",
    },
  ];
}
