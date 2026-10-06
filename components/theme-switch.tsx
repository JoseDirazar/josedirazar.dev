"use client";

import { useState, useEffect } from "react";
import SwitchThemeButton from "@/components/switch-theme-button";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="fixed right-5 bottom-5 z-50 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-muted/50 shadow-2xl backdrop-blur-sm">
      <SwitchThemeButton
        resolvedTheme={resolvedTheme}
        setCurrentTheme={setTheme}
      />
    </div>
  );
}