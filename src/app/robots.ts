import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/workspace", "/history", "/settings", "/change-password", "/update-password", "/api/", "/auth/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
