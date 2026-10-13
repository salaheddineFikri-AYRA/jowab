"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  IconCalendar,
  IconCart,
  IconEarth,
  IconHouse,
  IconKnifeSpoon,
  IconMedicine,
  IconScissorsSparkle,
  IconSuitcase,
} from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, BrandTile, type Brand } from "@/components/jowab/brand-logo";
import { GlassIcon, type GlassIconComponent } from "@/components/jowab/icons";
import {
  Eyebrow,
  LogoMark,
  Section,
  TypingDots,
  mailto,
  text,
  useReducedMotionSafe,
  useTimeline,
  EASE_OUT,
} from "@/components/jowab/ui";

type IndustryKey = "ecommerce" | "restaurants" | "clinics" | "realestate" | "hr" | "salons" | "tours";

type Mark = { brand: Brand } | { icon: GlassIconComponent };

type Channel = "whatsapp" | "instagram" | "messenger" | "telegram";

const INDUSTRIES: { key: IndustryKey; icon: GlassIconComponent; channel: Channel; result: Mark }[] = [
  { key: "ecommerce", icon: IconCart, channel: "whatsapp", result: { brand: "salla" } },
  { key: "restaurants", icon: IconKnifeSpoon, channel: "instagram", result: { brand: "foodics" } },
  { key: "clinics", icon: IconMedicine, channel: "whatsapp", result: { icon: IconCalendar } },
  { key: "realestate", icon: IconHouse, channel: "messenger", result: { brand: "hubspot" } },
  { key: "hr", icon: IconSuitcase, channel: "whatsapp", result: { brand: "bayzat" } },
  { key: "salons", icon: IconScissorsSparkle, channel: "instagram", result: { icon: IconCalendar } },
  { key: "tours", icon: IconEarth, channel: "telegram", result: { icon: IconCalendar } },
];

const CYCLE_MS = 5200;
const CHAT_STEPS = [500, 1100, 600] as const;

function ResultMark({ mark }: { mark: Mark }) {
  if ("brand" in mark) return <BrandTile brand={mark.brand} className="size-7 rounded-lg" />;
  return (
    <span className="flex size-7 items-center justify-center rounded-lg bg-(--m-card) shadow-[0_0_0_1px_var(--m-line)]">
      <GlassIcon icon={mark.icon} tone="accent" size={16} />
    </span>
  );
}

function Conversation({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const { t } = useLocale();
  const item = t.industries.items[industry.key];
  const step = useTimeline(CHAT_STEPS);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_24px_48px_-28px_oklch(0_0_0/0.3)]">
      <div className="flex items-center gap-3 border-b border-(--m-line) px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-(--m-panel)">
          <BrandLogo brand={industry.channel} className="size-[18px]" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-(--m-ink)">{item.business}</span>
          <span className="text-xs text-(--m-muted)">{t.channels[industry.channel]}</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-(--m-panel) py-1 ps-1 pe-2.5 text-xs font-medium text-(--m-ink)">
          <LogoMark className="size-4" />
          {t.common.agentName}
        </span>
      </div>

      <div className="flex min-h-[15rem] flex-col justify-end gap-2.5 px-4 pt-6 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="max-w-[80%] self-start rounded-2xl rounded-es-md bg-(--m-panel) px-3.5 py-2.5 text-[0.9375rem] leading-6 text-(--m-ink)"
        >
          {item.q}
        </motion.p>
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 1 ? (
            <motion.span
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex self-end rounded-2xl rounded-ee-md bg-(--m-ink) px-3.5 py-3 text-(--m-paper)/70"
            >
              <TypingDots />
            </motion.span>
          ) : null}
          {step >= 2 ? (
            <motion.p
              key="answer"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
              className="max-w-[80%] self-end rounded-2xl rounded-ee-md bg-(--m-ink) px-3.5 py-2.5 text-[0.9375rem] leading-6 text-(--m-paper)"
            >
              {item.a}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <motion.div
        initial={false}
        animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="flex items-center gap-2.5 border-t border-(--m-line) bg-(--m-panel)/60 px-4 py-3"
      >
        <ResultMark mark={industry.result} />
        <span className="flex-1 text-[0.8125rem] font-medium text-(--m-ink)">{item.result}</span>
        <span className="flex size-5 items-center justify-center rounded-full bg-(--m-mint) text-white">
          <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 6.2 5 8.5l4.5-5" />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}

export function Industries() {
  const { t } = useLocale();
  const ind = t.industries;
  const shouldReduceMotion = useReducedMotionSafe();
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycling = inView && !paused && !shouldReduceMotion;
  const current = INDUSTRIES[active];

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => setActive((index) => (index + 1) % INDUSTRIES.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = INDUSTRIES.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="industries" labelledBy="industries-heading">
      <div
        className="grid items-start gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="flex flex-col">
          <Eyebrow>{ind.eyebrow}</Eyebrow>
          <h2 id="industries-heading" className={cn(text.h2, "mt-4 max-w-[18ch]")}>
            {ind.headline}
          </h2>
          <p className={cn(text.lede, "mt-4")}>{ind.subheadline}</p>

          <div role="tablist" aria-label={ind.listLabel} aria-orientation="vertical" className="mt-8 flex flex-col border-t border-(--m-line)">
            {INDUSTRIES.map((industry, index) => {
              const isActive = index === active;
              const item = ind.items[industry.key];
              return (
                <button
                  key={industry.key}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${baseId}-tab-${industry.key}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="group relative flex items-start gap-3.5 border-b border-(--m-line) py-3.5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-[background-color,box-shadow] duration-300",
                      isActive ? "bg-(--m-card) shadow-[0_0_0_1px_var(--m-line-strong),0_6px_16px_-8px_oklch(0_0_0/0.25)]" : "bg-(--m-panel)",
                    )}
                  >
                    <GlassIcon icon={industry.icon} size={22} tone={isActive ? "accent" : "ink"} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col pt-2">
                    <span
                      className={cn(
                        "text-[0.9375rem] font-medium transition-colors rtl:font-semibold",
                        isActive ? "text-(--m-ink)" : "text-(--m-muted) group-hover:text-(--m-ink)",
                      )}
                    >
                      {item.title}
                    </span>
                    <motion.span
                      initial={false}
                      animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_OUT }}
                      className="overflow-hidden text-sm leading-6 text-pretty text-(--m-muted)"
                    >
                      <span className="block pt-1">{item.description}</span>
                    </motion.span>
                  </span>
                  {isActive && cycling ? (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px bg-(--m-accent) ltr:origin-left rtl:origin-right"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <a
            href={mailto(t.common.demoSubject)}
            className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-(--m-ink) underline decoration-(--m-line-strong) underline-offset-4 hover:decoration-(--m-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--m-ink)"
          >
            {ind.link}
            <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
              →
            </span>
          </a>
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${current.key}`}
          className="rounded-[2rem] bg-(--m-panel) p-4 sm:p-8 lg:sticky lg:top-28"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)", y: -8 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <Conversation industry={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
