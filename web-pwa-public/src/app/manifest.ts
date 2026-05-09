import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "237 VIBES",
      short_name: "237VIBES",
      description: "Prototype PWA grand public pour decouvrir et reserver des activites locales.",
      start_url: "/",
      display: "standalone",
      background_color: "#09061B",
      theme_color: "#7C3AED",
      lang: "fr",
      icons: [
         {
            src: "/icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
         },
         {
            src: "/icons/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
         },
      ],
   };
}
