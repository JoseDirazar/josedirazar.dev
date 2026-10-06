import React from "react";
import { CgMail, CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import {
  SiCloudflare,
  SiCss,
  SiDocker,
  SiExpo,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMailbox,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRust,
  SiSequelize,
  SiSqlite,
  SiStellar,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiTypeorm,
  SiCypress,
  SiJest,
  SiStripe,
  SiMercadopago,
  SiAuth0,
  SiGooglemaps,
  SiResend,
  SiGoogle,
} from "react-icons/si";
import { Cloud, Server } from "lucide-react";

import BelliDeportes from "@/public/BelliDeportes.webp";
import multicuotasTandil from "@/public/multicuotas-tandil.webp";
import tuBienestar from "@/public/tu-bienestar.webp";
import padelink from "@/public/padelink.webp";
import forgebyteslab from "@/public/forgebyteslab.webp";
import workitfy from "@/public/Workitfy.webp";
import spaceInvaders from "@/public/space-invaders.webp";
import deAcaFarmaciasDeTurno from "@/public/deaca-olavarria.webp";
import pawdlink from "@/public/pawdlink.webp";
import platformer from "@/public/platformer.webp";

// Portfolio-only namespaces (forgebytes dropped per design Decision #12).
export const i18nNamespaces = ["common", "data"] as const;

// This function will be used to get translated data
export const getTranslatedData = (
  t: (key: string, options?: { ns: string }) => string,
) => ({
  links: [
    {
      name: t("links.home", { ns: "data" }),
      hash: "#home",
    },
    {
      name: t("links.about", { ns: "data" }),
      hash: "#about",
    },
    {
      name: t("links.projects", { ns: "data" }),
      hash: "#projects",
    },
    {
      name: t("links.skills", { ns: "data" }),
      hash: "#skills",
    },
    {
      name: t("links.experience", { ns: "data" }),
      hash: "#experience",
    },
    {
      name: t("links.contact", { ns: "data" }),
      hash: "#contact",
    },
  ],

  experiencesData: [
    {
      title: t("experiences.deaca.title", { ns: "data" }),
      location: t("experiences.deaca.location", { ns: "data" }),
      description: t("experiences.deaca.description", { ns: "data" }),
      icon: React.createElement(CgWorkAlt),
      date: t("experiences.deaca.date", { ns: "data" }),
      url: "https://deaca-farmacias-de-turno.forgebyteslab.com",
    },
    {
      title: t("experiences.forgebytes.title", { ns: "data" }),
      location: t("experiences.forgebytes.location", { ns: "data" }),
      description: t("experiences.forgebytes.description", { ns: "data" }),
      icon: React.createElement(CgWorkAlt),
      date: t("experiences.forgebytes.date", { ns: "data" }),
      url: "https://forgebyteslab.com/",
    },
    {
      title: t("experiences.biggertech.title", { ns: "data" }),
      location: t("experiences.biggertech.location", { ns: "data" }),
      description: t("experiences.biggertech.description", { ns: "data" }),
      icon: React.createElement(CgWorkAlt),
      date: t("experiences.biggertech.date", { ns: "data" }),
      url: "https://www.biggertech.co/",
    },
    {
      title: t("experiences.mayland.title", { ns: "data" }),
      location: t("experiences.mayland.location", { ns: "data" }),
      description: t("experiences.mayland.description", { ns: "data" }),
      icon: React.createElement(CgWorkAlt),
      date: t("experiences.mayland.date", { ns: "data" }),
      url: "https://www.maylandlabs.com/",
    },
    {
      title: t("experiences.henry.title", { ns: "data" }),
      location: t("experiences.henry.location", { ns: "data" }),
      description: t("experiences.henry.description", { ns: "data" }),
      icon: React.createElement(LuGraduationCap),
      date: t("experiences.henry.date", { ns: "data" }),
      url: "https://certificates.soyhenry.com/new-cert?id=2ca8a03c45ac77da0e6ddb9ccb624fdfe0a3b3c73bed6be0413138c267683122",
    },
    {
      title: t("experiences.freecodecamp.title", { ns: "data" }),
      location: t("experiences.freecodecamp.location", { ns: "data" }),
      description: t("experiences.freecodecamp.description", { ns: "data" }),
      icon: React.createElement(LuGraduationCap),
      url: "https://www.freecodecamp.org/certification/fcce44b564a-4071-40f3-a9b8-537a761d8ec5/javascript-algorithms-and-data-structures",
      date: t("experiences.freecodecamp.date", { ns: "data" }),
    },
  ],

  projectsData: [
    {
      title: t("projects.deaca.title", { ns: "data" }),
      description: t("projects.deaca.description", { ns: "data" }),
      tags: ["Vite.js", "Nest.js", "PostgreSQL", "Docker"],
      imageUrl: deAcaFarmaciasDeTurno,
      url: "https://deacaolavarria.com",
      titleFontClass: "font-nueva font-bold",
    },
    {
      title: t("projects.pawdlink.title", { ns: "data" }),
      description: t("projects.pawdlink.description", { ns: "data" }),
      tags: [
        "Vite.js",
        "React v19",
        "TailwindCSS v4",
        "Shadcn UI",
        "Google OAuth",
      ],
      imageUrl: pawdlink,
      url: "https://pawdlink-web.forgebyteslab.com",
      titleFontClass: "font-monserrat font-extrabold italic",
    },
    {
      title: t("projects.forgebytes.title", { ns: "data" }),
      description: t("projects.forgebytes.description", { ns: "data" }),
      tags: ["React", "TypeScript", "Vite.js", "TailwindCss"],
      imageUrl: forgebyteslab,
      url: "https://forgebyteslab.com/",
      titleFontClass: "font-nasalization",
    },
    {
      title: t("projects.tubienestar.title", { ns: "data" }),
      description: t("projects.tubienestar.description", { ns: "data" }),
      tags: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCss",
        "Prisma",
        "Auth.js",
      ],
      imageUrl: tuBienestar,
      url: "https://tu-bienestar.forgebyteslab.com/",
      titleFontClass: "font-lobster",
    },
    {
      title: t("projects.padelink.title", { ns: "data" }),
      description: t("projects.padelink.description", { ns: "data" }),
      tags: [
        "React",
        "TypeScript",
        "Nest.js",
        "TailwindCss",
        "TypeORM",
        "Vite.js",
        "Google OAuth",
      ],
      imageUrl: padelink,
      url: "https://www.padelink.com.ar/",
    },
    {
      title: t("projects.workitfy.title", { ns: "data" }),
      description: t("projects.workitfy.description", { ns: "data" }),
      tags: [
        "React",
        "TypeScript",
        "Nest.js",
        "TailwindCss",
        "TypeORM",
        "Vite.js",
        "Google OAuth",
      ],
      imageUrl: workitfy,
      url: "https://workitfy.maylandlabs.com/",
    },
    {
      title: t("projects.multicuotas.title", { ns: "data" }),
      description: t("projects.multicuotas.description", { ns: "data" }),
      tags: [
        "React",
        "TypeScript",
        "Nest.js",
        "TailwindCss",
        "TypeORM",
        "Vite.js",
        "MercadoPago",
      ],
      imageUrl: multicuotasTandil,
      url: "https://multicuotas-tandil.forgebyteslab.com/",
    },
    {
      title: t("projects.bellideportes.title", { ns: "data" }),
      description: t("projects.bellideportes.description", { ns: "data" }),
      tags: [
        "React",
        "TypeScript",
        "Nest.js",
        "TailwindCss",
        "TypeORM",
        "Vite.js",
        "MercadoPago",
      ],
      imageUrl: BelliDeportes,
      url: "https://bellideportes.forgebyteslab.com/",
      titleFontClass: "font-orbitron font-extrabold tracking-wide",
    },
  ],

  gamesData: [
    {
      title: t("spaceinvaders.title"),
      description: t("spaceinvaders.description"),
      tags: ["Rust", "Bevy", "WASM"],
      imageUrl: spaceInvaders,
      // Routes are flat under [locale]/my-games (no /jose-dirazar/ segment).
      url: "/my-games/space-invaders",
    },
    {
      title: t("platformer.title"),
      description: t("platformer.description"),
      tags: ["Rust", "Bevy", "WASM"],
      imageUrl: platformer,
      url: "/my-games/platformer",
    },
  ],
});

// Static data that doesn't need translation
export const languajes = [
  { title: "TypeScript", icon: React.createElement(SiTypescript) },
  { title: "JavaScript", icon: React.createElement(SiJavascript) },
  { title: "HTML", icon: React.createElement(SiHtml5) },
  { title: "CSS", icon: React.createElement(SiCss) },
  { title: "SQL", icon: React.createElement(SiMysql) },
  { title: "Rust", icon: React.createElement(SiRust) },
];

export const frontendSkills = [
  { title: "React", icon: React.createElement(SiReact) },
  { title: "Next.js", icon: React.createElement(SiNextdotjs) },
  { title: "TailwindCSS", icon: React.createElement(SiTailwindcss) },
  { title: "Vite", icon: React.createElement(SiVite) },
  { title: "React Native", icon: React.createElement(SiReact) },
  { title: "Expo", icon: React.createElement(SiExpo) },
];

export const backendSkills = [
  { title: "Express js", icon: React.createElement(SiExpress) },
  { title: "Nest.js", icon: React.createElement(SiNestjs) },
  { title: "Rocket.rs", icon: React.createElement(SiRust) },
  { title: "Stellar Smart Contracts", icon: React.createElement(SiStellar) },
];

export const databaseSkills = [
  { title: "Prisma", icon: React.createElement(SiPrisma) },
  { title: "Sequelize", icon: React.createElement(SiSequelize) },
  { title: "TypeORM", icon: React.createElement(SiTypeorm) },
  { title: "PostgreSQL", icon: React.createElement(SiPostgresql) },
  { title: "MySQL", icon: React.createElement(SiMysql) },
  { title: "SQLite", icon: React.createElement(SiSqlite) },
];

export const devOpsSkills = [
  { title: "Docker", icon: React.createElement(SiDocker) },
  { title: "Nginx", icon: React.createElement(SiNginx) },
  {
    title: "Coolify",
    icon: React.createElement("img", {
      src: "/coolify.svg",
      className: "w-8 h-8",
      alt: "Coolify",
      width: 32,
      height: 32,
      id: "coolify",
    }),
  },
  { title: "Vercel", icon: React.createElement(SiVercel) },
  { title: "S3 buckets", icon: React.createElement(Cloud) },
  { title: "DNS configurations", icon: React.createElement(SiCloudflare) },
];

export const testingSkills = [
  { title: "Jest", icon: React.createElement(SiJest) },
  { title: "Cypress", icon: React.createElement(SiCypress) },
  { title: "Detox", icon: null },
  { title: "Maestro", icon: null },
  { title: "Wiremock", icon: null },
];

export const integrationSkills = [
  { title: "Stripe", icon: React.createElement(SiStripe) },
  { title: "MercadoPago", icon: React.createElement(SiMercadopago) },
  { title: "Auth0", icon: React.createElement(SiAuth0) },
  { title: "Cognito", icon: React.createElement(Server) },
  { title: "Amplify", icon: React.createElement(Cloud) },
  { title: "Google Maps", icon: React.createElement(SiGooglemaps) },
  { title: "Resend", icon: React.createElement(SiResend) },
  { title: "Nodemailer", icon: React.createElement(SiMailbox) },
  { title: "Google OAuth", icon: React.createElement(SiGoogle) },
  { title: "Google Places", icon: React.createElement(SiGoogle) },
];