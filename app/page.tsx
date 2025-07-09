import Hero from '@/components/Hero';
import OurServicesIntro from "@/components/OurServicesIntro";
import ServicesGrid from "@/components/ServiceGrid";
import ImageSection from "@/components/ImageSection";
import WarrantyCheck from "@/components/WarrantyCheck";

export default function HomePage() {
  return (
      <>
        <Hero />
        <OurServicesIntro />
        <ServicesGrid />
        <ImageSection />
        <WarrantyCheck />
      </>
  );
}
