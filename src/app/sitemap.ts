import type { MetadataRoute } from "next";
import { LANDING_PAGES } from "@/config/landing-pages";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...LANDING_PAGES.map((p) => ({ url: `${site.url}/${p.slug}` })),
    { url: `${site.url}/privacy` },
    { url: `${site.url}/terms` },
  ];
}
