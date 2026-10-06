import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function SpaceInvaders() {
  const gameRef = useRef<HTMLIFrameElement>(null);
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pt-12">
      <p className="text-center text-xl">{t("spaceinvaders.instructions")}</p>
      <div>
        <iframe
          ref={gameRef}
          src="/space-invaders/index.html"
          className="flex h-[530px] w-[530px] items-center justify-center rounded-md bg-background"
        />
      </div>
    </div>
  );
}