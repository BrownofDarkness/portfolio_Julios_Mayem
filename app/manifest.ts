import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Julios Mayem — Portfolio",
    short_name: "Julios Mayem",
    description:
      "Portfolio de Julios Mayem — Ingénieur logiciel orienté vision par ordinateur, Yaoundé, Cameroun.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090B",
    theme_color: "#08090B",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
