"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export default function BevyCard() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [_, locale] = pathname.split("/");

  return (
    <div className="group relative mb-15 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card">
      <h3 className="mb-4 text-2xl font-bold">{t("games.title")}</h3>
      <p className="mb-6 w-[50%]">{t("games.description")}</p>
      <Link
        href={`/${locale}/my-games`}
        className="inline-block rounded-md px-6 py-3 ring-2 ring-border transition-all duration-300 hover:scale-105 hover:bg-accent dark:hover:bg-primary/90"
      >
        {t("games.link")}
      </Link>
      <div className="absolute right-4 bottom-4">
        <Image
          src="/bevy-1.svg"
          alt="Bevy Logo"
          width={150}
          height={150}
          className="rotate-6 mask-radial-from-50% invert-75 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:invert-0"
        />
      </div>
    </div>
  );
}