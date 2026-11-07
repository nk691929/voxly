import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import {
  Faq,
  Features,
  FinalCta,
  HowItWorks,
  LanguagesSection,
  Pricing,
} from "@/components/marketing/Sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <LanguagesSection />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
