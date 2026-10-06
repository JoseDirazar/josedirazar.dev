"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useActiveSectionContext } from "@/context/active-section-context";
import clsx from "clsx";
import { getTranslatedData } from "@/lib/data";

export default function PortfolioHeader() {
  const { t } = useTranslation();
  const { links } = getTranslatedData(t);
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    // TODO fix bug cuando entra a la seccion de  MyExperience
    <header className="relative z-999">
      <motion.div
        className="fixed top-0 left-1/2 h-18 w-full rounded-none border border-border bg-background/80 shadow-lg shadow-black/3 backdrop-blur-sm sm:top-6 sm:h-10 sm:h-13 sm:w-xl sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      />

      <nav className="fixed top-[0.15rem] left-1/2 flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-88 flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-muted-foreground sm:w-[initial] sm:flex-nowrap sm:gap-3">
          {links.map((link) => (
            <motion.li
              className="relative flex h-3/4 items-center justify-center"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 transition hover:text-foreground",
                  {
                    "text-foreground":
                      activeSection === link.name,
                  },
                )}
                href={link.hash}
                scroll={false}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.hash)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                  window.history.pushState(null, "", link.hash);
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-muted"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
