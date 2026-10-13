"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import jowabMark from "@/public/logo/jowab-mark.png";
import wordmarkAr from "@/public/logo/jowab-wordmark-ar.png";
import wordmarkEn from "@/public/logo/jowab-wordmark-en.png";

/**
 * Shared building blocks for the Jowab landing page. Every section uses these
 * so buttons, type, spacing and motion stay the same from top to bottom.
 * Colors come from the `--m-*` tokens in `app/globals.css`.
 */

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const subscribeNever = () => () => {};

/**
 * Motion's `useReducedMotion` already reads the media query on the first
 * client render, which disagrees with the server HTML. This one stays `false`
 * until hydration has finished, then reports the real preference.
 */
export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  return hydrated && Boolean(prefersReduced);
}

const PRESS = { scale: 0.97 } as const;
const PRESS_TRANSITION = { duration: 0.12, ease: EASE_OUT };

export const text = {
  display: "font-medium rtl:font-bold",
  h2: "font-medium rtl:font-bold text-[2.125rem] leading-[1.1] tracking-[-0.035em] text-balance text-(--m-ink) sm:text-5xl rtl:leading-[1.35]",
  lede: "max-w-[52ch] text-base text-pretty text-(--m-muted) sm:text-[0.9375rem] sm:leading-6 rtl:sm:text-base rtl:sm:leading-7",
} as const;

export function mailto(subject: string) {
  return `mailto:contact@jowab.ai?subject=${encodeURIComponent(subject)}`;
}

export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** The Jowab leaf mark (`public/logo/secondary logo.png`). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={jowabMark}
      alt=""
      aria-hidden="true"
      sizes="64px"
      draggable={false}
      className={cn("size-6 shrink-0 object-contain select-none", className)}
    />
  );
}

/** The Arabic or English primary logo, matching the page language. */
export function Wordmark({
  className,
  alt = "",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  const { lang } = useLocale();

  return (
    <Image
      src={lang === "ar" ? wordmarkAr : wordmarkEn}
      alt={alt}
      priority={priority}
      sizes="200px"
      draggable={false}
      className={cn("h-8 w-auto select-none", className)}
    />
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "soft";
  size?: "sm" | "md";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileTap={shouldReduceMotion ? undefined : PRESS}
      transition={PRESS_TRANSITION}
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap rtl:font-semibold",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)",
        size === "md" &&
          "min-h-11 px-4 text-base sm:min-h-9 sm:px-3.5 sm:text-sm",
        size === "sm" &&
          "min-h-9 px-3.5 text-sm sm:min-h-8 sm:px-3 sm:text-[0.8125rem]",
        variant === "solid" &&
          "bg-(--m-ink) text-(--m-paper) hover:bg-(--m-ink)/88",
        variant === "outline" &&
          "text-(--m-ink) shadow-[inset_0_0_0_1px_var(--m-line-strong)] hover:bg-(--m-ink)/4",
        variant === "soft" &&
          "bg-(--m-chip) text-(--m-ink) hover:bg-(--m-chip-hover)",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-1/2 pointer-fine:hidden"
      />
    </motion.a>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-medium tracking-[0.18em] text-(--m-muted) uppercase rtl:text-[0.8125rem] rtl:font-semibold",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  className,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={text.h2}>
        {title}
      </h2>
      {lede ? <p className={text.lede}>{lede}</p> : null}
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: EASE_OUT }
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * Renders children at a fixed design size and scales them to the container
 * width, so product mockups keep their proportions like a screenshot would.
 */
export function Stage({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const update = () => setScale(node.clientWidth / width);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function TrafficLights({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-1.5", className)}
    >
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

export function TypingDots({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-1.5 rounded-full bg-current"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] }
          }
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

/**
 * Steps through a scripted sequence once: each entry is the pause before the
 * next step. Returns the last step straight away when motion is reduced.
 */
export function useTimeline(delays: readonly number[], run = true) {
  const shouldReduceMotion = useReducedMotionSafe();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!run || shouldReduceMotion || step >= delays.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), delays[step]);
    return () => window.clearTimeout(id);
  }, [delays, run, shouldReduceMotion, step]);

  return shouldReduceMotion ? delays.length : step;
}
