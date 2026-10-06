"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import SectionHeading from "./section-heading";

export default function About() {
  const { ref } = useSectionInView("About");
  const { t } = useTranslation();

  return (
    <motion.section
      ref={ref}
      className="mx-3 mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("about.title")}</SectionHeading>
      <p className="mb-3">{t("about.paragraph1")}</p>
      <p>{t("about.paragraph2")}</p>
    </motion.section>
  );
}
