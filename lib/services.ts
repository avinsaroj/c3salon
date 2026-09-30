import { IMG, type Photo } from "./images";
import { hasMakeup, type Branch, type BranchId, type Prices } from "./branches";

/** "from" prices mirror each branch's price list in lib/pricing.ts. */
export type CategoryId = "hair" | "beauty" | "skin" | "grooming";

/** A service as offered at one branch. */
export type Service = { name: string; category: CategoryId; from: string; blurb: string };

type ServiceDef = Omit<Service, "from"> & { from: Prices };

export type Category = {
  id: CategoryId;
  title: string;
  tagline: string;
  intro: string;
  from: Prices;
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
    from: { belgaum: "₹100", kolhapur: "₹100" },
    pricingTab: "hair",
    image: IMG.hairWoman,
  },
  {
    id: "beauty",
    title: "Beauty",
    tagline: "Makeup for every occasion",
    intro:
      "From a polished everyday look to engagement, haldi, pre-wedding and bridal makeup, we design a look that feels like you, only camera-ready.",
    from: { belgaum: "₹2000" },
    pricingTab: "makeup",
    image: IMG.makeupArtist,
  },
  {
    id: "skin",
    title: "Skin",
    tagline: "Facials, clean-ups & D-tan",
    intro:
      "Refreshing clean-ups, targeted facials for sensitive and dull skin, and our signature 24K gold facial for luminous, rested skin.",
    from: { belgaum: "₹200", kolhapur: "₹400" },
    pricingTab: "skin",
    image: IMG.facialSerum,
  },
  {
    id: "grooming",
    title: "Grooming",
    tagline: "Beard, threading, waxing & nails",
    intro:
      "Sharp beard work, neat threading, premium waxing and hand and foot care: the finishing details that make everything else look better.",
    from: { belgaum: "₹30", kolhapur: "₹30" },
    pricingTab: "grooming",
    image: IMG.barber,
  },
];

const s = (category: CategoryId, name: string, belgaum: string | undefined, kolhapur: string | undefined, blurb: string): ServiceDef => ({
  category,
  name,
  from: { belgaum, kolhapur },
  blurb,
});

const ALL_SERVICES: ServiceDef[] = [
  s("hair", "Ladies Hair Cut", "₹600", "₹600", "Shape and finish tailored to your face and lifestyle."),
  s("hair", "Men's Hair Cut", "₹150", "₹250", "Clean, modern cuts with a precise finish."),
  s("hair", "Child Hair Cut", "₹150", "₹200", "Gentle, patient styling for young clients."),
  s("hair", "Baby Hair Cut", "₹100", "₹150", "A calm first trim for the littlest ones."),
  s("hair", "Hair Wash", "₹100", "₹100", "Relaxing wash, priced by hair length."),
  s("hair", "Blow Dry", "₹200", "₹200", "Smooth, polished volume that lasts."),
  s("hair", "Styling", "₹300", "₹600", "Ironing and tong styling for every occasion."),
  s("hair", "Hair Spa", "₹500", "₹800", "Deep nourishment for softer, healthier hair."),
  s("hair", "Root Touch Up", "₹1000", "₹1000", "Seamless colour at the roots as your hair grows."),
  s("hair", "Global Color", "₹2500", "₹3000", "Rich, even colour from root to tip."),
  s("hair", "Global Highlights", "₹3500", "₹3500", "Dimension and shine, blended with care."),
  s("hair", "Protein Treatment", "₹4500", "₹5000", "Restorative smoothing and strength."),
  s("hair", "Straightening Treatment", "₹4500", "₹4500", "Sleek, manageable hair for months."),
  s("beauty", "Makeup", "₹2000", undefined, "Polished everyday and party looks."),
  s("beauty", "Bridal Makeup", "₹8000", undefined, "Your wedding-day look, for a single look."),
  s("beauty", "Engagement Makeup", "₹5000", undefined, "Camera-ready glow for the big announcement."),
  s("beauty", "Haldi Makeup", "₹4000", undefined, "Fresh, radiant and made for the celebration."),
  s("beauty", "Pre-Wedding Makeup", "₹3000", undefined, "Effortless looks for shoots and functions."),
  s("skin", "Clean Up", "₹400", "₹800", "Refresh and clarify tired skin."),
  s("skin", "Advance Clean Up", undefined, "₹1200", "A deeper clean-up for congested, tired skin."),
  s("skin", "Facial", "₹1000", undefined, "Cleansing, massage and a healthy glow."),
  s("skin", "Mini Facial", undefined, "₹1500", "A quick facial for an instant, healthy glow."),
  s("skin", "Premium Facial", "₹2000", "₹2200", "An elevated facial for visible radiance."),
  s("skin", "Luxury Facial 24K Gold", "₹3000", "₹3500", "Our signature indulgence for luminous skin."),
  s("skin", "Sensitive Skin Facial", "₹1500", "₹2000", "Soothing care formulated for delicate skin."),
  s("skin", "Brightening Skin Facial", "₹1500", "₹2000", "Targeted care for an even, brighter tone."),
  s("skin", "Peel Treatment", undefined, "₹2500", "Targeted peels for lightening, acne-prone, dehydrated and ageing skin."),
  s("skin", "Face D-Tan", "₹200", "₹400", "Lifts tan for a fresher complexion."),
  s("skin", "Hand D-Tan", "₹400", "₹500", "Restores tone to sun-exposed hands."),
  s("grooming", "Beard", "₹100", "₹150", "Sharp shaping and clean lines."),
  s("grooming", "Beard Color", "₹200", "₹400", "Even, natural-looking colour."),
  s("grooming", "Head Massage", "₹200", "₹400", "Unwind with a soothing scalp massage."),
  s("grooming", "Eyebrows", "₹50", "₹50", "Neat threading, expertly shaped."),
  s("grooming", "Forehead", "₹30", "₹30", "Quick, gentle threading."),
  s("grooming", "Upper Lips", "₹30", "₹30", "Quick, gentle threading."),
  s("grooming", "Chin", "₹30", "₹30", "Quick, gentle threading."),
  s("grooming", "Waxing", "₹100", "₹100", "Premium waxing for hands, legs and more."),
  s("grooming", "Manicure", "₹500", "₹700", "Premium hand care and finish."),
  s("grooming", "Pedicure", "₹700", "₹1000", "Premium foot care and finish."),
];

/** Services on the branch's rate card, with that branch's starting price. */
export function servicesFor(branch: BranchId): Service[] {
  return ALL_SERVICES.flatMap(({ from, ...rest }) => (from[branch] ? [{ ...rest, from: from[branch] }] : []));
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
