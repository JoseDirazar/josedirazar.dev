"use client";
import { BiSolidInvader } from "react-icons/bi";
import { SiBevy, SiRust } from "react-icons/si";
import SpaceInvaders from "./space-invaders";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SpaceInvadersPage() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [_, locale] = pathname.split("/");

  return (
    <div className="mt-10 flex flex-col items-center justify-center text-center">
      <h1 className="flex flex-row justify-center gap-x-4 font-sans text-5xl font-bold tracking-wider underline">
        <BiSolidInvader className="animate-bounce" />
        {t("spaceinvaders.title")}
        <BiSolidInvader className="animate-bounce" />
      </h1>
      <SpaceInvaders />
      <div className="my-10 max-w-lg">
        <p className="mb-4 text-center text-3xl">
          {t("spaceinvaders.subtitle")}
        </p>
        <p className="text-center text-wrap">
          {t("spaceinvaders.description")}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <p>{t("spaceinvaders.visitSecond")}</p>
          <Link
            className="text-primary underline"
            href={`/${locale}/my-games/platformer`}
          >
            {t("platformer.project")}
          </Link>
        </div>
      </div>
    </div>
  );
}