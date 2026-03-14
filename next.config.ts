import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn2.wanderlust.co.uk",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;
