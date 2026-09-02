import type { MetadataRoute } from "next";

import { APP_SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${APP_SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${APP_SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
