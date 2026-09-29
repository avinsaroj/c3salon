import { IMG, type Photo } from "./images";

/** "from" prices mirror lib/pricing.ts (the printed price list). */
export type CategoryId = "hair" | "beauty" | "skin" | "grooming";

export type Service = { name: string; category: CategoryId; from: string; blurb: string };

export type Category = {
  id: CategoryId;
  title: string;
  tagline: string;
  intro: string;
  from: string;
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
    from: "₹100",
    pricingTab: "hair",
    image: IMG.hairWoman,
  },
  {
    id: "beauty",
    title: "Beauty",
    tagline: "Makeup for every occasion",
    intro:
      "From a polished everyday look to engagement, haldi, pre-wedding and bridal makeup, we design a look that feels like you, only camera-ready.",
    from: "₹2000",
    pricingTab: "makeup",
    image: IMG.makeupArtist,
  },
  {
    id: "skin",
    title: "Skin",
    tagline: "Facials, clean-ups & D-tan",
    intro:
      "Refreshing clean-ups, targeted facials for sensitive and dull skin, and our signature 24K gold facial for luminous, rested skin.",
    from: "₹200",
    pricingTab: "skin",
    image: IMG.facialSerum,
  },
  {
    id: "grooming",
    title: "Grooming",
    tagline: "Beard, threading, waxing & nails",
    intro:
      "Sharp beard work, neat threading, premium waxing and hand and foot care: the finishing details that make everything else look better.",
    from: "₹30",
    pricingTab: "grooming",
    image: IMG.barber,
  },
];

const s = (category: CategoryId, name: string, from: string, blurb: string): Service => ({
  category,
  name,
  from,
  blurb,
});

export const SERVICES: Service[] = [
  s("hair", "Ladies Hair Cut", "₹600", "Shape and finish tailored to your face and lifestyle."),
  s("hair", "Men's Hair Cut", "₹150", "Clean, modern cuts with a precise finish."),
  s("hair", "Child Hair Cut", "₹150", "Gentle, patient styling for young clients."),
  s("hair", "Baby Hair Cut", "₹100", "A calm first trim for the littlest ones."),
  s("hair", "Hair Wash", "₹100", "Relaxing wash, priced by hair length."),
  s("hair", "Blow Dry", "₹200", "Smooth, polished volume that lasts."),
  s("hair", "Styling", "₹300", "Ironing and tong styling for every occasion."),
  s("hair", "Hair Spa", "₹500", "Deep nourishment for softer, healthier hair."),
  s("hair", "Root Touch Up", "₹1000", "Seamless colour at the roots as your hair grows."),
  s("hair", "Global Color", "₹2500", "Rich, even colour from root to tip."),
  s("hair", "Global Highlights", "₹3500", "Dimension and shine, blended with care."),
  s("hair", "Protein Treatment", "₹4500", "Restorative smoothing and strength."),
  s("hair", "Straightening Treatment", "₹4500", "Sleek, manageable hair for months."),
  s("beauty", "Makeup", "₹2000", "Polished everyday and party looks."),
  s("beauty", "Bridal Makeup", "₹8000", "Your wedding-day look, for a single look."),
  s("beauty", "Engagement Makeup", "₹5000", "Camera-ready glow for the big announcement."),
  s("beauty", "Haldi Makeup", "₹4000", "Fresh, radiant and made for the celebration."),
  s("beauty", "Pre-Wedding Makeup", "₹3000", "Effortless looks for shoots and functions."),
  s("skin", "Clean Up", "₹400", "Refresh and clarify tired skin."),
  s("skin", "Facial", "₹1000", "Cleansing, massage and a healthy glow."),
  s("skin", "Premium Facial", "₹2000", "An elevated facial for visible radiance."),
  s("skin", "Luxury Facial 24K Gold", "₹3000", "Our signature indulgence for luminous skin."),
  s("skin", "Sensitive Skin Facial", "₹1500", "Soothing care formulated for delicate skin."),
  s("skin", "Brightening Skin Facial", "₹1500", "Targeted care for an even, brighter tone."),
  s("skin", "Face D-Tan", "₹200", "Lifts tan for a fresher complexion."),
  s("skin", "Hand D-Tan", "₹400", "Restores tone to sun-exposed hands."),
  s("grooming", "Beard", "₹100", "Sharp shaping and clean lines."),
  s("grooming", "Beard Color", "₹200", "Even, natural-looking colour."),
  s("grooming", "Head Massage", "₹200", "Unwind with a soothing scalp massage."),
  s("grooming", "Eyebrows", "₹50", "Neat threading, expertly shaped."),
  s("grooming", "Forehead", "₹30", "Quick, gentle threading."),
  s("grooming", "Upper Lips", "₹30", "Quick, gentle threading."),
  s("grooming", "Chin", "₹30", "Quick, gentle threading."),
  s("grooming", "Waxing", "₹100", "Premium waxing for hands, legs and more."),
  s("grooming", "Manicure", "₹500", "Premium hand care and finish."),
  s("grooming", "Pedicure", "₹700", "Premium foot care and finish."),
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Is C3 a unisex salon for both men and women?",
    a: "Yes. C3 Unisex Salon in Belgaum offers hair, beauty, makeup and grooming services for women, men, children and families.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the booking form, tap WhatsApp to message us, or call +91 99021 06797. Our team will confirm your slot.",
  },
  {
    q: "Why do some hair service prices show a range?",
    a: "Colour, highlights, protein and straightening treatments depend on hair length and density, so the final rate is charged accordingly.",
  },
  {
    q: "Do you offer bridal, engagement and haldi makeup?",
    a: "Yes. We offer bridal, engagement, haldi and pre-wedding makeup along with basic makeup.",
  },
  {
    q: "Do you cut children's and babies' hair?",
    a: "Yes. We offer child and baby haircuts, and a separate rate for girls under 10 with shoulder-to-long hair.",
  },
];

export const BRIDAL_FAQS: Faq[] = [
  {
    q: "Does the bridal makeup price include more than one look?",
    a: "No. All makeup prices apply to a single look. Additional looks are charged separately.",
  },
  {
    q: "Which occasion makeup do you offer?",
    a: "Basic, pre-wedding, haldi, engagement and bridal makeup.",
  },
  {
    q: "How do I book bridal makeup?",
    a: "Message us on WhatsApp or call +91 99021 06797 with your date and function details, and our team will get back to you.",
  },
  {
    q: "Can I book hair styling and skin care before the wedding?",
    a: "Yes. Ironing and tong styling, facials including our 24K gold facial, and manicures and pedicures can all be booked alongside your makeup.",
  },
];
