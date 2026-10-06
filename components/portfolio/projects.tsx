"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { getTranslatedData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import { StaticImageData } from "next/image";

export default function Projects({
  projectsData,
  projectTitle,
  locale,
  target,
}: {
  projectsData: {
    title: string;
    description: string;
    tags: string[];
    imageUrl: StaticImageData;
    url: string;
    titleFontClass?: string;
  }[];
  projectTitle: string;
  locale?: string;
  target: string;
}) {
  const { ref } = useSectionInView("Projects", 0.5);
  const { t } = useTranslation();

  return (
    <section ref={ref} id="projects" className="mx-3 mb-28 scroll-mt-28">
      <SectionHeading>{projectTitle}</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} locale={locale} target={target} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
