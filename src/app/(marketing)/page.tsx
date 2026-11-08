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
import { JsonLd } from "@/components/shared/JsonLd";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: site.name, url: site.url, description: site.description },
            {
              "@type": "SoftwareApplication",
              name: site.name,
              url: site.url,
              description: site.description,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
            },
          ],
        }}
      />
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
