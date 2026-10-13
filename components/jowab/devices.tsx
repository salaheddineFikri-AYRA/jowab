"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { IconCalendar, IconPhone } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, BrandTile } from "@/components/jowab/brand-logo";
import { GlassIcon } from "@/components/jowab/icons";
import {
  LogoMark,
  Section,
  SectionHeader,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const LID_EASE = [0.901, 0.016, 0, 1.032] as const;

const SCREEN: Variants = {
  closed: { opacity: 0, filter: "blur(8px)" },
  open: { opacity: 1, filter: "blur(0px)" },
};

function Screen({
  children,
  delay,
  instant,
}: {
  children: ReactNode;
  delay: number;
  instant: boolean;
}) {
  return (
    <motion.div
      variants={SCREEN}
      transition={
        instant ? { duration: 0 } : { duration: 0.35, ease: "easeOut", delay }
      }
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}

function Pop({
  children,
  delay,
  instant,
  className,
}: {
  children: ReactNode;
  delay: number;
  instant: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        closed: { opacity: 0, y: 8, scale: 0.96 },
        open: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={
        instant
          ? { duration: 0 }
          : { type: "spring", duration: 0.5, bounce: 0.2, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* MacBook: the store's site with Jowab's chat widget */

function MacScreen({ instant }: { instant: boolean }) {
  const { t } = useLocale();
  const l = t.devices.laptop;

  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex h-4 items-center gap-1 border-b border-black/5 bg-neutral-100 px-2">
        <span className="size-1.5 rounded-full bg-[#ff5f57]" />
        <span className="size-1.5 rounded-full bg-[#febc2e]" />
        <span className="size-1.5 rounded-full bg-[#28c840]" />
        <span
          dir="ltr"
          className="mx-auto rounded-sm bg-white px-6 text-[5.5px] text-neutral-500"
        >
          {l.url}
        </span>
      </div>
      <div className="flex items-center justify-between px-3 py-1.5 text-[6.5px] text-neutral-500">
        <span className="text-[8px] font-bold text-neutral-900">{l.store}</span>
        <span className="flex gap-2">
          {l.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>
      <div className="mx-3 flex gap-2.5">
        <div className="h-[92px] w-[96px] shrink-0 rounded-md bg-[radial-gradient(circle_at_40%_35%,#f1e3c6,#d6b98a_55%,#8a6a3a)]" />
        <div className="flex flex-col gap-1 pt-1">
          <span className="w-fit rounded-full bg-neutral-100 px-1.5 text-[5.5px] text-neutral-600">
            {l.badge}
          </span>
          <span className="text-[9px] font-bold text-neutral-900">
            {l.product}
          </span>
          <span className="text-[6.5px] text-neutral-500">{l.size}</span>
          <span className="text-[8px] font-semibold text-neutral-900">
            {l.price}
          </span>
          <span className="mt-1 w-fit rounded-full bg-neutral-900 px-2 py-0.5 text-[6.5px] text-white">
            {l.add}
          </span>
        </div>
      </div>

      <Pop
        delay={0.9}
        instant={instant}
        className="absolute end-2 bottom-2 w-[132px] overflow-hidden rounded-lg bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.12),0_10px_24px_-8px_rgb(0_0_0/0.35)]"
      >
        <div className="flex items-center gap-1 border-b border-black/5 px-1.5 py-1">
          <LogoMark className="size-2.5" />
          <span className="text-[6px] font-semibold text-neutral-900">
            {l.widget}
          </span>
          <span className="ms-auto size-1 rounded-full bg-(--m-mint)" />
        </div>
        <div className="flex flex-col gap-1 p-1.5 text-[6px] leading-[1.5]">
          <span className="self-end rounded-md rounded-se-sm bg-(--m-accent) px-1.5 py-0.5 text-white">
            {l.question}
          </span>
          <span className="self-start rounded-md rounded-ss-sm bg-neutral-100 px-1.5 py-0.5 text-neutral-900">
            {l.answer}
          </span>
        </div>
        <div className="mx-1.5 mb-1.5 rounded-full bg-neutral-100 px-1.5 py-0.5 text-[5.5px] text-neutral-400">
          {l.input}
        </div>
      </Pop>
    </div>
  );
}

function MacBook({ instant }: { instant: boolean }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[316px] -translate-1/2 perspective-distant">
      <motion.div
        style={{ transformOrigin: "bottom" }}
        variants={{ closed: { rotateX: -70 }, open: { rotateX: 0 } }}
        transition={instant ? { duration: 0 } : { duration: 1, ease: LID_EASE }}
        className="mx-auto h-[188px] w-[90%] rounded-t-xl bg-neutral-100 p-1.5 shadow-sm ring-1 shadow-black/10 ring-black/10"
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-lg rounded-b-sm bg-white">
          <Screen delay={0.55} instant={instant}>
            <MacScreen instant={instant} />
          </Screen>
        </div>
      </motion.div>
      <div className="relative h-4 w-full rounded-t-md rounded-b-3xl bg-linear-to-b from-neutral-100 to-neutral-300 shadow-[0px_1px_0px_0px_var(--color-neutral-200)_inset]">
        <div className="absolute inset-x-0 top-0 mx-auto h-2 w-14 rounded-b-sm bg-neutral-400 shadow-[0px_-1px_0px_0px_var(--color-neutral-300)_inset]" />
      </div>
    </div>
  );
}

const SIDE_BUTTON = "bg-[linear-gradient(90deg,#1b1b1d,#4a4a4f_45%,#2a2a2d)]";

const TITANIUM =
  "bg-[linear-gradient(145deg,#5b5b60_0%,#232326_20%,#46464b_40%,#1b1b1d_60%,#3d3d42_80%,#1f1f22_100%)] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)]";

/* iPhone: an Instagram DM answered with a live product link */

function PhoneScreen({ instant }: { instant: boolean }) {
  const { t } = useLocale();
  const p = t.devices.phone;

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="flex items-center justify-between px-6 pt-3 text-[9px] font-semibold text-neutral-950">
        <span>{p.time}</span>
        <span className="h-1.5 w-3 rounded-[2px] bg-current" />
      </div>
      <div className="mt-3 flex items-center gap-2 border-b border-black/5 px-3 pb-2">
        <span className="relative flex size-7 items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)] p-[1.5px]">
          <span className="flex size-full items-center justify-center rounded-full bg-white text-[9px] font-bold text-neutral-900">
            {p.store.charAt(0)}
          </span>
        </span>
        <span className="flex flex-col">
          <span className="text-[9.5px] font-semibold text-neutral-950">
            {p.store}
          </span>
          <span className="text-[7px] text-neutral-500">{p.active}</span>
        </span>
        <BrandLogo brand="instagram" className="ms-auto size-3.5" />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 px-3 pb-2 text-[8.5px] leading-[1.45]">
        <Pop
          delay={0.55}
          instant={instant}
          className="flex flex-col items-end gap-1 self-end"
        >
          <span className="text-[6.5px] text-neutral-400">{p.story}</span>
          <span className="h-14 w-10 rounded-md bg-[radial-gradient(circle_at_40%_35%,#f1e3c6,#d6b98a_55%,#8a6a3a)]" />
          <span className="max-w-[150px] rounded-2xl rounded-se-md bg-[#3797f0] px-2.5 py-1.5 text-white">
            {p.m1}
          </span>
        </Pop>
        <Pop
          delay={1.0}
          instant={instant}
          className="flex items-end gap-1.5 self-start"
        >
          <LogoMark className="size-4" />
          <span className="max-w-[160px] rounded-2xl rounded-ss-md bg-neutral-100 px-2.5 py-1.5 text-neutral-950">
            {p.m2}
          </span>
        </Pop>
        <Pop delay={1.4} instant={instant} className="self-end">
          <span className="block max-w-[150px] rounded-2xl rounded-se-md bg-[#3797f0] px-2.5 py-1.5 text-white">
            {p.m3}
          </span>
        </Pop>
        <Pop
          delay={1.8}
          instant={instant}
          className="flex items-end gap-1.5 self-start"
        >
          <LogoMark className="size-4" />
          <span className="flex w-[150px] items-center gap-2 rounded-2xl rounded-ss-md bg-neutral-100 p-1.5 text-neutral-950">
            <BrandTile brand="salla" className="size-7" />
            <span className="flex flex-col">
              <span className="text-[8.5px] font-semibold">{p.link}</span>
              <span className="text-[7px] text-neutral-500">{p.linkMeta}</span>
            </span>
          </span>
        </Pop>
        <Pop
          delay={2.1}
          instant={instant}
          className="self-end text-[6.5px] text-neutral-400"
        >
          {p.seen}
        </Pop>
      </div>
      <div className="mx-3 mb-4 rounded-full px-3 py-1.5 text-[8px] text-neutral-400 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]">
        {p.input}
      </div>
    </div>
  );
}

function IPhone({ instant }: { instant: boolean }) {
  return (
    <motion.div
      variants={{ closed: { y: 36 }, open: { y: 0 } }}
      transition={instant ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT }}
      className="absolute top-10 left-1/2 w-[210px] -translate-x-1/2"
    >
      <div className="absolute top-24 -left-[3px] flex flex-col gap-3">
        <div className={`h-5 w-[3px] rounded-l-sm ${SIDE_BUTTON}`} />
        <div className={`h-9 w-[3px] rounded-l-sm ${SIDE_BUTTON}`} />
        <div className={`h-9 w-[3px] rounded-l-sm ${SIDE_BUTTON}`} />
      </div>
      <div className="absolute top-32 -right-[3px]">
        <div className={`h-14 w-[3px] rounded-r-sm ${SIDE_BUTTON}`} />
      </div>
      <div className={`rounded-[2.5rem] p-[2px] ${TITANIUM}`}>
        <div className="rounded-[2.4rem] bg-black p-[5px]">
          <div className="relative h-[430px] w-full overflow-hidden rounded-[2.1rem] bg-white">
            <div className="absolute top-2 left-1/2 z-10 h-5 w-[70px] -translate-x-1/2 rounded-full bg-black" />
            <Screen delay={0.35} instant={instant}>
              <PhoneScreen instant={instant} />
            </Screen>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* iPad: the clinic front desk while Jowab takes a call */

function TabletScreen({ instant }: { instant: boolean }) {
  const { t } = useLocale();
  const c = t.devices.tablet;
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <div className="absolute inset-0 flex bg-(--m-win)">
      <aside className="flex w-[112px] shrink-0 flex-col gap-2 border-e border-(--m-win-line) bg-(--m-win-side) px-2.5 py-3">
        <span className="text-[9px] font-bold text-(--m-ink)">{c.clinic}</span>
        <span className="text-[7px] text-(--m-muted)">{c.desk}</span>
        <span className="mt-2 text-[7px] font-semibold text-(--m-muted)">
          {c.queueTitle}
        </span>
        {c.queue.map((item) => (
          <span
            key={item.name}
            className="flex items-center justify-between rounded-md bg-(--m-win) px-1.5 py-1 text-[7px] text-(--m-ink) shadow-[0_0_0_1px_var(--m-win-line)]"
          >
            {item.name}
            <span className="text-(--m-muted)">{item.time}</span>
          </span>
        ))}
      </aside>
      <div className="relative flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-(--m-panel) p-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-(--m-card)">
            <GlassIcon icon={IconPhone} size={14} tone="accent" />
          </span>
          <span className="flex flex-col">
            <span className="text-[8px] font-semibold text-(--m-ink)">
              {c.incoming}
            </span>
            <span
              dir="ltr"
              className="text-[7px] text-(--m-muted) rtl:text-end"
            >
              {c.caller} · {c.duration}
            </span>
          </span>
          <span className="ms-auto flex h-4 items-center gap-[2px]">
            {[5, 9, 6, 11, 7, 10, 5, 8].map((height, index) => (
              <motion.span
                key={index}
                className="w-[2px] origin-center rounded-full bg-(--m-accent)"
                style={{ height }}
                animate={
                  instant || shouldReduceMotion
                    ? undefined
                    : { scaleY: [1, 0.4, 1] }
                }
                transition={{
                  duration: 0.9 + (index % 3) * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {c.lines.map((line, index) => (
            <li key={index} className="flex gap-1.5 text-[8px] leading-[1.45]">
              {line.who === "agent" ? (
                <LogoMark className="mt-px size-3.5" />
              ) : (
                <span className="mt-px size-3.5 shrink-0 rounded-full bg-(--m-ink)/10" />
              )}
              <span
                className={
                  line.who === "agent"
                    ? "font-semibold text-(--m-ink)"
                    : "text-(--m-ink)/75"
                }
              >
                {line.text}
              </span>
            </li>
          ))}
        </ul>
        <Pop
          delay={0.85}
          instant={instant}
          className="absolute start-3 bottom-3 w-[176px] rounded-xl bg-(--m-card) p-2 shadow-[0_0_0_1px_var(--m-line),0_12px_28px_-10px_oklch(0_0_0/0.3)]"
        >
          <span className="flex items-center gap-1.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-(--m-glow)">
              <GlassIcon icon={IconCalendar} size={14} tone="accent" />
            </span>
            <span className="flex flex-col">
              <span className="text-[7.5px] font-semibold text-(--m-accent)">
                {c.booked}
              </span>
              <span className="text-[8px] font-semibold text-(--m-ink)">
                {c.slot}
              </span>
            </span>
          </span>
          <span className="mt-1.5 flex items-center gap-1 rounded-md bg-(--m-panel) px-1.5 py-1 text-[7px] text-(--m-muted)">
            <BrandLogo brand="whatsapp" className="size-2.5" />
            {c.confirm}
          </span>
        </Pop>
      </div>
    </div>
  );
}

function IPad({ instant }: { instant: boolean }) {
  const { dir } = useLocale();
  const from = dir === "rtl" ? -36 : 36;

  return (
    <motion.div
      variants={{ closed: { x: from }, open: { x: 0 } }}
      transition={instant ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT }}
      className="absolute top-12 w-[440px] ltr:left-8 rtl:right-8"
    >
      <div className="absolute top-12 -left-[3px] flex flex-col gap-2.5">
        <div className={`h-8 w-[3px] rounded-l-sm ${SIDE_BUTTON}`} />
        <div className={`h-8 w-[3px] rounded-l-sm ${SIDE_BUTTON}`} />
      </div>
      <div className="absolute -top-[3px] left-14">
        <div className={`h-[3px] w-10 rounded-t-sm ${SIDE_BUTTON}`} />
      </div>
      <div className={`rounded-[1.75rem] p-[2px] ${TITANIUM}`}>
        <div className="rounded-[1.65rem] bg-black p-[7px]">
          <div className="relative h-[320px] w-full overflow-hidden rounded-[1.2rem] bg-white">
            <Screen delay={0.35} instant={instant}>
              <TabletScreen instant={instant} />
            </Screen>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type Device = "web" | "social" | "voice";

const DEVICES: Device[] = ["web", "social", "voice"];

function DeviceVisual({ device }: { device: Device }) {
  const instant = Boolean(useReducedMotionSafe());

  return (
    <motion.div
      aria-hidden="true"
      initial="closed"
      whileInView="open"
      viewport={{ once: true, amount: 0.45 }}
      className="relative h-80 overflow-hidden rounded-[1.75rem] bg-(--m-panel) sm:h-[22rem]"
    >
      {device === "web" ? <MacBook instant={instant} /> : null}
      {device === "social" ? <IPhone instant={instant} /> : null}
      {device === "voice" ? <IPad instant={instant} /> : null}
    </motion.div>
  );
}

export function Devices() {
  const { t } = useLocale();
  const d = t.devices;

  return (
    <Section id="devices" labelledBy="devices-heading">
      <SectionHeader
        id="devices-heading"
        title={d.headline}
        lede={d.subheadline}
        className="max-w-3xl"
      />
      <ul className="mx-auto mt-12 grid max-w-6xl gap-10 sm:mt-16 md:grid-cols-3 md:gap-5">
        {DEVICES.map((device) => (
          <li key={device}>
            <figure>
              <DeviceVisual device={device} />
              <figcaption className="sr-only">{d.cards[device].alt}</figcaption>
            </figure>
            <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
              <h3 className="text-[0.9375rem] font-medium text-(--m-ink) rtl:font-semibold">
                {d.cards[device].title}
              </h3>
              <p
                className={cn(
                  "max-w-[36ch] text-sm leading-[1.45] text-pretty text-(--m-muted) rtl:leading-6",
                )}
              >
                {d.cards[device].body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
