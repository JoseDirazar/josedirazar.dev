import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim());

  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      return lang;
    }

    const baseLang = lang.split("-")[0];
    if (locales.includes(baseLang)) {
      return baseLang;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo redirigir si la ruta es exactamente "/"
  if (pathname === "/") {
    const locale = getPreferredLocale(request);

    // Redirigir a /[locale]
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // No hacer nada si ya hay un locale en la ruta o si es una ruta distinta
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};