import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { seo, businessSchema } from "@/lib/schema";
import { getBranch } from "@/lib/branch-server";
import { Providers } from "@/components/Providers";
import { BranchPrompt } from "@/components/Branch";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/ui";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: seo.title, template: `%s · ${SITE.name}` },
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export const viewport: Viewport = { themeColor: "#fbf8f4" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const branch = await getBranch();
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-cream"
        >
          Skip to content
        </a>
        <Providers branch={branch.id}>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BranchPrompt />
        </Providers>
        <JsonLd data={businessSchema} />
      </body>
    </html>
  );
}
