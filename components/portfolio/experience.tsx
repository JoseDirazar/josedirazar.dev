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
    <section
      id="experience"
      ref={ref}
      className="mx-3 mb-28 scroll-mt-28 sm:mb-2"
    >
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
                <p className="mt-0! font-normal">{item.location}</p>
                <p className="mt-1! font-normal! text-muted-foreground">
                  {displayText}
                </p>
                {isLong && (
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggle(index)}
                    className="mt-2 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    {isExpanded
                      ? t("experience.showLess")
                      : t("experience.showMore")}
                  </button>
                )}
                <a
                  target="_blank"
                  href={item.url}
                  className="!mt-1 flex w-fit items-center justify-center gap-2 rounded bg-foreground/80 px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/70 md:text-base dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/20 dark:hover:text-white"
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
