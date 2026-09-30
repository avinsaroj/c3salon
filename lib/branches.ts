import { BELGAUM_PRICING, KOLHAPUR_PRICING, type PriceTab } from "./pricing";

export type BranchId = "belgaum" | "kolhapur";

export type Branch = {
  id: BranchId;
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  reviewUrl: string;
  pricing: PriceTab[];
};

/** A price per branch; a missing key means the branch's rate card doesn't list it. */
export type Prices = Partial<Record<BranchId, string>>;

type BranchInput = Omit<Branch, "directionsUrl" | "mapEmbedUrl" | "reviewUrl"> & { reviewUrl?: string };

function branch(b: BranchInput): Branch {
  const q = encodeURIComponent(`C3 Unisex Salon, ${b.street}, ${b.city} ${b.postalCode}`);
  return {
    ...b,
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${q}`,
    mapEmbedUrl: `https://www.google.com/maps?q=${q}&output=embed`,
    // The printed rate cards have a Google review QR code but no readable URL.
    reviewUrl:
      b.reviewUrl ??
      `https://www.google.com/search?q=${encodeURIComponent(`C3 Unisex Salon ${b.city} reviews`)}`,
  };
}

export const BRANCHES: Branch[] = [
  branch({
    id: "belgaum",
    name: "Belgaum",
    street: "221/2A3, Vaccine Depot Road, near 2nd Railway Gate, Tilakwadi",
    city: "Belgaum",
    region: "Karnataka",
    postalCode: "590006",
    phone: "+919902106797",
    phoneDisplay: "+91 99021 06797",
    whatsapp: "919902106797",
    reviewUrl: process.env.NEXT_PUBLIC_REVIEW_URL_BELGAUM,
    pricing: BELGAUM_PRICING,
  }),
  branch({
    id: "kolhapur",
    name: "Kolhapur",
    street: "Rajarampuri 3rd Lane, behind Mahendra Jewellers",
    city: "Kolhapur",
    region: "Maharashtra",
    postalCode: "416008",
    phone: "+917798001238",
    phoneDisplay: "+91 77980 01238",
    whatsapp: "917798001238",
    reviewUrl: process.env.NEXT_PUBLIC_REVIEW_URL_KOLHAPUR,
    pricing: KOLHAPUR_PRICING,
  }),
];

export const DEFAULT_BRANCH = BRANCHES[0];
export const BRANCH_COOKIE = "branch";

export function branchById(id: string | undefined): Branch {
  return BRANCHES.find((b) => b.id === id) ?? DEFAULT_BRANCH;
}

export function hasMakeup(b: Branch) {
  return b.pricing.some((t) => t.id === "makeup");
}
