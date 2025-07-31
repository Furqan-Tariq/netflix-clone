import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbo:{
  //   enabled: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
