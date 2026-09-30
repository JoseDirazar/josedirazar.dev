"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SubmitBtn from "./submit-btn";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit is intentionally a no-op for the standalone portfolio project
  // (no email backend / no Resend / no API route per design Decision #10).
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // No network call — form submission is disabled in this project.
    setIsSubmitting(false);
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t("contact.title")}</SectionHeading>

      <p className="-mt-6 text-gray-700 dark:text-white/80">
        {t("contact.direct")}{" "}
        <a className="underline" href="mailto:jfdirazar@gmail.com">
          jfdirazar@gmail.com
        </a>{" "}
        {t("contact.or")}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        onSubmit={handleSubmit}
      >
        <input
          className="borderBlack dark:bg-opacity-80 dark:focus:bg-opacity-100 h-14 rounded-lg px-4 transition-all dark:bg-white dark:outline-none"
          name="senderEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={500}
          placeholder={t("contact.email")}
          disabled={isSubmitting}
        />
        <textarea
          className="borderBlack dark:bg-opacity-80 dark:focus:bg-opacity-100 my-3 h-52 rounded-lg p-4 transition-all dark:bg-white dark:outline-none"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("contact.message")}
          required
          maxLength={5000}
          disabled={isSubmitting}
        />
        <SubmitBtn isSubmitting={isSubmitting} />
      </form>
    </motion.section>
  );
}