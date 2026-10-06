"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { HiExternalLink } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { t } = useTranslation();
  const pathname = usePathname();
  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 w-full scroll-mt-400 text-center sm:mb-0"
    >
      <WavyBackground>
        <div className="pointer-events-none absolute inset-0 z-40 flex h-full flex-1 flex-col mask-radial-from-15% mask-radial-to-100%">
          <Image
            src="/assets/landing/Frame.svg"
            alt="ForgeBytes"
            width={1758}
            height={612}
            className="svg-indigo flex-grow object-cover md:object-center"
          />
          <Image
            src="/assets/landing/Frame-1.svg"
            alt="ForgeBytes"
            width={1758}
            height={612}
            className="svg-indigo flex-grow object-cover md:object-center"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                }}
              >
                <Image
                  src="/photo-profile.webp"
                  alt="Jose portrait"
                  width={192}
                  height={192}
                  quality={95}
                  priority
                  className="h-44 w-44 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
                />
              </motion.div>
            </div>
          </div>

          <motion.h1
            className="mt-4 mb-10 max-w-3xl px-4 text-2xl leading-normal! font-medium sm:text-4xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("hero.intro")}
          </motion.h1>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
            }}
          >
            <div className="flex gap-4">
              <Link
                href="#contact"
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-primary-foreground transition outline-none hover:scale-110 hover:bg-primary/90 focus:scale-110 active:scale-105"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                {t("navigation.contact")}{" "}
                <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
              </Link>

              <a
                className="group borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-card px-7 py-3 transition outline-none hover:scale-110 focus:scale-110 active:scale-105"
                href={
                  pathname.split("/").includes("es")
                    ? "/cv/Cv Jose Dirazar - Español.pdf"
                    : "/cv/Cv Jose Dirazar - English.pdf"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  pathname.split("/").includes("es")
                    ? "Ver CV en Español (abre en nueva pestaña)"
                    : "View CV in English (opens in new tab)"
                }
              >
                CV{" "}
                <HiExternalLink className="opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
            <div className="flex gap-4">
              <a
                className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-card p-4 text-muted-foreground transition hover:scale-[1.15] hover:text-foreground focus:scale-[1.15] active:scale-105"
                href="https://www.linkedin.com/in/jose-dirazar-a6b927236/"
                target="_blank"
              >
                <BsLinkedin />
              </a>

              <a
                className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-card p-4 text-[1.35rem] text-muted-foreground transition hover:scale-[1.15] hover:text-foreground focus:scale-[1.15] active:scale-105"
                href="https://github.com/JoseDirazar"
                target="_blank"
              >
                <BsGithub />
              </a>
            </div>
          </motion.div>
        </div>
      </WavyBackground>
    </section>
  );
}
