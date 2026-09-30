"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export const LanguageSwitcher = ({ contentTop }: { contentTop?: boolean }) => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [_, currentLang, ...rest] = pathname.split("/");
  function buildPath(code: string) {
    if (rest) return "/" + code + "/" + rest.join("/");
    return "/" + code;
  }
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:text-white"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span>
          {LANGUAGES.find((lang) => lang.code === currentLang)?.name ||
            "English"}
        </span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`absolute z-[9999] px-1 ring-2 ring-neutral-300 dark:ring-neutral-700 ${contentTop ? "bottom-full left-0 origin-top" : "right-0"} mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-gray-800 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {LANGUAGES.map((language) => (
            <Link
              key={language.code}
              href={buildPath(language.code)}
              className={`block w-full rounded px-4 py-2 text-left text-sm ${
                currentLang === language.code
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              role="menuitem"
            >
              {language.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};