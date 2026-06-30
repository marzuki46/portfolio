import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Uncomment for static export deployment only
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  // basePath: "/portfolio", // Uncomment if repo is username.github.io/portfolio
  trailingSlash: true,
};

export default nextConfig;