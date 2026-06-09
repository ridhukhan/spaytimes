/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["bn", "en", "hi", "ta", "zh", "es", "pt", "tr", "de", "fr", "ar"],
    defaultLocale: "bn", // বাংলাদেশের জন্য ডিফল্ট বাংলা
    localeDetection: true, // আইপি/দেশ অনুযায়ী অটো ল্যাঙ্গুয়েজ ডিটেকশন
  },
};

// 🎯 module.exports এর পরিবর্তে ES Module এ export default লিখতে হয়
export default nextConfig;
