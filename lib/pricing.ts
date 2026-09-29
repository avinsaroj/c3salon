/**
 * Source of truth: "SAI PRICE LIST.pdf" (C3 Unisex Salon). Prices are in INR.
 * Where the printed list shows a range it is kept as a range.
 * Page 7 of the PDF holds two overlapping facial/protein price sets; this file
 * uses the set that is visible on the printed page.
 */
export type Price = { min: number; max?: number };
export type Row = { name: string; price: Price; note?: string };
export type Tier = { label: string; price: Price };
export type Group = {
  title: string;
  rows?: Row[];
  tiers?: Tier[];
  /** Shown under length-based groups. */
  lengthNote?: boolean;
  note?: string;
};
export type PriceTab = { id: string; label: string; groups: Group[] };

const p = (min: number, max?: number): Price => ({ min, max });

export function formatPrice({ min, max }: Price) {
  return max ? `₹${min} – ₹${max}` : `₹${min}`;
}

const LEN = ["Shoulder length", "Middle length", "Up to waist", "Below waist"];
const tiers = (prices: Price[], labels = LEN): Tier[] =>
  prices.map((price, i) => ({ label: labels[i], price }));

export const LENGTH_NOTE = "Price depends on hair length and density.";

export const PRICING: PriceTab[] = [
  {
    id: "hair",
    label: "Hair",
    groups: [
      {
        title: "Hair Cut",
        rows: [
          { name: "Ladies Hair Cut", price: p(600) },
          { name: "Shoulder to Long Girl", note: "Under 10 years", price: p(500) },
          { name: "Men's Hair Cut", price: p(150) },
          { name: "Child Hair Cut", price: p(150) },
          { name: "Baby Hair Cut", price: p(100) },
          { name: "Flix Cut", price: p(100) },
        ],
      },
      {
        title: "Hair Wash",
        rows: [{ name: "Gents Hair Wash", price: p(100) }],
        tiers: [
          { label: "Shoulder to middle length", price: p(200) },
          { label: "Up to waist", price: p(250) },
          { label: "Below waist", price: p(300) },
        ],
      },
      {
        title: "Blow Dry",
        tiers: [
          { label: "Shoulder to middle length", price: p(200) },
          { label: "Up to waist to below waist", price: p(300) },
        ],
      },
      {
        title: "Styling",
        rows: [
          { name: "Ironing", price: p(300, 600) },
          { name: "Tong", price: p(400, 700) },
        ],
      },
      {
        title: "Hair Spa",
        rows: [{ name: "Gents", price: p(500) }],
        tiers: tiers([p(1000), p(1300), p(1600), p(1800)]),
      },
      {
        title: "Deep Repairing Treatment",
        tiers: tiers([p(1500), p(1800), p(2200), p(2500, 3000)]),
      },
      {
        title: "Root Touchup",
        tiers: [
          { label: "Regular growth", price: p(1000) },
          { label: "Medium growth", price: p(1200) },
          { label: "Long growth", price: p(1500, 1800) },
        ],
      },
      {
        title: "Global Color · Virgin Hair",
        rows: [{ name: "Gents Color", price: p(400) }],
        tiers: tiers([p(2500, 3000), p(3500, 4000), p(4000, 4500), p(4500, 5000)]),
        lengthNote: true,
      },
      {
        title: "Global Color with Pre-lightning",
        tiers: tiers([p(3500), p(4000, 4500), p(5000, 5500), p(6500, 8000)]),
        lengthNote: true,
      },
      {
        title: "Global Highlights · Virgin Hair",
        tiers: tiers([p(3500), p(4000, 4500), p(5000, 5500), p(6000, 7000)]),
        lengthNote: true,
      },
      {
        title: "Global Highlights with Pre-lightning",
        tiers: tiers([p(4500), p(5000, 5500), p(6000, 6500), p(7000, 8000)]),
        lengthNote: true,
      },
      {
        title: "Protein Treatment",
        tiers: tiers([p(4500, 5000), p(5500, 6500), p(6500, 7500), p(6500, 7500)]),
        lengthNote: true,
      },
      {
        title: "Straightening Treatment",
        tiers: tiers([p(4500, 5000), p(5500, 6500), p(6500, 7000), p(6500, 7000)]),
        lengthNote: true,
      },
    ],
  },
  {
    id: "makeup",
    label: "Makeup",
    groups: [
      {
        title: "Makeup",
        rows: [
          { name: "Basic Makeup", price: p(2000) },
          { name: "Engagement Makeup", price: p(5000) },
          { name: "Haldi Makeup", price: p(4000) },
          { name: "Pre-Wedding Makeup", price: p(3000) },
          { name: "Bridal Makeup", price: p(8000) },
        ],
        note: "All the above services are applicable for a single look only. Additional looks are charged separately.",
      },
    ],
  },
  {
    id: "skin",
    label: "Skin",
    groups: [
      {
        title: "Skin · Facials",
        rows: [
          { name: "Face D-Tan", price: p(200) },
          { name: "Hand D-Tan", price: p(400) },
          { name: "Clean Up", price: p(400, 800) },
          { name: "Facial", price: p(1000, 1500) },
          { name: "Advance Facial · Sensitive Skin", price: p(1500) },
          { name: "Advance Facial · Brightening Skin", price: p(1500) },
          { name: "Premium Facial", price: p(2000) },
          { name: "Luxury Facial 24K Gold", price: p(3000) },
        ],
      },
    ],
  },
  {
    id: "waxing",
    label: "Waxing",
    groups: [
      {
        title: "Premium Waxing",
        rows: [
          { name: "Full Hand Waxing", price: p(400) },
          { name: "Half Leg Wax", price: p(400) },
          { name: "Full Leg Wax", price: p(650) },
          { name: "Underarm", price: p(100) },
          { name: "Upperlips & Chin", price: p(100) },
        ],
      },
    ],
  },
  {
    id: "nails",
    label: "Nails",
    groups: [
      {
        title: "Manicure & Pedicure",
        rows: [
          { name: "Premium Manicure", price: p(500) },
          { name: "Premium Pedicure", price: p(700) },
          { name: "Luxury Manicure & Pedicure", price: p(1800) },
        ],
      },
    ],
  },
  {
    id: "grooming",
    label: "Grooming",
    groups: [
      {
        title: "Beard & Massage",
        rows: [
          { name: "Beard", price: p(100) },
          { name: "Beard Color", price: p(200) },
          { name: "Gents Head Massage", price: p(200) },
          { name: "Ladies Head Massage", price: p(400) },
        ],
      },
      {
        title: "Threading",
        rows: [
          { name: "Eyebrows", price: p(50) },
          { name: "Forehead", price: p(30) },
          { name: "Upperlips", price: p(30) },
          { name: "Chin", price: p(30) },
        ],
      },
    ],
  },
];
