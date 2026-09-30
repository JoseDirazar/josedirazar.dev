import { SiBevy, SiRust } from "react-icons/si";
import Projects from "@/components/portfolio/projects";
import { getTranslatedData, i18nNamespaces } from "@/lib/data";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [...i18nNamespaces]);
  const { gamesData } = getTranslatedData(t);

  return (
    <TranslationsProvider
      namespaces={[...i18nNamespaces]}
      locale={locale}
      resources={resources}
    >
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl font-bold">{t("games.welcome")}</h2>
        <div className="my-10 max-w-md text-center text-wrap">
          <p className="text-xl">
            {t("games.description")}{" "}
            <SiBevy className="mr-1 inline-block" size={25} />
            Bevy
          </p>
          <p className="text-xl">
            {t("games.framework")}{" "}
            <SiRust className="mr-1 inline-block" size={25} />
            Rust
          </p>
        </div>
        <Projects
          projectsData={gamesData}
          projectTitle={t("games.title")}
          locale={locale}
          target=""
        />
      </div>
    </TranslationsProvider>
  );
}