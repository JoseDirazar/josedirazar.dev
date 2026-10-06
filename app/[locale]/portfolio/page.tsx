import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Intro from "@/components/portfolio/intro";
import SectionDivider from "@/components/portfolio/section-divider";
import About from "@/components/portfolio/about";
import Skills from "@/components/portfolio/skills";
import Contact from "@/components/portfolio/contact";
import Footer from "@/components/portfolio/footer";
import { getTranslatedData, i18nNamespaces } from "@/lib/data";
import Experience from "@/components/portfolio/experience";
import Projects from "@/components/portfolio/projects";
import MyGames from "@/components/portfolio/MyGames";
import PortfolioHeader from "@/components/portfolio/portfolio-header";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [...i18nNamespaces]);
  const { projectsData } = getTranslatedData(t);

  return (
    <TranslationsProvider
      namespaces={[...i18nNamespaces]}
      locale={locale}
      resources={resources}
    >
      <main className="mt-30 flex flex-col items-center">
        <PortfolioHeader />
        <Intro />

        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects
          projectsData={projectsData}
          projectTitle={t("projects.title", { ns: "data" })}
          target="_blank"
        />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <MyGames />
        <Contact />
      </main>
      <Footer />
    </TranslationsProvider>
  );
}
