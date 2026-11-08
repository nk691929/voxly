import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/LandingPage";
import { getLandingPage } from "@/config/landing-pages";

const page = getLandingPage("voice-to-notes");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/" + page.slug },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/" + page.slug },
};

export default function Page() {
  return <LandingPage page={page} />;
}
