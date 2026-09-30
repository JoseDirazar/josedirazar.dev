import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Metadata } from "next";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Jose Dirazar | Portfolio",
  description: "Jose Dirazar Portfolio",
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed hidden rounded lg:top-2 lg:right-2 lg:block">
        <LanguageSwitcher />
      </div>
      <div className="fixed bottom-2 left-2 rounded drop-shadow-2xl lg:hidden">
        <LanguageSwitcher contentTop />
      </div>
      {children}
    </div>
  );
}