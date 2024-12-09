import withPWA from "next-pwa";
import { NextConfig } from "next";

const nextConfig: NextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
});

export default {
  ...nextConfig,
  images: {
    domains: ["cleancheckprov.s3.amazonaws.com"],
  },
};
