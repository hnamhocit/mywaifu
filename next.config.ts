import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.nyeki.dev",
        port: "",
        pathname: "/nekos-api/images/original/**", // Thêm wildcard để bao gồm tất cả các đường dẫn con
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
