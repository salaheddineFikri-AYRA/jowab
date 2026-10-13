import type { Metadata, Viewport } from "next";
import { dictionaries, LANG_HOME, type Lang } from "@/lib/i18n";

export function landingMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang];
  return {
    metadataBase: new URL("https://jowab.ai"),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Jowab",
    alternates: {
      canonical: LANG_HOME[lang],
      languages: {
        "en-US": LANG_HOME.en,
        "ar-SA": LANG_HOME.ar,
        "x-default": LANG_HOME.en,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: LANG_HOME[lang],
      siteName: lang === "ar" ? "جواب" : "Jowab",
      locale: t.meta.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export const landingViewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};
