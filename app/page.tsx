import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { Intro } from "@/components/home/Intro";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { BridalBanner } from "@/components/home/BridalBanner";
import { PricePreview } from "@/components/home/PricePreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { WhyC3 } from "@/components/WhyC3";
import { Testimonials } from "@/components/Testimonials";
import { BookingSection } from "@/components/BookingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Intro />
      <FeaturedCarousel />
      <WhyC3 />
      <BridalBanner />
      <PricePreview />
      <GalleryPreview />
      <Testimonials />
      <BookingSection />
    </>
  );
}
