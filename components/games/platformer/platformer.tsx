import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Platformer() {
  const gameRef = useRef<HTMLIFrameElement>(null);
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pt-12">
      <p className="text-center text-xl">{t("platformer.instructions")}</p>
      <div>
        <iframe
          ref={gameRef}
          src="/platformer/index.html"
          className="flex h-[793px] w-[1040px] items-center justify-center rounded-md bg-white dark:bg-black"
        />
      </div>
    </div>
  );
}