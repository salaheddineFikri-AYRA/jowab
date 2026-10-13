"use client";

import { wrap } from "motion";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IconEnvelope, IconMsgs, IconPhone, IconWindow } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { BrandTile, isWideBrand, type Brand } from "@/components/jowab/brand-logo";
import { GlassIcon, type GlassIconComponent } from "@/components/jowab/icons";
import { mailto, useReducedMotionSafe } from "@/components/jowab/ui";

type ChannelKey = "voice" | "email" | "web" | "sms";

type Item = { brand: Brand } | { channel: ChannelKey; icon: GlassIconComponent };

const ROWS: { items: Item[]; speed: number; offset: number }[] = [
  {
    speed: -26,
    offset: 0,
    items: [
      { brand: "whatsapp" },
      { channel: "voice", icon: IconPhone },
      { brand: "instagram" },
      { channel: "web", icon: IconWindow },
      { brand: "messenger" },
      { channel: "email", icon: IconEnvelope },
      { brand: "telegram" },
      { channel: "sms", icon: IconMsgs },
      { brand: "meta" },
    ],
  },
  {
    speed: 20,
    offset: 0.4,
    items: [
      { brand: "salla" },
      { brand: "foodics" },
      { brand: "zoho" },
      { brand: "bayzat" },
      { brand: "tally" },
      { brand: "quickbooks" },
    ],
  },
  {
    speed: -32,
    offset: 0.7,
    items: [
      { brand: "salesforce" },
      { brand: "hubspot" },
      { brand: "zendesk" },
      { brand: "freshdesk" },
      { brand: "whatsapp" },
      { brand: "salla" },
    ],
  },
];

const COPIES = 3;

function ItemView({ item }: { item: Item }) {
  const { t, dir } = useLocale();
  const label = "brand" in item ? t.brands[item.brand] : t.channels[item.channel];

  return (
    <li className="flex shrink-0 items-center gap-3">
      {"brand" in item ? (
        <BrandTile
          brand={item.brand}
          className={cn(
            isWideBrand(item.brand) ? "h-8 sm:h-9" : "size-8 sm:size-9",
            "rounded-[0.5rem] sm:rounded-[0.625rem]",
          )}
        />
      ) : (
        <span className="flex size-8 items-center justify-center rounded-[0.5rem] bg-(--m-panel) shadow-[inset_0_0_0_1px_var(--m-line)] sm:size-9 sm:rounded-[0.625rem]">
          <GlassIcon icon={item.icon} size={20} />
        </span>
      )}
      <span
        dir={dir}
        className="text-base font-semibold tracking-[-0.01em] text-(--m-ink) sm:text-[1.0625rem]"
      >
        {label}
      </span>
    </li>
  );
}

function MarqueeRow({ items, speed, offset }: { items: Item[]; speed: number; offset: number }) {
  const shouldReduceMotion = useReducedMotionSafe();
  const rowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(rowRef);
  const isPaused = useRef(false);
  const [copyWidth, setCopyWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;
    const observer = new ResizeObserver(() => setCopyWidth(copy.offsetWidth));
    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (copyWidth) x.set(-copyWidth * offset);
  }, [copyWidth, offset, x]);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || !isInView || isPaused.current || !copyWidth) return;
    x.set(wrap(-copyWidth, 0, x.get() + speed * (delta / 1000)));
  });

  return (
    <div
      ref={rowRef}
      dir="ltr"
      onPointerEnter={() => (isPaused.current = true)}
      onPointerLeave={() => (isPaused.current = false)}
    >
      <motion.div style={{ x }} className="flex w-max">
        {Array.from({ length: COPIES }, (_, index) => (
          <ul
            key={index}
            ref={index === 0 ? copyRef : undefined}
            aria-hidden={index > 0 ? true : undefined}
            className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
          >
            {items.map((item, itemIndex) => (
              <ItemView key={itemIndex} item={item} />
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}

export function LogoWall() {
  const { t } = useLocale();
  const i = t.integrations;

  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="relative z-10 overflow-hidden rounded-b-[2rem] bg-(--m-paper) pt-6 pb-20 sm:rounded-b-[3rem] sm:pt-10 sm:pb-28"
    >
      <div className="flex flex-col items-center gap-1.5 px-4 text-center">
        <h2 id="integrations-heading" className="text-sm font-medium text-(--m-ink) rtl:text-base rtl:font-semibold">
          {i.headline}
        </h2>
        <p className="text-sm text-(--m-muted)">{i.subheadline}</p>
      </div>
      <div className="mt-8 flex flex-col gap-7 sm:mt-10 sm:gap-9">
        {ROWS.map((row, index) => (
          <MarqueeRow key={index} {...row} />
        ))}
      </div>
      <p className="mt-10 text-center">
        <a
          href={mailto(t.common.salesSubject)}
          className="rounded-sm text-sm font-medium text-(--m-ink) underline decoration-(--m-line-strong) underline-offset-4 hover:decoration-(--m-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--m-ink)"
        >
          {i.cta}
        </a>
      </p>
    </section>
  );
}
