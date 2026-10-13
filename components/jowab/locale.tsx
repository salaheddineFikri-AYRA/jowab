"use client";

import { createContext, use, useMemo, type ReactNode } from "react";
import type { Dictionary, Lang } from "@/lib/i18n";

type Locale = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dictionary;
  format: (value: number, options?: Intl.NumberFormatOptions) => string;
  fill: (template: string, values: Record<string, string | number>) => string;
};

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  lang,
  t,
  children,
}: {
  lang: Lang;
  t: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo<Locale>(() => {
    // Arabic pages use Western digits; pinning the numbering system keeps them
    // identical in Node and every browser, so server and client markup match.
    const locale = lang === "ar" ? "ar-SA-u-nu-latn" : "en-US";
    const cache = new Map<string, Intl.NumberFormat>();
    const format = (value: number, options?: Intl.NumberFormatOptions) => {
      const key = JSON.stringify(options ?? {});
      let formatter = cache.get(key);
      if (!formatter) {
        formatter = new Intl.NumberFormat(locale, options);
        cache.set(key, formatter);
      }
      return formatter.format(value);
    };
    const fill = (
      template: string,
      values: Record<string, string | number>,
    ) =>
      template.replace(/\{(\w+)\}/g, (_, key: string) => {
        const value = values[key];
        return typeof value === "number" ? format(value) : (value ?? "");
      });

    return { lang, dir: lang === "ar" ? "rtl" : "ltr", t, format, fill };
  }, [lang, t]);

  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale() {
  const value = use(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside <LocaleProvider>.");
  }
  return value;
}
