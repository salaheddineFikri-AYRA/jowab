"use client";

import { AnimatePresence, animate, motion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  IconCalendar,
  IconConnections,
  IconEnvelope,
  IconFile,
  IconPhone,
  IconWindow,
} from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandLogo, BrandTile, type Brand } from "@/components/jowab/brand-logo";
import { Flag, GlassIcon, type GlassIconComponent } from "@/components/jowab/icons";
import { HomeIndicator, IPhone, StatusBar } from "@/components/jowab/phone";
import {
  EASE_OUT,
  LogoMark,
  TypingDots,
  useReducedMotionSafe,
  useTimeline,
} from "@/components/jowab/ui";

export type Surface = "whatsapp" | "voice" | "web" | "email" | "actions";

export const SURFACES: Surface[] = ["whatsapp", "voice", "web", "email", "actions"];

const SURFACE_ICONS: Record<Exclude<Surface, "whatsapp">, GlassIconComponent> = {
  voice: IconPhone,
  web: IconWindow,
  email: IconEnvelope,
  actions: IconConnections,
};

export function SurfaceIcon({ surface, size = 16 }: { surface: Surface; size?: number }) {
  if (surface === "whatsapp") {
    return (
      <span className="flex items-center justify-center" style={{ width: size, height: size }}>
        <BrandLogo brand="whatsapp" className="size-[85%]" />
      </span>
    );
  }
  return <GlassIcon icon={SURFACE_ICONS[surface]} size={size} />;
}

/* SF Symbol-style glyphs drawn on a 24pt grid */

const GLYPHS = {
  chevronBack: "M15 4.5 7.5 12l7.5 7.5",
  video: "M3.5 7.5A2 2 0 0 1 5.5 5.5h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-9ZM15.5 10.2l4.3-2.8a.6.6 0 0 1 .9.5v8.2a.6.6 0 0 1-.9.5l-4.3-2.8",
  phone: "M8.3 3.8 6.2 4.5c-1.3.4-2 1.8-1.6 3.2 1.9 6 6.3 10.4 12.3 12.3 1.4.4 2.8-.3 3.2-1.6l.7-2.1a1 1 0 0 0-.5-1.2l-3.1-1.6a1 1 0 0 0-1.2.2l-1.4 1.5a10 10 0 0 1-5.2-5.2l1.5-1.4a1 1 0 0 0 .2-1.2L9.5 4.3a1 1 0 0 0-1.2-.5Z",
  plus: "M12 4.5v15M4.5 12h15",
  camera: "M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9ZM12 16a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z",
  mic: "M12 14.5a3 3 0 0 0 3-3v-5a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3ZM6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3",
  sticker: "M19.5 13.5V7a2.5 2.5 0 0 0-2.5-2.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h6.5m6-6-6 6m6-6h-3.5a2.5 2.5 0 0 0-2.5 2.5v3.5",
  lock: "M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5M6.5 10.5h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
  flashlight: "M8.5 3.5h7l-1 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 19V8l-1-4.5ZM12 11.5v2.5",
  speaker: "M4 9.5h3l4.5-4v13L7 14.5H4v-5ZM15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11",
  micOff: "M12 14.5a3 3 0 0 0 3-3v-5a3 3 0 0 0-5.6-1.5M9 9v2.5a3 3 0 0 0 4.4 2.6M6.5 11.5a5.5 5.5 0 0 0 9.3 4M17.5 11.5a5.4 5.4 0 0 1-.3 1.8M12 17v3M4.5 4.5l15 15",
  ellipsis: "M6 12h.01M12 12h.01M18 12h.01",
  keypad: "M7 6h.01M12 6h.01M17 6h.01M7 11h.01M12 11h.01M17 11h.01M7 16h.01M12 16h.01M17 16h.01M12 20.5h.01",
  hangUp: "M3.5 13.8c4.6-4.4 12.4-4.4 17 0 .5.5.6 1.3.1 1.9l-1.4 1.6a1 1 0 0 1-1.3.2l-2.6-1.4a1 1 0 0 1-.5-1v-1.6a10.5 10.5 0 0 0-5.6 0v1.6a1 1 0 0 1-.5 1l-2.6 1.4a1 1 0 0 1-1.3-.2l-1.4-1.6c-.5-.6-.4-1.4.1-1.9Z",
  trash: "M5 7h14M9.5 7V5.5h5V7M7 7l.8 12a1.5 1.5 0 0 0 1.5 1.5h5.4a1.5 1.5 0 0 0 1.5-1.5L17 7",
  folder: "M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4.5l2 2H19a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V7Z",
  reply: "M10 5.5 4 11l6 5.5M4.5 11H14a6 6 0 0 1 6 6v1",
  compose: "M12.5 4.5H6A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5v-6.5M17.5 4l2.5 2.5-7.5 7.5-3.2.7.7-3.2L17.5 4Z",
  chevronUp: "m6 15 6-6 6 6",
  chevronDown: "m6 9 6 6 6-6",
  tabs: "M8 8V5.5A1.5 1.5 0 0 1 9.5 4h9A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H16M5.5 8h9A1.5 1.5 0 0 1 16 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 18.5v-9A1.5 1.5 0 0 1 5.5 8Z",
} as const;

function Glyph({
  name,
  size = 24,
  className,
  weight = 2,
  mirror = false,
}: {
  name: keyof typeof GLYPHS;
  size?: number;
  className?: string;
  weight?: number;
  /** Directional glyphs flip in Arabic. */
  mirror?: boolean;
}) {
  const isDots = name === "ellipsis" || name === "keypad";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", mirror && "rtl:-scale-x-100", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={isDots ? 3.2 : weight}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={GLYPHS[name]} />
    </svg>
  );
}

const MESSAGE_IN = {
  initial: { opacity: 0, y: 14, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", duration: 0.45, bounce: 0.18 },
} as const;

/* WhatsApp (iOS, light): the customer's own phone, chatting with a store on Jowab */

const WHATSAPP_STEPS = [500, 900, 1600, 1500, 800, 1500] as const;

function ReadTicks({ read }: { read: boolean }) {
  return (
    <svg viewBox="0 0 18 11" className="h-[11px] w-[16px]" fill="none" aria-hidden="true">
      <motion.path
        d="M1 5.8 4.3 9 11 1.6M7.4 9 14.2 1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ color: read ? "#53bdeb" : "#8696a0" }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

function WaBubble({
  mine,
  time,
  read,
  children,
}: {
  mine?: boolean;
  time: string;
  read?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      layout="position"
      {...MESSAGE_IN}
      className={cn(
        "relative mt-[6px] max-w-[300px] rounded-[8px] px-[9px] pt-[6px] pb-[7px] text-[16.5px] leading-[21px] text-[#111b21] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]",
        mine
          ? "me-[8px] self-end rounded-se-none bg-[#d9fdd3]"
          : "ms-[8px] self-start rounded-ss-none bg-white",
      )}
    >
      <svg
        viewBox="0 0 8 13"
        aria-hidden="true"
        className={cn(
          "absolute top-0 h-[13px] w-[8px] rtl:-scale-x-100",
          mine ? "-end-[8px] text-[#d9fdd3]" : "-start-[8px] text-white",
        )}
      >
        <path
          fill="currentColor"
          d={
            mine
              ? "M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
              : "M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
          }
          transform="translate(0 -1)"
        />
      </svg>
      <div dir="auto">
        {children}
        <span aria-hidden="true" className={cn("inline-block", mine ? "w-[74px]" : "w-[56px]")} />
      </div>
      <span className="absolute end-[8px] bottom-[5px] flex items-center gap-[3px] text-[11px] leading-none text-[#667781]">
        {time}
        {mine ? <ReadTicks read={Boolean(read)} /> : null}
      </span>
    </motion.div>
  );
}

function WhatsAppScreen() {
  const { t } = useLocale();
  const w = t.heroPhone.whatsapp;
  const step = useTimeline(WHATSAPP_STEPS);
  const isTyping = step === 2 || step === 5;

  return (
    <div className="absolute inset-0 flex flex-col bg-[#efeae2]">
      <header className="relative z-20 bg-[#f6f6f6]/95 shadow-[0_0.5px_0_rgb(0_0_0/0.2)] backdrop-blur-xl">
        <StatusBar />
        <div className="flex h-[52px] items-center gap-[8px] ps-[8px] pe-[16px]">
          <span className="flex items-center text-[#007aff]">
            <Glyph name="chevronBack" size={30} weight={2.4} mirror />
            <span className="-ms-[4px] text-[17px] tabular-nums">{w.unread}</span>
          </span>
          <span className="ms-[2px] flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#dfe5e7] text-[16px] font-semibold text-[#54656f]">
            {w.business.charAt(0)}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-center gap-[4px] text-[16.5px] leading-[20px] font-semibold text-black">
              <span className="truncate">{w.business}</span>
              <svg viewBox="0 0 16 16" className="size-[15px] shrink-0" aria-hidden="true">
                <path
                  d="M8 .8 9.8 2l2.1-.2.8 2 1.9 1-.4 2.1 1 1.9-1.6 1.4-.1 2.1-2.1.5-1.2 1.8-2-.7-2 .7-1.2-1.8-2.1-.5-.1-2.1L.4 8.8l1-1.9L1 4.8l1.9-1 .8-2 2.1.2Z"
                  fill="#25d366"
                />
                <path d="m5.3 8.2 1.8 1.8 3.7-3.8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="relative h-[16px] text-[12.5px] leading-[16px] text-[#8e8e93]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isTyping ? "typing" : "meta"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0"
                >
                  {isTyping ? w.typing : w.businessMeta}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span className="flex items-center gap-[22px] text-[#007aff]">
            <Glyph name="video" size={26} weight={1.7} />
            <Glyph name="phone" size={23} weight={1.7} />
          </span>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[url(/mockups/whatsapp-doodle.png)] bg-[length:420px_auto] opacity-[0.22]" />
        <div className="relative flex h-full flex-col justify-end px-[10px] pt-[12px] pb-[10px]">
          <div className="mb-auto flex flex-col items-center gap-[10px]">
            <span className="rounded-[8px] bg-white/95 px-[12px] py-[4px] text-[12.5px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
              {w.today}
            </span>
            <span className="max-w-[330px] rounded-[8px] bg-[#fff5c4] px-[12px] py-[6px] text-center text-[12.5px] leading-[17px] text-[#54656f] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
              <Glyph name="lock" size={11} weight={2.4} className="me-[4px] inline -translate-y-px" />
              {w.notice}
            </span>
          </div>
          <AnimatePresence initial={false}>
            {step >= 1 ? (
              <WaBubble key="c1" mine time={w.time1} read={step >= 2}>
                {w.customer1}
              </WaBubble>
            ) : null}
            {step >= 3 ? (
              <WaBubble key="a1" time={w.time1}>
                {w.agent1}
              </WaBubble>
            ) : null}
            {step >= 4 ? (
              <WaBubble key="c2" mine time={w.time2} read={step >= 5}>
                {w.customer2}
              </WaBubble>
            ) : null}
            {step >= 6 ? (
              <WaBubble key="a2" time={w.time2}>
                <span className="-mx-[5px] -mt-[2px] mb-[6px] flex items-center gap-[10px] overflow-hidden rounded-[6px] bg-[#f0f2f5]">
                  <span className="flex size-[64px] shrink-0 items-center justify-center bg-white">
                    <BrandLogo brand="salla" className="size-[40px]" />
                  </span>
                  <span className="flex min-w-0 flex-col pe-[10px]">
                    <span className="truncate text-[14.5px] font-semibold">{w.link}</span>
                    <span dir="ltr" className="truncate text-[13px] text-[#667781] rtl:text-end">
                      {w.linkMeta}
                    </span>
                  </span>
                </span>
                <span dir="ltr" className="block text-[#027eb5] underline rtl:text-end">
                  https://{w.linkMeta}/t/4827
                </span>
                {w.agent2}
              </WaBubble>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <footer className="relative bg-[#f6f6f6] pb-[30px] shadow-[0_-0.5px_0_rgb(0_0_0/0.2)]">
        <div className="flex h-[52px] items-center gap-[12px] px-[12px] text-[#007aff]">
          <Glyph name="plus" size={28} weight={1.8} />
          <span className="flex h-[36px] flex-1 items-center justify-end rounded-full bg-white px-[10px] shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.18)]">
            <Glyph name="sticker" size={22} weight={1.6} />
          </span>
          <Glyph name="camera" size={27} weight={1.7} />
          <Glyph name="mic" size={25} weight={1.7} />
        </div>
        <HomeIndicator />
      </footer>
    </div>
  );
}

/* Call: the customer rings a clinic and Jowab picks up */

const CALL_STEPS = [700, 1700, 1900, 1500] as const;

function useCallTimer(start: number) {
  const shouldReduceMotion = useReducedMotionSafe();
  const [seconds, setSeconds] = useState(start);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  return seconds;
}

const DIALECTS = [
  { key: "khaleeji", flag: "sa" },
  { key: "english", flag: "us" },
  { key: "egyptian", flag: "eg" },
] as const;

const CALL_BUTTONS: (keyof typeof GLYPHS)[] = ["speaker", "video", "micOff", "ellipsis", "hangUp", "keypad"];

function ClinicLogo() {
  return (
    <span className="flex size-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[linear-gradient(160deg,#4fb3c7,#1f6f86)] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.25)]">
      <svg viewBox="0 0 24 24" className="size-[30px] text-white" fill="currentColor" aria-hidden="true">
        <path d="M7.4 3.2c-2.6 0-4.4 2.1-4.4 4.9 0 2.2.9 3.6 1.5 5.3.6 1.8.8 3.7 1.2 5.6.3 1.4.9 2 1.7 2 1.6 0 1.6-2.7 2.2-4.6.4-1.3 1.2-2 2.4-2s2 .7 2.4 2c.6 1.9.6 4.6 2.2 4.6.8 0 1.4-.6 1.7-2 .4-1.9.6-3.8 1.2-5.6.6-1.7 1.5-3.1 1.5-5.3 0-2.8-1.8-4.9-4.4-4.9-1.9 0-3 .9-4.6.9s-2.7-.9-4.6-.9Z" />
      </svg>
    </span>
  );
}

function CallScreen() {
  const { t, format } = useLocale();
  const v = t.heroPhone.voice;
  const step = useTimeline(CALL_STEPS);
  const seconds = useCallTimer(42);
  const clock = `${format(Math.floor(seconds / 60), { minimumIntegerDigits: 2 })}:${format(seconds % 60, { minimumIntegerDigits: 2 })}`;
  const active: string[] = step >= 3 ? ["khaleeji", "english"] : ["khaleeji"];
  const booked = step >= 4;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_20%_0%,#6f8790_0%,transparent_65%),linear-gradient(180deg,#56676f_0%,#3d4a51_45%,#2c3338_75%,#2a2b31_100%)]" />
      <StatusBar tone="light" />

      <div className="relative flex items-center gap-[12px] px-[24px] pt-[34px]">
        <ClinicLogo />
        <span className="flex min-w-0 flex-col">
          <span dir="ltr" className="text-[15px] text-white/70 tabular-nums rtl:text-end">
            {clock}
          </span>
          <span className="truncate text-[30px] leading-[36px] font-semibold tracking-[-0.3px]">{v.business}</span>
        </span>
      </div>

      <div className="relative mx-[18px] mt-auto mb-[26px]">
        <AnimatePresence mode="wait" initial={false}>
          {booked ? (
            <motion.div
              key="booked"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="flex flex-col gap-[14px] rounded-[24px] bg-white/[0.13] p-[16px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.22)] backdrop-blur-2xl"
            >
              <span className="flex items-start justify-between gap-[12px]">
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[12.5px] text-white/65">{v.booked}</span>
                  <span className="text-[28px] leading-[34px] font-bold">{v.bookedValue}</span>
                </span>
                <span className="flex size-[36px] items-center justify-center rounded-full bg-white/15">
                  <GlassIcon icon={IconCalendar} size={20} />
                </span>
              </span>
              <span className="flex items-end justify-between gap-[12px] text-[13px]">
                <span className="text-white/90">{v.bookedDetail}</span>
                <span className="flex items-center gap-[5px] text-white/65">
                  <LogoMark className="size-[16px]" />
                  {v.bookedBy}
                </span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="captions"
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.25 }}
              className="flex min-h-[188px] flex-col gap-[10px] rounded-[24px] bg-white/[0.13] p-[16px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.22)] backdrop-blur-2xl"
            >
              <span className="flex items-center justify-between gap-[8px]">
                <span className="text-[12.5px] text-white/65">{v.captions}</span>
                <span className="flex gap-[4px]">
                  {DIALECTS.map((dialect) => (
                    <motion.span key={dialect.key} initial={false} animate={{ opacity: active.includes(dialect.key) ? 1 : 0.3 }}>
                      <Flag code={dialect.flag} size={16} />
                    </motion.span>
                  ))}
                </span>
              </span>
              {v.lines.map((line, index) =>
                step > index ? (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="text-[16px] leading-[22px]"
                  >
                    <span className={cn("font-semibold", line.who === "agent" ? "text-white" : "text-white/55")}>
                      {line.who === "agent" ? v.business : v.you}:{" "}
                    </span>
                    <span dir="auto" className={line.who === "agent" ? "text-white" : "text-white/80"}>
                      {line.text}
                    </span>
                  </motion.p>
                ) : null,
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative grid grid-cols-3 gap-x-[34px] gap-y-[18px] px-[48px] pb-[56px]">
        {CALL_BUTTONS.map((glyph, index) => (
          <span key={glyph} className="flex flex-col items-center gap-[6px]">
            <span
              className={cn(
                "flex size-[72px] items-center justify-center rounded-full",
                glyph === "hangUp"
                  ? "bg-[#eb3b30]"
                  : "bg-white/[0.16] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.25)] backdrop-blur-xl",
              )}
            >
              <Glyph name={glyph} size={30} weight={2} />
            </span>
            <span className="text-[12px] font-medium text-white/90">{v.controls[index]}</span>
          </span>
        ))}
      </div>
      <HomeIndicator tone="light" />
    </div>
  );
}

/* Web chat: the store's chat widget in Safari */

const WEB_STEPS = [500, 900, 1400, 1200, 700, 800, 1300] as const;

function WebBubble({ mine, children }: { mine?: boolean; children: ReactNode }) {
  return (
    <motion.div
      layout="position"
      {...MESSAGE_IN}
      className={cn(
        "max-w-[86%] rounded-[20px] px-[13px] py-[9px] text-[15px] leading-[21px]",
        mine ? "self-end rounded-ee-[6px] bg-[#111] text-white" : "self-start rounded-es-[6px] bg-[#f2f2f7] text-black",
      )}
    >
      <p dir="auto">{children}</p>
    </motion.div>
  );
}

function WebScreen() {
  const { t } = useLocale();
  const w = t.heroPhone.web;
  const step = useTimeline(WEB_STEPS);

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div aria-hidden="true" className="px-[20px] pt-[6px]">
        <div className="flex items-center justify-between py-[8px]">
          <span className="text-[19px] font-bold tracking-[0.2em] text-black uppercase">{w.store.split(" ")[0]}</span>
          <span className="flex flex-col gap-[5px]">
            <span className="h-[2px] w-[20px] rounded-full bg-black" />
            <span className="h-[2px] w-[20px] rounded-full bg-black" />
          </span>
        </div>
        <div className="mt-[8px] h-[150px] rounded-[18px] bg-[linear-gradient(160deg,#ece6dc,#cfc4b2)]" />
      </div>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.18 }}
        className="absolute inset-x-[10px] top-[150px] bottom-[100px] flex flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.08),0_30px_60px_-20px_rgb(0_0_0/0.35)]"
      >
        <div className="flex items-center gap-[10px] border-b border-black/6 px-[16px] py-[12px]">
          <span className="flex size-[40px] items-center justify-center rounded-full bg-[#f2f2f7]">
            <LogoMark className="size-[26px]" />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-[16px] font-semibold text-black">{w.store}</span>
            <span className="flex items-center gap-[5px] text-[13px] text-[#8e8e93]">
              <span className="size-[7px] rounded-full bg-[#34c759]" />
              {w.widget}
            </span>
          </span>
          <span className="flex size-[30px] items-center justify-center rounded-full bg-[#f2f2f7] text-[#8e8e93]">
            <svg viewBox="0 0 12 12" className="size-[11px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m2 2 8 8M10 2l-8 8" />
            </svg>
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-[8px] overflow-hidden px-[14px] pb-[12px]">
          <AnimatePresence initial={false}>
            {step >= 1 ? <WebBubble key="c1" mine>{w.customer1}</WebBubble> : null}
            {step === 2 ? (
              <motion.div key="t1" layout="position" {...MESSAGE_IN} exit={{ opacity: 0 }} className="flex self-start rounded-[20px] rounded-es-[6px] bg-[#f2f2f7] px-[14px] py-[13px] text-[#8e8e93]">
                <TypingDots />
              </motion.div>
            ) : null}
            {step >= 3 ? <WebBubble key="a1">{w.agent1}</WebBubble> : null}
            {step >= 3 ? (
              <motion.div key="q" layout="position" {...MESSAGE_IN} className="flex gap-[6px] self-start">
                {w.quick.map((label, index) => {
                  const isPicked = index === 0 && step >= 4;
                  return (
                    <motion.span
                      key={label}
                      initial={false}
                      animate={{ opacity: step >= 4 && !isPicked ? 0.4 : 1 }}
                      className={cn(
                        "rounded-full px-[12px] py-[6px] text-[13.5px] font-medium",
                        isPicked ? "bg-[#111] text-white" : "text-black shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]",
                      )}
                    >
                      {label}
                    </motion.span>
                  );
                })}
              </motion.div>
            ) : null}
            {step >= 5 ? <WebBubble key="c2" mine>{w.customer2}</WebBubble> : null}
            {step === 6 ? (
              <motion.div key="t2" layout="position" {...MESSAGE_IN} exit={{ opacity: 0 }} className="flex self-start rounded-[20px] rounded-es-[6px] bg-[#f2f2f7] px-[14px] py-[13px] text-[#8e8e93]">
                <TypingDots />
              </motion.div>
            ) : null}
            {step >= 7 ? <WebBubble key="a2">{w.agent2}</WebBubble> : null}
          </AnimatePresence>
        </div>
        <div className="mx-[12px] mb-[12px] flex h-[44px] items-center rounded-full bg-[#f2f2f7] px-[16px] text-[15px] text-[#8e8e93]">
          {w.input}
        </div>
      </motion.div>

      <div className="absolute inset-x-[14px] bottom-[34px] flex items-center gap-[10px]">
        <span className="flex size-[48px] items-center justify-center rounded-full bg-white/80 text-black shadow-[0_0_0_0.5px_rgb(0_0_0/0.1),0_8px_24px_-8px_rgb(0_0_0/0.25)] backdrop-blur-xl">
          <Glyph name="chevronBack" size={22} weight={2.4} mirror />
        </span>
        <span className="flex h-[48px] flex-1 items-center justify-center gap-[6px] rounded-full bg-white/80 text-[15px] text-black shadow-[0_0_0_0.5px_rgb(0_0_0/0.1),0_8px_24px_-8px_rgb(0_0_0/0.25)] backdrop-blur-xl">
          <Glyph name="lock" size={12} weight={2.4} className="text-black/60" />
          <span dir="ltr">{w.url}</span>
        </span>
        <span className="flex size-[48px] items-center justify-center rounded-full bg-white/80 text-black shadow-[0_0_0_0.5px_rgb(0_0_0/0.1),0_8px_24px_-8px_rgb(0_0_0/0.25)] backdrop-blur-xl">
          <Glyph name="ellipsis" size={22} />
        </span>
      </div>
      <HomeIndicator />
    </div>
  );
}

/* Mail: the reply lands in the customer's inbox */

const MAIL_STEPS = [700, 2400] as const;

function useTyped(value: string, run: boolean, duration: number) {
  const shouldReduceMotion = useReducedMotionSafe();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!run || shouldReduceMotion) return;
    const controls = animate(0, value.length, {
      duration,
      ease: "linear",
      onUpdate: (latest) => setTyped(Math.round(latest)),
    });
    return () => controls.stop();
  }, [run, shouldReduceMotion, value, duration]);

  return shouldReduceMotion ? value.length : typed;
}

function MailScreen() {
  const { t } = useLocale();
  const e = t.heroPhone.email;
  const step = useTimeline(MAIL_STEPS);
  const typed = useTyped(e.reply, step >= 1, 2.1);

  return (
    <div className="absolute inset-0 flex flex-col bg-white text-black">
      <StatusBar />
      <div className="flex h-[44px] items-center justify-between px-[8px] text-[#007aff]">
        <span className="flex items-center text-[17px]">
          <Glyph name="chevronBack" size={30} weight={2.4} mirror />
          <span className="-ms-[4px]">{e.back}</span>
        </span>
        <span className="flex gap-[18px] pe-[10px]">
          <Glyph name="chevronUp" size={24} weight={2.2} />
          <Glyph name="chevronDown" size={24} weight={2.2} />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-[20px] pt-[10px]">
        <div className="flex items-start gap-[12px] border-b border-black/8 pb-[14px]">
          <span className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#a5abb6,#858b95)] text-[17px] font-semibold text-white">
            {e.fromInitials}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-baseline justify-between gap-[8px]">
              <span className="truncate text-[17px] font-semibold">{e.fromName}</span>
              <span className="shrink-0 text-[15px] text-[#8e8e93]">{e.time}</span>
            </span>
            <span className="text-[15px] text-[#8e8e93]">{e.to}</span>
          </span>
        </div>
        <p className="mt-[16px] text-[22px] leading-[28px] font-bold">{e.subject}</p>
        <p className="mt-[12px] min-h-[132px] text-[17px] leading-[24px]">
          {e.reply.slice(0, typed)}
          {step >= 1 && typed < e.reply.length ? (
            <span className="ms-px inline-block h-[18px] w-[2px] translate-y-[3px] bg-[#007aff]" />
          ) : null}
        </p>
        <motion.div
          initial={false}
          animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="flex flex-col gap-[14px]"
        >
          <span className="text-[15px] text-[#8e8e93]">— {e.signature}</span>
          <span className="flex items-center gap-[12px] rounded-[14px] bg-[#f2f2f7] p-[10px]">
            <span className="flex h-[52px] w-[42px] items-center justify-center rounded-[6px] bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.1)]">
              <GlassIcon icon={IconFile} tone="danger" size={26} />
            </span>
            <span className="flex flex-col">
              <span dir="ltr" className="text-[15px] font-semibold rtl:text-end">{e.attachment}</span>
              <span className="text-[13px] text-[#8e8e93]">{e.attachmentMeta}</span>
            </span>
          </span>
          <span className="border-s-[3px] border-[#d1d1d6] ps-[12px] text-[15px] leading-[21px] text-[#8e8e93]">
            <span className="font-semibold">{e.quoteAuthor}</span> {e.quote}
          </span>
        </motion.div>
      </div>
      <div className="flex h-[50px] items-center justify-between px-[26px] pb-[34px] text-[#007aff]">
        <Glyph name="trash" size={25} weight={1.8} />
        <Glyph name="folder" size={25} weight={1.8} />
        <Glyph name="reply" size={25} weight={1.8} mirror />
        <Glyph name="compose" size={25} weight={1.8} />
      </div>
      <HomeIndicator />
    </div>
  );
}

/* Lock screen: what Jowab did in the owner's tools, as notifications */

const LOCK_STEPS = [600, 700, 700, 700, 700] as const;
const NOTIFICATION_BRANDS: Brand[] = ["salla", "foodics", "zoho", "bayzat", "zendesk"];

function LockScreen() {
  const { t } = useLocale();
  const a = t.heroPhone.actions;
  const step = useTimeline(LOCK_STEPS);
  const visible = a.notifications
    .map((notification, index) => ({ ...notification, brand: NOTIFICATION_BRANDS[index], index }))
    .slice(a.notifications.length - step);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden text-white">
      <div className="absolute inset-0 bg-[#3b3330] bg-[url(/mockups/ios27-lock.webp)] bg-cover bg-center" />
      <StatusBar tone="light" left={<span className="font-semibold">{a.carrier}</span>} />
      <div className="relative flex flex-col items-center pt-[8px]">
        <Glyph name="lock" size={20} weight={2.4} className="text-white/90" />
        <span className="mt-[16px] text-[21px] font-semibold text-white/90">{a.date}</span>
        <span className="-mt-[6px] bg-[linear-gradient(180deg,rgb(255_255_255/0.98),rgb(255_255_255/0.72))] bg-clip-text text-[112px] leading-[1.05] font-semibold tracking-[-3px] text-transparent tabular-nums drop-shadow-[0_2px_12px_rgb(0_0_0/0.25)]">
          {t.heroPhone.statusTime}
        </span>
      </div>

      <div className="relative mt-auto flex flex-col gap-[8px] px-[10px] pb-[124px]">
        <AnimatePresence initial={false}>
          {visible.map((notification) => (
            <motion.div
              key={notification.index}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.55, bounce: 0.2 }}
              className="flex items-start gap-[11px] rounded-[24px] bg-white/18 p-[13px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.35),0_8px_24px_-12px_rgb(0_0_0/0.35)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <BrandTile brand={notification.brand} className="size-[38px] rounded-[9px]" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-baseline justify-between gap-[8px]">
                  <span className="text-[15px] font-semibold">{t.brands[notification.brand]}</span>
                  <span className="text-[13px] text-white/65">{notification.time}</span>
                </span>
                <span className="text-[15px] leading-[20px] text-white/92">
                  <span className="font-semibold">{a.by}: </span>
                  {notification.title}
                </span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-[46px] bottom-[52px] flex justify-between">
        {(["flashlight", "camera"] as const).map((glyph) => (
          <span
            key={glyph}
            className="flex size-[50px] items-center justify-center rounded-full bg-white/15 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.3)] backdrop-blur-2xl"
          >
            <Glyph name={glyph} size={24} weight={1.9} />
          </span>
        ))}
      </div>
      <HomeIndicator tone="light" />
    </div>
  );
}

const SCREENS: Record<Surface, () => ReactNode> = {
  whatsapp: WhatsAppScreen,
  voice: CallScreen,
  web: WebScreen,
  email: MailScreen,
  actions: LockScreen,
};

const SWAP: Variants = {
  enter: { opacity: 0, scale: 0.985, filter: "blur(10px)" },
  center: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 1.01, filter: "blur(8px)", transition: { duration: 0.25, ease: EASE_OUT } },
};

const FADE: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function HeroPhone({
  surface,
  runKey = 0,
  className,
}: {
  surface: Surface;
  /** Changing it replays the current screen from the start. */
  runKey?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotionSafe();
  const Screen = SCREENS[surface];

  return (
    <IPhone className={className}>
      <AnimatePresence initial={false}>
        <motion.div
          key={`${surface}:${runKey}`}
          className="absolute inset-0"
          variants={shouldReduceMotion ? FADE : SWAP}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
    </IPhone>
  );
}
