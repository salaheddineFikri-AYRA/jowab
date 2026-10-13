"use client";

import { cn } from "@/lib/utils";
import { LANG_HOME } from "@/lib/i18n";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo } from "@/components/jowab/brand-logo";
import { Wordmark, mailto } from "@/components/jowab/ui";

const LINK =
  "rounded-sm text-(--m-ink) hover:text-(--m-ink)/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)";

export function Footer() {
  const { t, lang } = useLocale();
  const f = t.footer;

  return (
    <footer className="relative -mt-12 bg-(--m-footer) px-4 pt-28 pb-10 text-(--m-ink) [--m-ink:#ffffff] [--m-muted:#8c8c8c] [--m-paper:var(--m-footer)] sm:-mt-16 sm:px-6 sm:pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 text-[0.8125rem] lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-4">
          <a href="#top" aria-label={t.common.homeLabel} className={cn(LINK, "w-fit")}>
            <Wordmark className="h-9" />
          </a>
          <p className="max-w-[34ch] text-(--m-muted)">{f.madeIn}</p>
        </div>

        {f.columns.map((column, index) => (
          <nav
            key={column.title}
            aria-labelledby={`footer-col-${index}`}
            className="lg:col-span-2"
          >
            <h2 id={`footer-col-${index}`} className="font-medium text-(--m-ink) rtl:font-semibold">
              {column.title}
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <h2 className="font-medium text-(--m-ink) rtl:font-semibold">{f.contactTitle}</h2>
          <ul className="mt-2 flex flex-col gap-1.5">
            <li>
              <a href={mailto(t.common.demoSubject)} dir="ltr" className={LINK}>
                {t.common.email}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/jowab-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(LINK, "inline-flex items-center gap-1.5")}
              >
                <BrandLogo brand="linkedin" mono className="size-3.5" />
                {t.brands.linkedin}
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 mt-16 flex flex-col gap-3 text-xs text-(--m-muted) sm:mt-28 sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
          <p>{f.copyright}</p>
          <p className="flex items-center gap-4">
            <span>{f.tagline}</span>
            <a
              href={LANG_HOME[lang === "ar" ? "en" : "ar"]}
              hrefLang={lang === "ar" ? "en" : "ar"}
              lang={lang === "ar" ? "en" : "ar"}
              className={cn(LINK, "text-(--m-muted)")}
            >
              {lang === "ar" ? t.common.language.enName : t.common.language.arName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
