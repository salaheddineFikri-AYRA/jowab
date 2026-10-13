"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useId, useRef, useState } from "react";
import {
  IconCircleCheck,
  IconCloudMoon,
  IconEyeClosed,
  IconTriangleWarning,
} from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, type Brand } from "@/components/jowab/brand-logo";
import { GlassIcon, type GlassIconComponent } from "@/components/jowab/icons";
import {
  Eyebrow,
  Reveal,
  Section,
  text,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const CYCLE_MS = 9000;
const HOLD = 0.14;
const WORK_START = 9;
const WORK_END = 17;
const SIZE = 340;
const CENTER = SIZE / 2;
const RING = 146;

type Message = { hour: number; brand?: Brand; icon?: "voice" | "web" | "email" };

const MESSAGES: Message[] = [
  { hour: 1.3, brand: "whatsapp" },
  { hour: 6.7, icon: "voice" },
  { hour: 9.5, icon: "web" },
  { hour: 10.9, brand: "whatsapp" },
  { hour: 12.4, icon: "email" },
  { hour: 13.7, brand: "instagram" },
  { hour: 15.1, icon: "voice" },
  { hour: 16.5, brand: "whatsapp" },
  { hour: 20.4, brand: "messenger" },
  { hour: 22.9, brand: "whatsapp" },
];

const PAIN_ICONS: GlassIconComponent[] = [IconCloudMoon, IconTriangleWarning, IconEyeClosed];

// Rounded because Node and browsers disagree on the last digits of sin/cos,
// which would break hydration of the server-rendered SVG.
function point(hour: number, radius: number) {
  const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
  const round = (value: number) => Math.round(value * 100) / 100;
  return {
    x: round(CENTER + Math.cos(angle) * radius),
    y: round(CENTER + Math.sin(angle) * radius),
  };
}

function arc(fromHour: number, toHour: number, radius: number) {
  const start = point(fromHour, radius);
  const end = point(toHour, radius);
  const large = (toHour - fromHour) / 24 > 0.5 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
}

function isAfterHours(hour: number) {
  return hour < WORK_START || hour >= WORK_END;
}

function MessageGlyph({ message }: { message: Message }) {
  if (message.brand) {
    return <BrandLogo brand={message.brand} className="size-3.5" />;
  }
  const paths = {
    voice: "M5.2 2.5h2l1 2.6-1.3.9a6.5 6.5 0 0 0 3.1 3.1l.9-1.3 2.6 1v2a1.4 1.4 0 0 1-1.4 1.4A9.6 9.6 0 0 1 3.8 3.9a1.4 1.4 0 0 1 1.4-1.4Z",
    web: "M2.5 3.5h11v9h-11zM2.5 6h11",
    email: "M2.5 4h11v8h-11zM2.5 4.5 8 8.5l5.5-4",
  };
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-(--m-ink)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[message.icon ?? "web"]} />
    </svg>
  );
}

function Dial({ mode, passed }: { mode: "without" | "with"; passed: number }) {
  const { t, format } = useLocale();
  const d = t.problem.dial;
  const missed = MESSAGES.slice(0, passed).filter((m) => isAfterHours(m.hour)).length;
  const value = mode === "with" ? passed : missed;

  return (
    <>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx={CENTER} cy={CENTER} r={RING} fill="none" stroke="var(--m-line-strong)" strokeWidth="1" />
        <path d={arc(WORK_START, WORK_END, RING)} fill="none" stroke="var(--m-ink)" strokeOpacity="0.08" strokeWidth="22" strokeLinecap="round" />
        {Array.from({ length: 24 }, (_, hour) => {
          const isMajor = hour % 6 === 0;
          const inner = point(hour, RING - (isMajor ? 22 : 16));
          const outer = point(hour, RING - 12);
          return (
            <line
              key={hour}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--m-ink)"
              strokeOpacity={isMajor ? 0.35 : 0.14}
              strokeWidth={isMajor ? 1.5 : 1}
              strokeLinecap="round"
            />
          );
        })}
        {d.hours.map((label, index) => {
          const p = point(index * 6, RING - 38);
          return (
            <text
              key={label}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="var(--m-muted)"
            >
              {label}
            </text>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="absolute size-[44%] rounded-full bg-(--m-panel) shadow-[0_0_0_1px_var(--m-line)]" />
        <span className="relative flex items-baseline gap-1.5 text-(--m-ink)">
          <motion.span
            key={`${mode}-${value}`}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "text-[3.25rem] leading-none font-semibold tabular-nums",
              mode === "with" && "text-(--m-accent)",
            )}
          >
            {format(value)}
          </motion.span>
          <span className="text-sm text-(--m-muted)">
            {d.of} {format(MESSAGES.length)}
          </span>
        </span>
        <span className="relative mt-1 text-sm font-medium text-(--m-muted)">
          {mode === "with" ? d.answered : d.missed}
        </span>
      </div>

      {MESSAGES.map((message, index) => {
        const p = point(message.hour, RING);
        const isPassed = index < passed;
        const after = isAfterHours(message.hour);
        const state = !isPassed ? "pending" : mode === "with" ? "answered" : after ? "missed" : "slow";
        return (
          <motion.span
            key={index}
            className="absolute flex size-7 items-center justify-center rounded-full bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_2px_6px_oklch(0_0_0/0.08)]"
            style={{
              left: `${(p.x / SIZE) * 100}%`,
              top: `${(p.y / SIZE) * 100}%`,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={false}
            animate={
              state === "pending"
                ? { opacity: 0, scale: 0.4, y: 0, filter: "grayscale(0)" }
                : state === "missed"
                  ? { opacity: 0.35, scale: 0.85, y: 16, filter: "grayscale(1)" }
                  : { opacity: 1, scale: 1, y: 0, filter: "grayscale(0)" }
            }
            transition={
              state === "missed"
                ? { duration: 0.6, delay: 0.25, ease: [0.55, 0, 1, 0.45] }
                : { type: "spring", duration: 0.45, bounce: 0.35 }
            }
          >
            <MessageGlyph message={message} />
            {state === "answered" ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.4, delay: 0.1 }}
                className="absolute -end-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-(--m-mint) text-white ring-2 ring-(--m-panel)"
              >
                <svg viewBox="0 0 12 12" className="size-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 6.2 5 8.5l4.5-5" />
                </svg>
              </motion.span>
            ) : null}
            {state === "slow" ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, delay: 0.7 }}
                className="absolute -end-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-(--m-ink)/70 text-(--m-paper) ring-2 ring-(--m-panel)"
              >
                <svg viewBox="0 0 12 12" className="size-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 3.2V6l1.8 1.2" />
                </svg>
              </motion.span>
            ) : null}
          </motion.span>
        );
      })}
    </>
  );
}

export function Problem() {
  const { t } = useLocale();
  const p = t.problem;
  const shouldReduceMotion = useReducedMotionSafe();
  const toggleId = useId();
  const dialRef = useRef<HTMLDivElement>(null);
  const inView = useInView(dialRef, { amount: 0.4 });
  const [mode, setMode] = useState<"without" | "with">("without");
  const [touched, setTouched] = useState(false);
  const [passed, setPassed] = useState(0);
  const progress = useMotionValue(0);
  const rotate = useTransform(progress, (value) => Math.min(value, 1) * 360);
  const run = inView && !shouldReduceMotion;

  useAnimationFrame((_, delta) => {
    if (!run) return;
    let next = progress.get() + delta / CYCLE_MS;
    if (next >= 1 + HOLD) {
      next = 0;
      if (!touched) setMode((current) => (current === "without" ? "with" : "without"));
    }
    progress.set(next);
    const count = MESSAGES.filter((message) => message.hour / 24 <= next).length;
    if (count !== passed) setPassed(count);
  });

  function choose(next: "without" | "with") {
    setTouched(true);
    setMode(next);
    progress.set(0);
    setPassed(0);
  }

  const shownPassed = shouldReduceMotion ? MESSAGES.length : passed;

  return (
    <Section id="problem" labelledBy="problem-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="problem-heading" className={cn(text.h2, "max-w-[16ch]")}>
            {p.headline}
          </h2>
          <p className={text.lede}>{p.subheadline}</p>
          <ul className="flex flex-col gap-4">
            {p.pains.map((pain, index) => (
              <li key={pain}>
                <Reveal delay={index * 0.06} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-(--m-panel)">
                    <GlassIcon icon={PAIN_ICONS[index]} size={20} />
                  </span>
                  <span className="pt-1.5 text-[0.9375rem] leading-6 text-(--m-ink)/85">{pain}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-3 border-t border-(--m-line) pt-5 text-[0.9375rem] leading-6 font-medium text-(--m-ink)">
            <GlassIcon icon={IconCircleCheck} tone="accent" size={22} className="mt-0.5" />
            {p.solution}
          </p>
        </div>

        <figure className="flex flex-col items-center gap-6 rounded-[2rem] bg-(--m-panel) p-6 sm:p-10">
          <div
            role="group"
            aria-label={p.toggleLabel}
            className="flex rounded-full bg-(--m-chip) p-1"
          >
            {(["without", "with"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={mode === option}
                onClick={() => choose(option)}
                className={cn(
                  "relative min-h-9 rounded-full px-4 text-[0.8125rem] font-medium rtl:font-semibold",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)",
                  mode === option ? "text-(--m-ink)" : "text-(--m-muted) hover:text-(--m-ink)",
                )}
              >
                {mode === option ? (
                  <motion.span
                    layoutId={toggleId}
                    className="absolute inset-0 rounded-full bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_1px_2px_oklch(0_0_0/0.06)]"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.45, bounce: 0.18 }
                    }
                  />
                ) : null}
                <span className="relative">{option === "with" ? p.with : p.without}</span>
              </button>
            ))}
          </div>

          <div
            ref={dialRef}
            role="img"
            aria-label={p.dial.label}
            className="relative aspect-square w-full max-w-[22rem]"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ rotate }}
            >
              <div
                className={cn(
                  "absolute inset-[7%] rounded-full transition-colors duration-500",
                  mode === "with"
                    ? "bg-[conic-gradient(from_300deg,transparent_0deg,color-mix(in_oklab,var(--m-mint)_22%,transparent)_60deg,transparent_61deg)]"
                    : "bg-[conic-gradient(from_300deg,transparent_0deg,color-mix(in_oklab,var(--m-ink)_10%,transparent)_60deg,transparent_61deg)]",
                )}
              />
              <span
                className={cn(
                  "absolute top-[7%] left-1/2 h-[20%] w-[2px] -translate-x-1/2 rounded-full transition-colors duration-500",
                  mode === "with" ? "bg-(--m-mint)" : "bg-(--m-ink)/40",
                )}
              />
            </motion.div>
            <Dial mode={mode} passed={shownPassed} />
          </div>

          <figcaption className="grid w-full grid-cols-3 gap-2 border-t border-(--m-line) pt-5 text-center">
            {p.stats.map((stat, index) => (
              <span key={stat.label} className="flex flex-col gap-1">
                <span
                  className={cn(
                    "text-xl font-semibold text-(--m-ink) sm:text-2xl",
                    index === 2 && "text-(--m-accent)",
                  )}
                >
                  {stat.value}
                </span>
                <span className="text-xs leading-4 text-(--m-muted)">{stat.label}</span>
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
