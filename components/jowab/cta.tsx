"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { IconStar } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, type Brand } from "@/components/jowab/brand-logo";
import { Flag, GlassIcon, type FlagCode } from "@/components/jowab/icons";
import {
  Button,
  Eyebrow,
  LogoMark,
  mailto,
  text,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const ORBIT: { brand: Brand; angle: number; fill?: boolean }[] = [
  { brand: "whatsapp", angle: -10 },
  { brand: "salla", angle: 35 },
  { brand: "instagram", angle: 80 },
  { brand: "zoho", angle: 125 },
  { brand: "foodics", angle: 170, fill: true },
  { brand: "messenger", angle: 215 },
  { brand: "bayzat", angle: 262, fill: true },
  { brand: "quickbooks", angle: 308 },
];

const COUNTRIES = ["sa", "ae", "kw", "qa", "bh", "om"] as const satisfies readonly FlagCode[];

const QUOTE_MS = 5500;

function Orbit() {
  const shouldReduceMotion = useReducedMotionSafe();
  const rotate = useMotionValue(0);
  const counterRotate = useTransform(() => -rotate.get());

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;
    rotate.set(rotate.get() + (5 * delta) / 1000);
  });

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-80 [--orbit-r:7.25rem] sm:max-w-96 sm:[--orbit-r:9rem]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,var(--m-glow),transparent_62%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[76%] -translate-1/2 rounded-full border border-dashed border-(--m-line-strong)" />

      <div className="absolute top-1/2 left-1/2 z-10 flex size-20 -translate-1/2 items-center justify-center rounded-[1.5rem] bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_12px_30px_-12px_oklch(0_0_0/0.25)] sm:size-24">
        <LogoMark className="size-12 sm:size-14" />
      </div>

      <motion.div style={{ rotate }} className="absolute inset-0">
        {ORBIT.map((node) => (
          <div
            key={node.brand}
            className="absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)_rotate(var(--orbit-angle))_translateX(var(--orbit-r))_rotate(calc(var(--orbit-angle)*-1))]"
            style={{ "--orbit-angle": `${node.angle}deg` } as CSSProperties}
          >
            <motion.div style={{ rotate: counterRotate }}>
              <div className="flex size-10 items-center justify-center rounded-[0.875rem] bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_6px_16px_oklch(0_0_0/0.06)] sm:size-11">
                <BrandLogo
                  brand={node.brand}
                  className={node.fill ? "size-[62%] rounded-[6px]" : "size-[50%]"}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Reviews() {
  const { t } = useLocale();
  const r = t.cta.reviews;
  const shouldReduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const quote = r.quotes[index];

  useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % r.quotes.length), QUOTE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, shouldReduceMotion, r.quotes.length]);

  return (
    <div
      id="reviews"
      className="flex scroll-mt-28 flex-col gap-3 rounded-2xl bg-(--m-card) p-5 shadow-[0_0_0_1px_var(--m-line)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-0.5" role="img" aria-label={r.rating}>
          {Array.from({ length: 5 }, (_, star) => (
            <GlassIcon key={star} icon={IconStar} size={15} />
          ))}
        </span>
        <span className="text-xs text-(--m-muted)">
          {r.label} · {r.via}
        </span>
      </div>
      <div className="relative min-h-[6.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="flex flex-col gap-2"
          >
            <p className="text-[0.9375rem] leading-7 text-pretty text-(--m-ink)">&ldquo;{quote.text}&rdquo;</p>
            <footer className="text-xs text-(--m-muted)">
              <span className="font-medium text-(--m-ink)">{quote.author}</span> · {quote.role}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-(--m-ink)">{r.projects}</span>
        <span className="flex gap-1.5">
          {r.quotes.map((item, dot) => (
            <button
              key={item.author}
              type="button"
              aria-label={`${item.author} · ${item.role}`}
              aria-pressed={dot === index}
              onClick={() => setIndex(dot)}
              className="flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-(--m-ink)"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  dot === index ? "w-4 bg-(--m-ink)" : "w-1.5 bg-(--m-ink)/20",
                )}
              />
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}

export function Cta() {
  const { t } = useLocale();
  const c = t.cta;

  return (
    <section id="cta" aria-labelledby="cta-heading" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2rem] bg-(--m-panel) p-8 sm:gap-12 sm:p-10 lg:grid-cols-[6fr_5fr] lg:gap-8 lg:p-14">
        <div className="flex flex-col gap-6 sm:gap-7">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2
            id="cta-heading"
            className={cn(
              text.display,
              "max-w-[16ch] text-[2.125rem] leading-[1.1] tracking-[-0.035em] text-balance text-(--m-ink) sm:text-[2.75rem] rtl:leading-[1.3]",
            )}
          >
            {c.headline}
          </h2>
          <p className="max-w-[48ch] text-base text-pretty text-(--m-muted) sm:text-sm sm:leading-6 rtl:sm:text-base rtl:sm:leading-7">
            {c.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button href={mailto(t.common.demoSubject)}>{t.common.bookDemo}</Button>
            <Button href="#console" variant="outline">
              {t.common.seeItAnswer}
            </Button>
          </div>
          <Reviews />
        </div>

        <figure className="flex flex-col items-center gap-6">
          <Orbit />
          <figcaption className="flex flex-col items-center gap-3">
            <span className="flex items-center gap-1.5" aria-label={c.countriesLabel} role="list">
              {COUNTRIES.map((code) => (
                <span key={code} role="listitem">
                  <Flag code={code} size={20} title={c.countries[code]} className="rounded-[4px]" />
                </span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-(--m-muted)">
              {c.trust.map((label, index) => (
                <span key={label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  {label}
                </span>
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
