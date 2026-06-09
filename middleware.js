import { NextResponse } from "next/server";

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

  // ২. ইউআরএল-এ অলরেডি ভাষার কোড থাকলে আর রিডাইরেক্ট করবে না
  const hasLocale =
    pathname.startsWith("/bn") ||
    pathname.startsWith("/en") ||
    pathname.split("/")[1]?.length === 2;
  if (hasLocale) return NextResponse.next();

  // ৩. রিয়েল ইউজারদের জন্য ব্রাউজার ল্যাঙ্গুয়েজ ট্র্যাক করা
  const acceptLanguage = request.headers.get("accept-language");
  const userLocale = acceptLanguage
    ? acceptLanguage.split(",")[0].split("-")[0]
    : "en";

  // ৪. অটোমেটিক ডাইনামিক রাউট তৈরি করে রিরাইট করা
  const url = request.nextUrl.clone();
  url.pathname = `/${userLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/news/:path*"],
};
