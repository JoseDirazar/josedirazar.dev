"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface BackButtonProps {
  locale: string;
  href?: string;
}

export default function BackButton({ locale, href }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{
        x: [-5, 5, -5],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      onClick={() => router.push(`/${locale}/${href}`)}
      className="fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-all hover:opacity-50 dark:bg-white/10"
    >
      <IoArrowBack size={24} className="text-white" />
    </motion.button>
  );
}