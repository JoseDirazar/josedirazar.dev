"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";

import { FaArrowCircleRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { getTranslatedData } from "@/lib/data";

const TRUNCATE_LIMIT = 220;

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  const { t } = useTranslation();
  const { experiencesData } = getTranslatedData(t);
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="experience" ref={ref} className="mb-28 scroll-mt-28 sm:mb-2">
      <SectionHeading>{t("experience.title", { ns: "data" })}</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => {
          const isLong = item.description.length > TRUNCATE_LIMIT;
          const isExpanded = expanded.has(index);
          const displayText =
            !isLong || isExpanded
              ? item.description
              : `${item.description.slice(0, TRUNCATE_LIMIT)}…`;

          return (
            <React.Fragment key={index}>
              <VerticalTimelineElement
                className="theme-experience"
                date={item.date}
                icon={item.icon}
              >
                <h3 className="font-semibold capitalize">{item.title}</h3>
                <p className="!mt-0 font-normal">{item.location}</p>
                <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                  {displayText}
                </p>
                {isLong && (
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggle(index)}
                    className="mt-2 text-sm font-medium underline underline-offset-4 text-neutral-600 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white"
                  >
                    {isExpanded
                      ? t("experience.showLess")
                      : t("experience.showMore")}
                  </button>
                )}
                <a
                  target="_blank"
                  href={item.url}
                  className="!mt-1 flex w-fit items-center justify-center gap-2 rounded bg-neutral-700 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-neutral-400 hover:text-gray-950 md:text-base dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/20 dark:hover:text-white"
                >
                  {t("experience.view")} <FaArrowCircleRight />
                </a>
              </VerticalTimelineElement>
            </React.Fragment>
          );
        })}
      </VerticalTimeline>
    </section>
  );
}