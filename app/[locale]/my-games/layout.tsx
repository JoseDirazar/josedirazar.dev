import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="fixed hidden rounded lg:top-2 lg:right-2 lg:block">
        <LanguageSwitcher />
      </div>
      <div className="fixed bottom-2 left-2 rounded bg-card drop-shadow-2xl lg:hidden">
        <LanguageSwitcher contentTop />
      </div>
      {children}
    </div>
  );
}