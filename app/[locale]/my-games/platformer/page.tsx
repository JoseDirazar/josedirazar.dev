import TranslationsProvider from "@/components/TranslationsProvider";
import { i18nNamespaces } from "@/lib/data";
import initTranslations from "@/app/i18n";
import PlatformerPage from "@/components/games/platformer/platformer-page";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function PlatformerPageSSR({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, [...i18nNamespaces]);

  return (
    <TranslationsProvider
      namespaces={[...i18nNamespaces]}
      locale={locale}
      resources={resources}
    >
      <PlatformerPage />
    </TranslationsProvider>
  );
}