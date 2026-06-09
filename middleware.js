import { NextResponse } from "next/server";

// 🌍 গ্লোবাল কান্ট্রি টু ল্যাঙ্গুয়েজ ম্যাপ (টপ গ্লোবাল কান্ট্রিস)
const countryToLocale = {
  // 🇧🇩 বাংলাদেশ
  BD: "bn",

  // 🇮🇳 ইন্ডিয়া ও এশিয়া
  IN: "hi", // ইন্ডিয়া -> হিন্দি (মেইন স্ট্রিম)
  JP: "ja", // জাপান -> জাপানিজ
  KR: "ko", // সাউথ কোরিয়া -> কোরিয়ান
  CN: "zh", // চীন -> চাইনিজ
  TW: "zh", // তাইওয়ান -> চাইনিজ
  HK: "zh", // হংকং -> চাইনিজ

  // 🕌 মিডল ইস্ট (আরবি ও তুর্কি)
  SA: "ar",
  AE: "ar",
  QA: "ar",
  KW: "ar",
  OM: "ar",
  BH: "ar",
  EG: "ar",
  IQ: "ar",
  JO: "ar",
  TR: "tr", // তুরস্ক -> তুর্কি
  IR: "fa", // ইরান -> ফার্সি

  // 🇪🇺 ওয়েস্টার্ন ও সেন্ট্রাল ইউরোপ
  GB: "en",
  IE: "en", // ইউকে, আয়ারল্যান্ড -> ইংলিশ
  FR: "fr",
  BE: "fr", // ফ্রান্স, বেলজিয়াম -> ফ্রেঞ্চ
  DE: "de",
  AT: "de",
  CH: "de", // জার্মানি, অস্ট্রিয়া, সুইজারল্যান্ড -> জার্মান
  IT: "it", // ইতালি -> ইটালিয়ান
  NL: "nl", // নেদারল্যান্ডস -> ডাচ
  ES: "es", // স্পেন -> স্প্যানিশ
  PT: "pt", // পর্তুগাল -> পর্তুগিজ

  // 🇪🇺 নর্ডিক ও স্ক্যান্ডিনেভিয়ান দেশসমূহ (ইউরোপ)
  SE: "sv", // সুইডেন -> সুইডিশ
  NO: "no", // নরওয়ে -> নরওয়েজিয়ান
  FI: "fi", // ফিনল্যান্ড -> ফিনিশ

  // 🇪🇺 ইস্টার্ন ইউরোপ
  RU: "ru",
  BY: "ru", // রাশিয়া, বেলারুশ -> রাশিয়ান
  UA: "uk", // ইউক্রেন -> ইউক্রেনিয়ান
  PL: "pl", // পোল্যান্ড -> পোলিশ

  // 🇺🇸 আমেরিকা ও ওশেনিয়া (ডিফল্ট ইংলিশ)
  US: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  // ১. সার্চ ইঞ্জিন বট হলে রিডাইরেক্ট বন্ধ (SEO Safe)
  const isBot =
    /googlebot|bingbot|yandexbot|baiduspider|twitterbot|facebookexternalhit/i.test(
      userAgent,
    );
  if (isBot) {
    return NextResponse.next();
  }

  // ২. ইউআরএল-এ অলরেডি কোনো ভাষার কোড থাকলে আর রিডাইরেক্ট করবে না
  const hasLocale =
    pathname.startsWith("/bn/") ||
    pathname.startsWith("/en/") ||
    pathname.split("/")[1]?.length === 2;
  if (hasLocale) return NextResponse.next();

  // ৩. নেটলিফাই আইপি থেকে কান্ট্রি কোড নেওয়া
  const country = request.headers.get("x-nf-country") || "US";

  // ৪. দেশ অনুযায়ী ভাষা সিলেক্ট করা (লিস্টে না থাকলে ডিফল্ট ইংলিশ 'en')
  const userLocale = countryToLocale[country.toUpperCase()] || "en";

  // ৫. সঠিক ভাষার ইউআরএল-এ ডিরেক্ট রিডাইরেক্ট
  const url = request.nextUrl.clone();
  url.pathname = `/${userLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/news/:path*"],
};
