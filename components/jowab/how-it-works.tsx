"use client";

import { animate } from "motion";
import {
  AnimatePresence,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  IconBookOpen,
  IconEnvelope,
  IconFeather,
  IconHeadphones,
  IconMsgs,
  IconPhone,
  IconRocket,
  IconWindow,
} from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, BrandTile, type Brand } from "@/components/jowab/brand-logo";
import { GlassIcon, type GlassIconComponent } from "@/components/jowab/icons";
import {
  Eyebrow,
  LogoMark,
  text,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const STEP_MS = 4200;
const DAYS = 7;
const DAYS_BY_STEP = [2, 5, 7];

type BurstItem = { brand?: Brand; icon?: GlassIconComponent };

const BURST_RINGS: { rx: number; ry: number; start: number; items: BurstItem[] }[] = [
  {
    rx: 70,
    ry: 48,
    start: -90,
    items: [
      { brand: "whatsapp" },
      { brand: "instagram" },
      { icon: IconPhone },
      { brand: "messenger" },
      { icon: IconEnvelope },
      { brand: "telegram" },
    ],
  },
  {
    rx: 130,
    ry: 90,
    start: -75,
    items: [
      { brand: "zendesk" },
      { icon: IconWindow },
      { brand: "freshdesk" },
      { icon: IconMsgs },
      { brand: "meta" },
      { icon: IconHeadphones },
    ],
  },
];

const BURST_ITEMS = BURST_RINGS.flatMap((ring) =>
  ring.items.map((item, index) => {
    const angle = ((ring.start + (index * 360) / ring.items.length) * Math.PI) / 180;
    return {
      ...item,
      x: Math.round(Math.cos(angle) * ring.rx),
      y: Math.round(Math.sin(angle) * ring.ry),
    };
  }),
);

function IconBurst({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const isOpen = Boolean(shouldReduceMotion) || (active && isInView);

  return (
    <div ref={ref} className="relative size-full">
      {BURST_ITEMS.map((item, index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-1/2 -mt-2.5 -ml-2.5 flex size-5 items-center justify-center"
          initial={false}
          animate={
            isOpen
              ? { x: item.x, y: item.y, opacity: 1, scale: 1 }
              : { x: 0, y: 0, opacity: 0, scale: 0.4 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : isOpen
                ? { type: "spring", duration: 0.7, bounce: 0.25, delay: 0.2 + index * 0.05 }
                : { duration: 0.3, ease: EASE_OUT }
          }
        >
          {item.brand ? (
            <BrandLogo brand={item.brand} className="size-5" />
          ) : (
            <GlassIcon icon={item.icon!} size={20} />
          )}
        </motion.span>
      ))}
      <LogoMark className="absolute top-1/2 left-1/2 z-10 size-10 -translate-1/2" />
    </div>
  );
}

const STACK: Brand[] = ["salla", "foodics", "zoho", "bayzat"];

function ConnectStack({ active }: { active: boolean }) {
  const { t } = useLocale();
  const c = t.steps.connect;
  const shouldReduceMotion = useReducedMotionSafe();
  const [typed, setTyped] = useState(0);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!active || shouldReduceMotion) return;
    let litTimer = 0;
    const controls = animate(0, c.url.length, {
      duration: 1.2,
      delay: 0.3,
      ease: "linear",
      onPlay: () => {
        setTyped(0);
        setLit(0);
      },
      onUpdate: (value) => setTyped(Math.round(value)),
      onComplete: () => {
        let count = 0;
        litTimer = window.setInterval(() => {
          count += 1;
          setLit(count);
          if (count >= STACK.length) window.clearInterval(litTimer);
        }, 260);
      },
    });
    return () => {
      controls.stop();
      window.clearInterval(litTimer);
    };
  }, [active, shouldReduceMotion, c.url]);

  const shownTyped = shouldReduceMotion ? c.url.length : active ? typed : 0;
  const shownLit = shouldReduceMotion ? STACK.length : active ? lit : 0;

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-xl bg-(--m-card) px-2.5 py-2 shadow-[0_0_0_1px_var(--m-line)] transition-shadow duration-300",
          active && "shadow-[0_0_0_1px_var(--m-line-strong),0_8px_20px_-12px_oklch(0_0_0/0.18)]",
        )}
      >
        <BrandTile brand="salla" className="size-6 rounded-md" />
        <span dir="ltr" className="flex h-6 flex-1 items-center text-[0.8125rem] text-(--m-ink) rtl:justify-end">
          {shownTyped > 0 ? (
            c.url.slice(0, shownTyped)
          ) : (
            <span className="text-(--m-muted)">{c.placeholder}</span>
          )}
          {active && shownTyped < c.url.length ? (
            <span className="ml-px inline-block h-3.5 w-px bg-(--m-ink)" />
          ) : null}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {STACK.map((brand, index) => {
          const isLit = index < shownLit;
          return (
            <motion.span
              key={brand}
              className="flex flex-col items-center gap-1.5"
              initial={false}
              animate={{ opacity: isLit ? 1 : 0.4, filter: isLit ? "grayscale(0)" : "grayscale(1)" }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative">
                <BrandTile brand={brand} className="size-10 rounded-xl" />
                <motion.span
                  className="absolute -end-1 -top-1 flex size-4 items-center justify-center rounded-full bg-(--m-mint) text-white ring-2 ring-(--m-panel)"
                  initial={false}
                  animate={{ scale: isLit ? 1 : 0 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.4 }}
                >
                  <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2.5 6.2 5 8.5l4.5-5" />
                  </svg>
                </motion.span>
              </span>
              <span className="text-[0.625rem] text-(--m-muted)">
                {isLit ? c.connected : t.brands[brand]}
              </span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

const TRAIN_ICONS: GlassIconComponent[] = [IconBookOpen, IconFeather, IconRocket];

function TrainAndShip({ active }: { active: boolean }) {
  const { t } = useLocale();
  const tr = t.steps.train;
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[0.8125rem] text-(--m-muted)">
        <motion.svg
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          animate={active && !shouldReduceMotion ? { rotate: 360 } : { rotate: 0 }}
          transition={
            active && !shouldReduceMotion
              ? { duration: 1.4, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
        >
          <path d="M13 8a5 5 0 0 1-8.6 3.5M3 8a5 5 0 0 1 8.6-3.5M11.5 2v2.5H9M4.5 14v-2.5H7" />
        </motion.svg>
        {tr.working}
        <LogoMark className="ms-auto size-5" />
      </div>
      <ul className="flex flex-col gap-1.5">
        {tr.rows.map((row, index) => (
          <motion.li
            key={row}
            className="flex items-center gap-2 rounded-lg bg-(--m-card) px-2.5 py-2 text-xs text-(--m-ink) shadow-[0_0_0_1px_var(--m-line)]"
            initial={false}
            animate={active ? { opacity: 1 } : { opacity: 0.35 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: EASE_OUT,
              delay: active && !shouldReduceMotion ? 0.5 + index * 0.35 : 0,
            }}
          >
            <GlassIcon icon={TRAIN_ICONS[index]} size={16} />
            {row}
            <motion.span
              className="ms-auto text-(--m-accent)"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                delay: active && !shouldReduceMotion ? 0.7 + index * 0.35 : 0,
              }}
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" />
              </svg>
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function DayStrip({ active, cycling }: { active: number; cycling: boolean }) {
  const { t, fill } = useLocale();
  const s = t.steps;
  const shouldReduceMotion = useReducedMotionSafe();
  const filled = DAYS_BY_STEP[active];
  const previous = active === 0 ? 0 : DAYS_BY_STEP[active - 1];

  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-(--m-line) pt-8 sm:mt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-[0.9375rem] font-medium text-(--m-ink) rtl:font-semibold">{s.headline}</p>
        <p className="text-sm text-(--m-muted)">{s.subheadline}</p>
      </div>
      <ol aria-label={s.days.label} className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: DAYS }, (_, index) => {
          const day = index + 1;
          const isFilled = day <= filled;
          const isLaunch = day === DAYS;
          return (
            <li key={day} className="relative flex flex-col gap-2">
              <span className="relative h-1.5 overflow-hidden rounded-full bg-(--m-ink)/8">
                <motion.span
                  className="absolute inset-0 rounded-full bg-(--m-mint) ltr:origin-left rtl:origin-right"
                  initial={false}
                  animate={{ scaleX: isFilled ? 1 : 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.45,
                          ease: EASE_OUT,
                          delay: isFilled && day > previous ? (day - previous - 1) * 0.18 : 0,
                        }
                  }
                />
              </span>
              <span className={cn("text-[0.6875rem] tabular-nums", isFilled ? "text-(--m-ink)" : "text-(--m-muted)")}>
                {fill(s.days.day, { n: day })}
              </span>
              {isLaunch ? (
                <AnimatePresence>
                  {isFilled && (cycling || shouldReduceMotion || active === 2) ? (
                    <motion.span
                      key="launch"
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.35, delay: shouldReduceMotion ? 0 : 0.6 }}
                      className="absolute -top-9 end-0 flex items-center gap-1 rounded-full bg-(--m-card) py-0.5 ps-1 pe-2 text-[0.6875rem] font-medium whitespace-nowrap text-(--m-accent) shadow-[0_0_0_1px_var(--m-line),0_4px_12px_-6px_oklch(0_0_0/0.2)]"
                    >
                      <GlassIcon icon={IconRocket} tone="accent" size={14} />
                      {s.days.launch}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function HowItWorks() {
  const { t, format } = useLocale();
  const s = t.steps;
  const shouldReduceMotion = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycling = inView && !paused && !shouldReduceMotion;

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(
      () => setActive((current) => (current + 1) % s.items.length),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [cycling, active, s.items.length]);

  const visuals = [
    <IconBurst key="burst" active={active === 0} />,
    <ConnectStack key="connect" active={active === 1} />,
    <TrainAndShip key="train" active={active === 2} />,
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="steps-heading"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2
        id="steps-heading"
        className={cn(
          text.display,
          "mt-4 flex flex-col text-[1.75rem] leading-[1.2] tracking-[-0.03em] sm:text-[2.375rem] rtl:leading-[1.45]",
        )}
      >
        {s.items.map((step, index) => (
          <motion.span
            key={step.title}
            className="text-(--m-ink)"
            initial={false}
            animate={{ opacity: index === active ? 1 : 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_OUT }}
          >
            {step.title}
            <sup
              className={cn(
                "ms-1 font-sans text-[0.6875rem] font-medium tracking-normal tabular-nums sm:text-xs",
                index === active ? "text-(--m-accent)" : "text-(--m-muted)",
              )}
            >
              {format(0)}
              {format(index + 1)}
            </sup>
          </motion.span>
        ))}
      </h2>

      <div className="mt-12 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-4">
        {s.items.map((step, index) => {
          const isActive = index === active;
          return (
            <button
              key={step.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              className="group flex flex-col rounded-2xl text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--m-ink)"
            >
              <motion.div
                aria-hidden="true"
                className={cn(
                  "flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-(--m-panel) px-6",
                  isActive ? "shadow-[0_0_0_1px_var(--m-line-strong)]" : "shadow-[0_0_0_1px_var(--m-line)]",
                )}
                animate={{ scale: isActive && !shouldReduceMotion ? 1.02 : 1 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              >
                {visuals[index]}
              </motion.div>
              <div className="mt-6 flex flex-col gap-1.5 px-1">
                <span className="relative flex items-center gap-3">
                  <span className={cn("text-xs font-medium tabular-nums", isActive ? "text-(--m-accent)" : "text-(--m-muted)")}>
                    {format(0)}
                    {format(index + 1)}
                  </span>
                  <span className="relative h-px flex-1 overflow-hidden bg-(--m-line)">
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.span
                          key="progress"
                          className="absolute inset-y-0 start-0 w-full bg-(--m-accent) ltr:origin-left rtl:origin-right"
                          initial={{ scaleX: 0 }}
                          animate={cycling ? { scaleX: [0, 1] } : { scaleX: 1 }}
                          exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.15 } }}
                          transition={
                            cycling
                              ? { duration: STEP_MS / 1000, ease: "linear" }
                              : { duration: shouldReduceMotion ? 0 : 0.35, ease: EASE_OUT }
                          }
                        />
                      ) : null}
                    </AnimatePresence>
                  </span>
                </span>
                <span className="mt-2 text-[0.9375rem] font-semibold text-(--m-ink)">{step.title}</span>
                <span className="max-w-[38ch] text-sm leading-5 text-pretty text-(--m-muted) rtl:leading-6">
                  {step.body}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <DayStrip active={active} cycling={cycling} />
    </section>
  );
}
