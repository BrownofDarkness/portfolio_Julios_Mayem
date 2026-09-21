/**
 * PostCSS — nesting natif CSS + custom media queries + fallbacks légers.
 * On garde le pipeline volontairement mince (pas d'Autoprefixer explicite,
 * postcss-preset-env s'en charge déjà).
 */
const config = {
  plugins: {
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "logical-properties-and-values": false,
      },
    },
  },
};

export default config;
