import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Optioneel: Unsplash toelaten als je daar covers gebruikt
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
