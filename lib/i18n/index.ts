import { ar, type Dictionary } from "./ar";
import { en } from "./en";

export type Lang = "ar" | "en";
export type { Dictionary };

export const dictionaries: Record<Lang, Dictionary> = { ar, en };

export const LANG_HOME: Record<Lang, string> = { en: "/", ar: "/ar" };
