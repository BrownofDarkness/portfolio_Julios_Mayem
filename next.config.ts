import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Turbopack (Next 16) sérialise sa config → les plugins MDX
 * doivent être passés en STRING (nom du package), pas en import.
 */
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // La section « Notes » est devenue « Publications » (oct. 2026) :
  // on garde les anciennes URL vivantes pour les liens déjà partagés.
  async redirects() {
    return [
      { source: "/:locale(fr|en)/notes", destination: "/:locale/publications", permanent: true },
      { source: "/:locale(fr|en)/notes/:slug", destination: "/:locale/publications/:slug", permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default withNextIntl(withMDX(nextConfig));
