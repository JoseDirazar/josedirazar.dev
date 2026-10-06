import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeSwitch from "@/components/theme-switch";
import { ThemeContextProvider } from "@/context/theme-provider";
import { Toaster } from "react-hot-toast";
import React from "react";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "José Dirazar | Portfolio",
  description: "José Dirazar personal portfolio.",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${inter.className} relative bg-background text-foreground`}
      >
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ActiveSectionContextProvider>
            {children}
            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
