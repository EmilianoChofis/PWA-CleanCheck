import withPWA from "next-pwa";
import { NextConfig } from "next";

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
});

const nextConfig: NextConfig = {
  ...pwa,
  images: {
    domains: ["cleancheckprov.s3.amazonaws.com"],
  },
};

export default nextConfig;
