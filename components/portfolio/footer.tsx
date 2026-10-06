"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mb-10 px-4 text-center text-muted-foreground">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} José Dirazar. {t("footer.rights")}
      </small>
      <p className="text-xs">
        <span className="font-semibold">{t("footer.about")}</span>{" "}
        {t("footer.built")}
      </p>
    </footer>
  );
}
