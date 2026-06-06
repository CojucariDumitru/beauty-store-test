import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isPagesExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isPagesExport
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isPagesExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
