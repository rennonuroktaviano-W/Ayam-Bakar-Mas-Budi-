import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/menu", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/tentang", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/kontak", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
