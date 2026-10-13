"use client";

import { motion } from "motion/react";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { LANG_HOME, type Lang } from "@/lib/i18n";
import { useLocale } from "@/components/jowab/locale";
import { Button, Wordmark, mailto, useReducedMotionSafe } from "@/components/jowab/ui";

const LINKS = [
  { key: "product", href: "#features" },
  { key: "integrations", href: "#integrations" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

const LANGS: Lang[] = ["ar", "en"];

function LanguageSwitch() {
  const { t, lang } = useLocale();
  const shouldReduceMotion = useReducedMotionSafe();
  const thumbId = useId();
  const [target, setTarget] = useState<Lang>(lang);

  function go(event: MouseEvent<HTMLAnchorElement>, next: Lang) {
    if (next === lang) {
      event.preventDefault();
      return;
    }
    if (
      shouldReduceMotion ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    setTarget(next);
    window.setTimeout(() => window.location.assign(LANG_HOME[next]), 240);
  }

  return (
    <div
      role="group"
      aria-label={t.common.language.label}
      dir="ltr"
      className="flex rounded-full bg-(--m-chip) p-0.5"
    >
      {LANGS.map((option) => (
        <a
          key={option}
          href={LANG_HOME[option]}
          hrefLang={option}
          lang={option}
          aria-current={option === lang ? "page" : undefined}
          onClick={(event) => go(event, option)}
          className={cn(
            "relative flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 text-[0.8125rem] font-bold sm:h-7",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)",
            option === target ? "text-(--m-ink)" : "text-(--m-muted) hover:text-(--m-ink)",
          )}
        >
          {option === target ? (
            <motion.span
              layoutId={thumbId}
              className="absolute inset-0 rounded-full bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_1px_2px_rgb(12_55_47/0.08)]"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", duration: 0.35, bounce: 0.2 }
              }
            />
          ) : null}
          <span className="relative" aria-hidden="true">
            {t.common.language[option]}
          </span>
          <span className="sr-only">
            {option === "ar" ? t.common.language.arName : t.common.language.enName}
          </span>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotionSafe();
  const hoverId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled &&
          "bg-(--m-paper)/82 shadow-[0_1px_0_var(--m-line)] backdrop-blur-xl backdrop-saturate-150",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          aria-label={t.common.homeLabel}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--m-ink)"
        >
          <Wordmark priority className="h-7 sm:h-8" />
        </a>

        <nav aria-label={t.nav.label} className="max-md:hidden">
          <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
            {LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHovered(link.key)}
                  onFocus={() => setHovered(link.key)}
                  onBlur={() => setHovered(null)}
                  className="relative block rounded-full px-3.5 py-1.5 text-[0.9375rem] font-semibold text-(--m-ink)/72 hover:text-(--m-ink) focus-visible:outline-2 focus-visible:outline-(--m-ink)"
                >
                  {hovered === link.key ? (
                    <motion.span
                      layoutId={hoverId}
                      className="absolute inset-0 rounded-full bg-(--m-ink)/6"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", duration: 0.35, bounce: 0.15 }
                      }
                    />
                  ) : null}
                  <span className="relative">{t.nav[link.key]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitch />
          <Button
            href={mailto(t.common.demoSubject)}
            size="sm"
            className="max-[380px]:hidden"
          >
            {t.common.bookDemo}
          </Button>
        </div>
      </div>
    </header>
  );
}
