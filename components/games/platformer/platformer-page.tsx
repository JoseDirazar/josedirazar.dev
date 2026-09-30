"use client";
import Platformer from "./platformer";
import { GiBattleGear } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export default function PlatformerPage() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [_, locale] = pathname.split("/");

  return (
    <div className="mt-10 flex flex-col items-center justify-center text-center">
      <h1 className="flex flex-row justify-center gap-x-4 font-sans text-5xl font-bold tracking-wider underline">
        <GiBattleGear />
        {t("platformer.title")}
        <GiBattleGear />
      </h1>
      <Platformer />
      <div className="my-10 max-w-lg">
        <p className="mb-4 text-center text-3xl">{t("platformer.subtitle")}</p>
        <p className="text-center text-wrap">{t("platformer.description")}</p>
      </div>
    </div>
  );
}