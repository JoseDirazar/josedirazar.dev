"use client";

import { useRef } from "react";
import { getTranslatedData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const truncateText = (text: string, wordLimit: number = 34) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  url,
  locale,
  target,
  titleFontClass,
}: {
  title: string;
  description: string;
  tags: string[];
  imageUrl: any;
  url: string;
  locale?: string;
  target?: string;
  titleFontClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group relative mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-[42rem] overflow-hidden rounded-lg border border-border bg-muted text-foreground transition hover:bg-muted-foreground/10 sm:h-[20rem] sm:pr-8 sm:group-even:pl-8 dark:hover:bg-white/20">
        <Link href={locale ? "/" + locale + "/" + url : url} target={target}>
          <Image
            src={imageUrl}
            alt="Project I worked on"
            quality={95}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="relative h-44 w-full rounded-t-lg object-cover shadow-2xl transition sm:absolute sm:top-8 sm:-right-40 sm:h-auto sm:w-[28.25rem] sm:group-even:right-[initial] sm:group-even:-left-40 sm:group-hover:-translate-x-3 sm:group-hover:translate-y-3 sm:group-hover:scale-[1.04] sm:group-hover:-rotate-2 sm:group-even:group-hover:translate-x-3 sm:group-even:group-hover:translate-y-3 sm:group-even:group-hover:rotate-2"
          />
          <div className="flex h-full flex-col px-5 pt-4 pb-7 sm:max-w-[50%] sm:pt-10 sm:pr-2 sm:pl-10 sm:group-even:ml-[18rem]">
            <h3
              className={
                titleFontClass
                  ? `text-2xl ${titleFontClass}`
                  : "text-2xl font-semibold"
              }
            >
              {title}
            </h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-muted-foreground">
              {truncateText(description)}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
              {tags.map((tag: string, index: number) => (
                <li
                  className="rounded-full bg-primary/80 px-3 py-1 text-[0.7rem] tracking-wider text-primary-foreground uppercase"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </section>
    </motion.div>
  );
}