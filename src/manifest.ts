import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CleanCheck PWA",
    short_name: "CleanCheck",
    description: "A Progressive Web App for CleanCheck",
    start_url: "/",
    display: "standalone",
    background_color: "#262351",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icons/dry-clean.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/dry-clean.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
