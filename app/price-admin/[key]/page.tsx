import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PriceEditor } from "@/components/PriceEditor";
import { getPricing, isAdminKey } from "@/lib/price-store";

export const metadata: Metadata = { title: "Update prices", robots: { index: false, follow: false } };

/** Unlisted: not in the nav or sitemap, and a wrong key is a plain 404. */
export default async function PriceAdminPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isAdminKey(key)) notFound();
  return (
    <section className="container-lux py-16 md:py-24">
      <h1 className="display text-center text-5xl">Update prices</h1>
      <p className="mt-2 text-center text-sm text-muted">Changes show on the price list as soon as you save.</p>
      <PriceEditor adminKey={key} pricing={await getPricing()} />
    </section>
  );
}
