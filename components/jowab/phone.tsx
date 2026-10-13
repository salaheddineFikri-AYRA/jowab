"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { Stage } from "@/components/jowab/ui";

/* iPhone 17 Pro at its real size in points; `Stage` scales it to fit. */
export const SCREEN_W = 402;
export const SCREEN_H = 874;
const BEZEL = 11;
const BAND = 4;
const BUTTON = 3;
const DEVICE_W = SCREEN_W + 2 * (BEZEL + BAND);
const DEVICE_H = SCREEN_H + 2 * (BEZEL + BAND);
const SCREEN_RADIUS = 58;

const TITANIUM =
  "linear-gradient(145deg,#5b5b60 0%,#232326 18%,#46464b 38%,#1b1b1d 58%,#3d3d42 78%,#1f1f22 100%)";
const BUTTON_FILL = "linear-gradient(90deg,#1b1b1d,#4a4a4f 45%,#2a2a2d)";

/** Hardware sides never mirror, so the buttons use physical left/right. */
function SideButton({ side, top, height }: { side: "left" | "right"; top: number; height: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-[2px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.08)]"
      style={{
        top,
        height,
        width: BUTTON + 1,
        background: BUTTON_FILL,
        [side]: 0,
      }}
    />
  );
}

export function IPhone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto", className)}>
      <Stage width={DEVICE_W + 2 * BUTTON} height={DEVICE_H}>
        <div className="relative" style={{ width: DEVICE_W + 2 * BUTTON, height: DEVICE_H }}>
          <SideButton side="left" top={190} height={34} />
          <SideButton side="left" top={252} height={66} />
          <SideButton side="left" top={332} height={66} />
          <SideButton side="right" top={276} height={106} />
          <SideButton side="right" top={540} height={66} />

          <div
            className="absolute inset-y-0 rounded-[73px] shadow-[0_60px_110px_-40px_rgb(0_0_0/0.45),0_30px_60px_-30px_rgb(0_0_0/0.3)]"
            style={{ left: BUTTON, right: BUTTON, padding: BAND, background: TITANIUM }}
          >
            <div
              className="relative size-full rounded-[69px] bg-black shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]"
              style={{ padding: BEZEL }}
            >
              <div
                className="relative size-full overflow-hidden bg-white font-(family-name:--font-ios) antialiased"
                style={{ borderRadius: SCREEN_RADIUS, width: SCREEN_W, height: SCREEN_H }}
              >
                {children}
                <div className="pointer-events-none absolute top-[11px] left-1/2 z-50 h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black">
                  <span className="absolute top-1/2 right-[14px] size-[11px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#2a3550,#0b0d14_70%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}

export function StatusBar({
  tone = "dark",
  left,
  className,
}: {
  /** `light` draws white glyphs for dark screens. */
  tone?: "dark" | "light";
  /** Replaces the clock, e.g. with the carrier name on the lock screen. */
  left?: ReactNode;
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <div
      dir="ltr"
      className={cn(
        "relative z-40 flex h-[54px] shrink-0 items-center justify-between pt-[5px]",
        tone === "light" ? "text-white" : "text-black",
        className,
      )}
    >
      <span className="flex w-[138px] justify-center text-[17px] font-semibold tracking-[-0.4px] tabular-nums">
        {left ?? t.heroPhone.statusTime}
      </span>
      <span className="flex w-[138px] items-center justify-center gap-[6px]" aria-hidden="true">
        <svg viewBox="0 0 19 12" className="h-[12px] w-[19px]" fill="currentColor">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.9" />
          <rect x="5.2" y="5" width="3.2" height="7" rx="0.9" />
          <rect x="10.4" y="2.5" width="3.2" height="9.5" rx="0.9" />
          <rect x="15.6" y="0" width="3.2" height="12" rx="0.9" />
        </svg>
        <svg viewBox="0 0 17 12" className="h-[12px] w-[17px]" fill="currentColor">
          <path d="M8.5 2.3c2.4 0 4.6.9 6.2 2.5.2.2.5.2.7 0l1.2-1.2c.2-.2.2-.5 0-.7A11 11 0 0 0 8.5 0 11 11 0 0 0 .4 2.9c-.2.2-.2.5 0 .7l1.2 1.2c.2.2.5.2.7 0a8.8 8.8 0 0 1 6.2-2.5Z" />
          <path d="M8.5 5.9c1.4 0 2.6.5 3.6 1.4.2.2.5.2.7 0L14 6.1c.2-.2.2-.5 0-.7a7.7 7.7 0 0 0-11 0c-.2.2-.2.5 0 .7l1.2 1.2c.2.2.5.2.7 0 1-.9 2.2-1.4 3.6-1.4Z" />
          <path d="M10.6 9.5c.2-.2.2-.5 0-.7a3 3 0 0 0-4.2 0c-.2.2-.2.5 0 .7l1.8 1.9c.2.2.4.2.6 0l1.8-1.9Z" />
        </svg>
        <svg viewBox="0 0 28 13" className="h-[13px] w-[28px]" fill="none">
          <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="21" height="9" rx="2.5" fill="currentColor" />
          <path d="M26 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

export function HomeIndicator({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-[8px] left-1/2 z-40 h-[5px] w-[139px] -translate-x-1/2 rounded-full",
        tone === "light" ? "bg-white" : "bg-black",
      )}
    />
  );
}
