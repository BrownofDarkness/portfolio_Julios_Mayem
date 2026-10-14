import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MAYEM YOTA TAMESSUING Julios — Portfolio",
    short_name: "Julios Mayem",
    description:
      "Portfolio de MAYEM YOTA TAMESSUING Julios — développeur logiciel et bases de données, Yaoundé, Cameroun.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090B",
    theme_color: "#08090B",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
