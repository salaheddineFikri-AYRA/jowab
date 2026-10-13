"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { IconEnvelope, IconLock, IconPhone, IconShopping, IconTeam, IconWindow } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, BrandTile, type Brand } from "@/components/jowab/brand-logo";
import { Flag, GlassIcon, type FlagCode, type GlassIconComponent } from "@/components/jowab/icons";
import {
  LogoMark,
  Reveal,
  Section,
  SectionHeader,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const TILE =
  "rounded-xl bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_1px_2px_oklch(0_0_0/0.04),0_8px_20px_-12px_oklch(0_0_0/0.12)]";

const BLUR_SWAP = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
  transition: { duration: 0.3, ease: EASE_OUT },
} as const;

function useRunning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const shouldReduceMotion = useReducedMotionSafe();
  return {
    ref,
    run: inView && !shouldReduceMotion,
    still: inView && Boolean(shouldReduceMotion),
  };
}

function useStep(count: number, ms: number, run: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = window.setTimeout(
      () => setStep((current) => (current + 1) % count),
      ms,
    );
    return () => window.clearTimeout(id);
  }, [run, step, count, ms]);
  return step;
}

/* Speed: the customer types «ابي» on an Arabic Mac keyboard and Jowab has already replied */

const KEY_UNIT = 30;
const PRESS_LOOP = 3.4;

type KeySpec = {
  label: string;
  symbol?: string;
  width?: number;
  press?: number;
  modifier?: boolean;
};

const KEY_ROWS: KeySpec[][] = [
  [
    { label: "tab", width: 1.5, modifier: true },
    { label: "ض" },
    { label: "ص" },
    { label: "ث" },
    { label: "ق" },
    { label: "ف" },
    { label: "غ" },
    { label: "ع" },
    { label: "ه" },
  ],
  [
    { label: "caps", width: 1.8, modifier: true },
    { label: "ش" },
    { label: "س" },
    { label: "ي", press: 0.32 },
    { label: "ب", press: 0.22 },
    { label: "ل" },
    { label: "ا", press: 0.12 },
    { label: "ت" },
  ],
  [
    { label: "shift", symbol: "⇧", width: 2.3, modifier: true },
    { label: "ئ" },
    { label: "ء" },
    { label: "ؤ" },
    { label: "ر" },
    { label: "لا" },
    { label: "ى" },
  ],
  [
    { label: "fn", modifier: true },
    { label: "control", symbol: "⌃", modifier: true },
    { label: "option", symbol: "⌥", modifier: true },
    { label: "command", symbol: "⌘", width: 1.3, modifier: true },
    { label: "", width: 5 },
  ],
];

function pressFrames(start: number) {
  return [0, start, start + 0.03, start + 0.08, start + 0.11, 1];
}

function Key({ spec, run }: { spec: KeySpec; run: boolean }) {
  const isPressed = spec.press !== undefined;
  const times = isPressed ? pressFrames(spec.press!) : undefined;

  return (
    <motion.div
      className={cn(
        "relative flex shrink-0 rounded-[5px] bg-(--m-card) font-medium",
        "shadow-[0_1px_0_var(--m-line-strong),0_0_0_0.5px_var(--m-line),inset_0_1px_0_oklch(1_0_0/0.9)]",
        spec.modifier
          ? "flex-col items-start justify-between px-1 py-[3px] text-[7px] leading-none"
          : "items-center justify-center text-[12px]",
        isPressed ? "text-(--m-accent)" : "text-(--m-ink)/70",
      )}
      style={{
        width: (spec.width ?? 1) * KEY_UNIT + ((spec.width ?? 1) - 1) * 3,
        height: KEY_UNIT,
      }}
      animate={isPressed && run ? { y: [0, 0, 1.5, 1.5, 0, 0] } : { y: 0 }}
      transition={
        isPressed && run
          ? { duration: PRESS_LOOP, times, repeat: Infinity, ease: "easeOut" }
          : { duration: 0.2 }
      }
    >
      {isPressed ? (
        <motion.span
          className="absolute inset-0 rounded-[5px] bg-(--m-accent)/10 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--m-accent)_45%,transparent)]"
          initial={{ opacity: 0.6 }}
          animate={run ? { opacity: [0.6, 0.6, 1, 1, 0.6, 0.6] } : { opacity: 1 }}
          transition={run ? { duration: PRESS_LOOP, times, repeat: Infinity } : { duration: 0.2 }}
        />
      ) : null}
      {spec.modifier ? (
        <>
          <span className="relative self-end text-[9px]">{spec.symbol}</span>
          <span className="relative">{spec.label}</span>
        </>
      ) : (
        <span className="relative">{spec.label}</span>
      )}
    </motion.div>
  );
}

function SpeedKeyboard() {
  const { t, format } = useLocale();
  const k = t.features.keyboard;
  const { ref, run, still } = useRunning();
  const loop = (values: number[], times: number[]) =>
    run
      ? { animate: { opacity: values }, transition: { duration: PRESS_LOOP, times, repeat: Infinity } }
      : { animate: { opacity: values[values.length - 2] }, transition: { duration: still ? 0 : 0.2 } };

  return (
    <div ref={ref} className="relative w-full max-w-[18rem] pt-10">
      <div dir="ltr" className="[mask-image:linear-gradient(to_right,black_55%,transparent_96%)]">
        <div className="flex w-max flex-col gap-[3px] rounded-[12px] bg-(--m-ink)/7 p-1 shadow-[inset_0_0_0_1px_var(--m-line)]">
          {KEY_ROWS.map((row, index) => (
            <div key={index} className="flex gap-[3px]">
              {row.map((spec, keyIndex) => (
                <Key key={keyIndex} spec={spec} run={run} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className={cn(TILE, "absolute top-0 right-0 flex h-8 items-center gap-1.5 rounded-full py-1 ps-1.5 pe-3")}
        initial={{ opacity: 0 }}
        animate={
          run
            ? { opacity: [0, 0, 1, 1, 0, 0], scale: [0.94, 0.94, 1, 1, 0.97, 0.94] }
            : { opacity: still ? 1 : 0 }
        }
        transition={
          run
            ? { duration: PRESS_LOOP, times: [0, 0.06, 0.1, 0.9, 0.96, 1], repeat: Infinity }
            : { duration: still ? 0 : 0.2 }
        }
      >
        <LogoMark className="size-5" />
        <span className="relative grid text-[0.6875rem] font-medium whitespace-nowrap text-(--m-ink)">
          <motion.span className="col-start-1 row-start-1" {...loop([1, 1, 0, 0, 0], [0, 0.36, 0.42, 0.98, 1])}>
            {k.typing}…
          </motion.span>
          <motion.span className="col-start-1 row-start-1 flex gap-1" {...loop([0, 0, 1, 1, 1], [0, 0.4, 0.46, 0.98, 1])}>
            {k.replied}
            <span className="font-semibold text-(--m-accent) tabular-nums">
              {format(1.2)} {k.unit}
            </span>
          </motion.span>
        </span>
      </motion.div>
    </div>
  );
}

/* Channels: the same agent picks up wherever the message comes from */

type Channel = { key: keyof ReturnType<typeof useLocale>["t"]["channels"]; brand?: Brand; icon?: GlassIconComponent };

const CHANNELS: Channel[] = [
  { key: "whatsapp", brand: "whatsapp" },
  { key: "instagram", brand: "instagram" },
  { key: "voice", icon: IconPhone },
  { key: "messenger", brand: "messenger" },
  { key: "email", icon: IconEnvelope },
  { key: "telegram", brand: "telegram" },
  { key: "web", icon: IconWindow },
];

function ChannelMark({ channel, className }: { channel: Channel; className?: string }) {
  if (channel.brand) return <BrandLogo brand={channel.brand} className={className} />;
  return <GlassIcon icon={channel.icon!} size={16} className={className} />;
}

const WAVE = [
  0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.3, 0.65, 0.85, 0.45, 0.7, 0.95, 0.5,
  0.35, 0.8, 0.6, 0.4, 0.7, 0.9, 0.45, 0.6, 0.3, 0.5,
];

function ChannelDetect() {
  const { t } = useLocale();
  const c = t.features.channel;
  const { ref, run } = useRunning();
  const step = useStep(CHANNELS.length, 1800, run);
  const layoutId = useId();
  const channel = CHANNELS[step];

  return (
    <div ref={ref} className={cn(TILE, "flex w-64 flex-col gap-3 p-3")}>
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-8 items-center justify-center rounded-lg bg-(--m-ink)/5">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span key={channel.key} className="flex" {...BLUR_SWAP}>
              <ChannelMark channel={channel} className="size-4" />
            </motion.span>
          </AnimatePresence>
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.6875rem] text-(--m-muted)">{c.incoming}</span>
          <span className="relative h-4 text-xs font-medium text-(--m-ink)">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={channel.key} className="absolute inset-0" {...BLUR_SWAP}>
                {t.channels[channel.key]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-(--m-accent)/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-(--m-accent)">
          <span className="size-1.5 rounded-full bg-(--m-accent)" />
          {c.live}
        </span>
      </div>

      <div className="flex h-7 items-center justify-between px-0.5">
        {WAVE.map((height, index) => (
          <motion.span
            key={index}
            className="h-full w-[3px] origin-center rounded-full bg-(--m-ink)/25"
            initial={{ scaleY: height * 0.6 }}
            animate={run ? { scaleY: [height * 0.6, height, height * 0.35, height * 0.6] } : { scaleY: height * 0.6 }}
            transition={run ? { duration: 1.1 + (index % 5) * 0.18, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-(--m-line) pt-2.5">
        {CHANNELS.map((item, index) => {
          const isActive = index === step;
          return (
            <span key={item.key} className="relative flex size-7 items-center justify-center">
              {isActive ? (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-md bg-(--m-ink)/6 shadow-[inset_0_0_0_1px_var(--m-line)]"
                  transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                />
              ) : null}
              <motion.span
                className="relative flex"
                animate={{ opacity: isActive ? 1 : 0.35, filter: isActive ? "grayscale(0)" : "grayscale(1)" }}
                transition={{ duration: 0.3 }}
              >
                <ChannelMark channel={item} className="size-3.5" />
              </motion.span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* Dialects: each speaker resolves to the dialect they wrote in */

const SEGMENTS: { row: number; width: number }[] = [
  { row: 0, width: 18 },
  { row: 1, width: 11 },
  { row: 0, width: 9 },
  { row: 2, width: 20 },
  { row: 1, width: 14 },
  { row: 0, width: 12 },
  { row: 2, width: 16 },
];

const DIALECT_STYLE: { flag: FlagCode; color: string }[] = [
  { flag: "sa", color: "#027963" },
  { flag: "eg", color: "#46d9ae" },
  { flag: "us", color: "#a1a1a1" },
];

function DialectMatch() {
  const { t, format } = useLocale();
  const d = t.features.dialect;
  const { ref, run, still } = useRunning();
  const step = useStep(6, 950, run);
  const resolved = still ? d.rows.length : Math.min(step, d.rows.length);

  return (
    <div ref={ref} className={cn(TILE, "flex w-64 flex-col gap-3 p-3")}>
      <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
        {SEGMENTS.map((segment, index) => (
          <span key={index} className="relative h-full bg-(--m-ink)/14" style={{ flexGrow: segment.width }}>
            <motion.span
              className="absolute inset-0"
              style={{ backgroundColor: DIALECT_STYLE[segment.row].color }}
              initial={false}
              animate={{ opacity: segment.row < resolved ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            />
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {d.rows.map((row, index) => {
          const isNamed = index < resolved;
          return (
            <li key={row.text} className="flex gap-2">
              <span className="relative size-[18px] shrink-0">
                <AnimatePresence initial={false}>
                  {isNamed ? (
                    <motion.span key="flag" className="absolute inset-0 flex items-center justify-center" {...BLUR_SWAP}>
                      <Flag code={DIALECT_STYLE[index].flag} size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="unknown"
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-(--m-ink)/8 text-[0.5625rem] font-medium text-(--m-muted)"
                      {...BLUR_SWAP}
                    >
                      {format(index + 1)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="relative h-3.5 text-[0.6875rem] leading-3.5 font-medium">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={isNamed ? "name" : "speaker"}
                      className={cn("absolute inset-0", isNamed ? "text-(--m-ink)" : "text-(--m-muted)")}
                      {...BLUR_SWAP}
                    >
                      {isNamed ? row.dialect : `${d.speaker} ${format(index + 1)}`}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="truncate text-xs text-(--m-ink)/75" dir="auto">
                  {row.text}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <motion.div
        className="flex items-center gap-1.5 border-t border-(--m-line) pt-2.5 text-[0.6875rem] text-(--m-muted)"
        initial={false}
        animate={{ opacity: resolved === d.rows.length ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <LogoMark className="size-3.5" />
        {d.footer}
      </motion.div>
    </div>
  );
}

/* Actions: what the agent did in your systems during one chat */

const TASK_MARKS: ({ brand: Brand } | { icon: GlassIconComponent })[] = [
  { brand: "salla" },
  { brand: "zoho" },
  { icon: IconTeam },
];

function ActionItems() {
  const { t, fill } = useLocale();
  const a = t.features.actions;
  const { ref, run, still } = useRunning();
  const step = useStep(6, 1000, run);
  const done = still ? a.tasks.length : Math.min(step, a.tasks.length);

  return (
    <div ref={ref} className={cn(TILE, "flex w-64 flex-col p-1.5")}>
      <div className="flex items-center justify-between px-2 pt-1 pb-2 text-[0.6875rem]">
        <span className="font-medium text-(--m-ink)">{a.title}</span>
        <span className="text-(--m-muted) tabular-nums">
          {fill(a.progress, { done, total: a.tasks.length })}
        </span>
      </div>
      <ul className="flex flex-col">
        {a.tasks.map((task, index) => {
          const isDone = index < done;
          const mark = TASK_MARKS[index];
          return (
            <li key={task.text} className="flex gap-2 rounded-lg px-2 py-2 odd:bg-(--m-ink)/[0.025]">
              <span className="relative mt-px flex size-3.5 shrink-0 items-center justify-center rounded-[4px] shadow-[inset_0_0_0_1.5px_var(--m-line-strong)]">
                <motion.span
                  className="absolute inset-0 rounded-[4px] bg-(--m-mint)"
                  initial={false}
                  animate={{ opacity: isDone ? 1 : 0, scale: isDone ? 1 : 0.6 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                />
                <svg viewBox="0 0 12 12" className="relative size-2.5 text-white" fill="none" aria-hidden="true">
                  <motion.path
                    d="M2.5 6.2 5 8.5l4.5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ pathLength: isDone ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  />
                </svg>
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="relative w-fit text-xs leading-4 font-medium">
                  <motion.span initial={false} animate={{ opacity: isDone ? 0.45 : 1 }} className="text-(--m-ink)">
                    {task.text}
                  </motion.span>
                  <motion.span
                    className="absolute inset-x-0 top-1/2 h-px bg-(--m-ink)/45 ltr:origin-left rtl:origin-right"
                    initial={false}
                    animate={{ scaleX: isDone ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.08 }}
                  />
                </span>
                <span className="flex items-center gap-1.5 text-[0.6875rem] text-(--m-muted)">
                  {"brand" in mark ? (
                    <BrandTile brand={mark.brand} className="size-3.5 rounded-[3px]" />
                  ) : (
                    <GlassIcon icon={mark.icon} size={14} />
                  )}
                  {task.meta}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Residency: data travels from the store to Gulf servers and nowhere else */

const PACKETS = [0, 1, 2];

function DataResidency() {
  const { t } = useLocale();
  const r = t.features.residency;
  const { ref, run } = useRunning();

  return (
    <div ref={ref} className="flex w-64 flex-col items-center gap-4">
      <div className="flex w-full items-center">
        <div className="flex flex-col items-center gap-1.5">
          <span className={cn(TILE, "flex size-14 items-center justify-center")}>
            <GlassIcon icon={IconShopping} size={28} />
          </span>
          <span className="text-[0.6875rem] font-medium text-(--m-ink)">{r.store}</span>
        </div>

        <div className="relative mb-5 h-6 flex-1">
          <span className="absolute inset-x-1 top-1/2 border-t border-dashed border-(--m-line-strong)" />
          {PACKETS.map((packet) => (
            <motion.span
              key={packet}
              className="absolute top-1/2 start-1 size-1.5 -translate-y-1/2 rounded-full bg-(--m-mint)"
              initial={{ opacity: 0 }}
              animate={
                run
                  ? { insetInlineStart: ["4%", "90%"], opacity: [0, 1, 1, 0] }
                  : { opacity: 0 }
              }
              transition={
                run
                  ? { duration: 1.8, delay: packet * 0.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }
                  : { duration: 0.2 }
              }
            />
          ))}
          <span className={cn(TILE, "absolute top-1/2 left-1/2 flex size-6 -translate-1/2 items-center justify-center rounded-full")}>
            <GlassIcon icon={IconLock} tone="accent" size={14} />
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <span className={cn(TILE, "flex size-14 flex-col items-center justify-center gap-1")}>
            <span className="flex gap-1">
              <Flag code="sa" size={18} className="rounded-[3px]" />
              <Flag code="ae" size={18} className="rounded-[3px]" />
            </span>
          </span>
          <span className="text-[0.6875rem] font-medium whitespace-nowrap text-(--m-ink)">{r.region}</span>
        </div>
      </div>

      <div className={cn(TILE, "flex w-full flex-col divide-y divide-(--m-line) text-[0.6875rem]")}>
        <span className="flex items-center justify-between gap-2 px-3 py-2">
          <span className="text-(--m-muted)">{r.sent}</span>
          <span className="font-medium text-(--m-ink) tabular-nums">{r.sentValue}</span>
        </span>
        <span className="flex items-center justify-between gap-2 px-3 py-2">
          <span className="text-(--m-muted)">{r.training}</span>
          <span className="font-medium text-(--m-accent)">{r.trainingValue}</span>
        </span>
      </div>
    </div>
  );
}

/* Handoff: the customer asks for a person and the context goes with them */

function Handoff() {
  const { t } = useLocale();
  const h = t.features.handoff;
  const { ref, run, still } = useRunning();
  const [typed, setTyped] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!run) return;
    let resetId = 0;
    const controls = animate(0, h.message.length, {
      duration: 1.1,
      delay: 0.4,
      ease: "linear",
      onPlay: () => {
        setTyped(0);
        setShowCard(false);
      },
      onUpdate: (value) => setTyped(Math.round(value)),
      onComplete: () => {
        setShowCard(true);
        resetId = window.setTimeout(() => setCycle((c) => c + 1), 3400);
      },
    });
    return () => {
      controls.stop();
      window.clearTimeout(resetId);
    };
  }, [run, cycle, h.message]);

  const message = still ? h.message : h.message.slice(0, typed);
  const visible = still || showCard;

  return (
    <div ref={ref} className={cn(TILE, "flex w-64 flex-col gap-2 p-1.5")}>
      <div className="flex items-center gap-2 rounded-lg bg-(--m-ink)/4 px-2.5 py-2">
        <span className="flex h-4 flex-1 items-center text-xs text-(--m-ink)">
          {message}
          {!visible ? <span className="ms-px h-3.5 w-px bg-(--m-ink)" /> : null}
        </span>
        <span className="flex size-5 items-center justify-center rounded-full bg-(--m-ink) text-(--m-card)">
          <svg viewBox="0 0 12 12" className="size-2.5 rtl:-scale-x-100" aria-hidden="true">
            <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-2 px-2 pt-1 pb-1.5"
        initial={false}
        animate={visible ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(3px)", y: 4 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <span className="text-[0.625rem] text-(--m-muted)">{h.to}</span>
        <span className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-(--m-accent)/12 text-[0.6875rem] font-semibold text-(--m-accent)">
            {h.initial}
          </span>
          <span className="text-xs font-medium text-(--m-ink)">{h.agent}</span>
        </span>
        <ul className="flex flex-col gap-1">
          {h.context.map((item, index) => (
            <motion.li
              key={item}
              className="flex items-center gap-1.5 rounded-md bg-(--m-ink)/4 px-2 py-1 text-[0.6875rem] text-(--m-ink)"
              initial={false}
              animate={visible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.25, delay: visible ? 0.1 + index * 0.08 : 0 }}
            >
              <span className="size-1 rounded-full bg-(--m-mint)" />
              {item}
            </motion.li>
          ))}
        </ul>
        <span className="text-[0.625rem] text-(--m-muted)">{h.footer}</span>
      </motion.div>
    </div>
  );
}

const FEATURE_ORDER = ["speed", "channels", "dialects", "actions", "residency", "handoff"] as const;

const VISUALS: Record<(typeof FEATURE_ORDER)[number], ReactNode> = {
  speed: <SpeedKeyboard />,
  channels: <ChannelDetect />,
  dialects: <DialectMatch />,
  actions: <ActionItems />,
  residency: <DataResidency />,
  handoff: <Handoff />,
};

export function Features() {
  const { t } = useLocale();
  const f = t.features;

  return (
    <Section id="features" labelledBy="features-heading">
      <SectionHeader
        id="features-heading"
        eyebrow={f.eyebrow}
        title={f.headline}
        lede={f.subheadline}
      />
      <ul className="mt-14 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_ORDER.map((key, index) => (
          <li key={key}>
            <Reveal delay={(index % 3) * 0.06} className="h-full">
              <article className="flex h-full min-h-[23rem] flex-col overflow-hidden rounded-2xl bg-(--m-panel) p-6">
                <div aria-hidden="true" className="flex flex-1 items-center justify-center pb-6">
                  {VISUALS[key]}
                </div>
                <h3 className="text-[0.9375rem] font-semibold text-(--m-ink)">{f.items[key].title}</h3>
                <p className="mt-1.5 max-w-[36ch] text-sm leading-5 text-pretty text-(--m-muted) rtl:leading-6">
                  {f.items[key].body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
