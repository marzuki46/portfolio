import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://marzuki.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/setup/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}