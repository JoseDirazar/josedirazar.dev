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
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("about.title")}</SectionHeading>
      <p className="mb-3">
        {t("about.education")}{" "}
        <span className="font-medium">{t("about.accounting")}</span>,{" "}
        {t("about.passion")}{" "}
        <span className="font-medium">{t("about.fullstack")}</span>.{" "}
        <span className="italic">{t("about.favorite")}</span>{" "}
        {t("about.problem")}{" "}
        <span className="underline">{t("about.love")}</span>{" "}
        {t("about.feeling")}{" "}
        <span className="font-medium">{t("about.frontend")}</span>{" "}
        {t("about.backend")}. {t("about.rust")}
      </p>

      <p>
        <span className="italic">{t("about.notCoding")}</span>,{" "}
        {t("about.enjoy")}{" "}
        <span className="font-medium">{t("about.tech")}</span>{" "}
        {t("about.scene")}{" "}
        <span className="font-medium">{t("about.nextSection")}</span>.
      </p>
    </motion.section>
  );
}