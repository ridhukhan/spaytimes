/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["bn", "en", "hi", "ta", "zh", "es", "pt", "tr", "de", "fr", "ar"],
    defaultLocale: "bn",
    localeDetection: true,
  },
};

module.exports = nextConfig;
