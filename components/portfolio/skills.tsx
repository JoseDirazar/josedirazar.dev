"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  backendSkills,
  frontendSkills,
  devOpsSkills,
  databaseSkills,
  languajes,
  testingSkills,
  integrationSkills,
} from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const SubDivider = () => {
  return (
    <motion.div
      className="my-12 h-[2px] w-full max-w-lg rounded-full bg-muted-foreground/50 sm:block"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    ></motion.div>
  );
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const { t } = useTranslation();
  return (
    <section
      id="skills"
      ref={ref}
      className="mx-3 mb-28 flex max-w-[53rem] scroll-mt-28 flex-col items-center justify-center text-center sm:mb-2"
    >
      <SectionHeading>{t("skills.sectionTitle")}</SectionHeading>
      <div className="mb-8 text-2xl font-semibold">{t("skills.langueges")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {languajes.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">{t("skills.backend")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {backendSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">{t("skills.frontend")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {frontendSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">{t("skills.database")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {databaseSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">{t("skills.devops")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {devOpsSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">{t("skills.testing")}</div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {testingSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon && skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
      <SubDivider />
      <div className="mb-8 text-2xl font-semibold">
        {t("skills.integrations")}
      </div>
      <ul className="flex max-w-lg flex-wrap justify-center gap-2 text-lg text-foreground">
        {integrationSkills.map((skill, index) => (
          <motion.li
            className="borderBlack flex flex-row items-center justify-center gap-2 rounded-xl bg-card px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.icon && skill.icon}
            {skill.title}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
