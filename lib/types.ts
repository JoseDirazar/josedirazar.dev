import { t } from "i18next";
import { getTranslatedData } from "./data";
const { links } = getTranslatedData(t);
export type SectionName = (typeof links)[number]["name"];