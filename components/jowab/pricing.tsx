"use client";

import {
  animate,
  motion,
  useInView,
} from "motion/react";
import { Slider } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { IconCircleCheck } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { GlassIcon } from "@/components/jowab/icons";
import {
  Button,
  Reveal,
  Section,
  SectionHeader,
  mailto,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

type TierKey = "starter" | "growth" | "enterprise";

const TIERS: { key: TierKey; price: number | null }[] = [
  { key: "starter", price: 1500 },
  { key: "growth", price: 4500 },
  { key: "enterprise", price: null },
];

const MIN = 100;
const MAX = 15000;
const STEP = 100;

function tierFor(conversations: number): TierKey {
  if (conversations <= 1000) return "starter";
  if (conversations <= 10000) return "growth";
  return "enterprise";
}

function CountUp({ value, run }: { value: number; run: boolean }) {
  const { t, format, fill } = useLocale();
  const shouldReduceMotion = useReducedMotionSafe();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!run || shouldReduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: EASE_OUT,
      onUpdate: (latest) => setCurrent(Math.round(latest / 10) * 10),
    });
    return () => controls.stop();
  }, [run, shouldReduceMotion, value]);

  const shown = shouldReduceMotion ? value : current;
  return <>{fill(t.pricing.amount, { amount: format(shown) })}</>;
}

export function Pricing() {
  const { t, dir, format } = useLocale();
  const p = t.pricing;
  const shouldReduceMotion = useReducedMotionSafe();
  const gridRef = useRef<HTMLUListElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.3 });
  const [conversations, setConversations] = useState(3000);
  const fit = tierFor(conversations);

  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeader id="pricing-heading" eyebrow={p.eyebrow} title={p.headline} lede={p.subheadline} />

      <Reveal className="mx-auto mt-12 max-w-xl sm:mt-14">
        <div className="flex flex-col gap-4 rounded-2xl bg-(--m-panel) p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="pricing-volume" className="text-sm font-medium text-(--m-ink) rtl:font-semibold">
              {p.slider.label}
            </label>
            <span className="text-sm text-(--m-muted)">
              <span className="text-xl font-semibold text-(--m-ink) tabular-nums">
                {conversations >= MAX ? "+" : ""}
                {format(conversations)}
              </span>{" "}
              {p.slider.unit}
            </span>
          </div>
          <Slider.Root
            id="pricing-volume"
            dir={dir}
            min={MIN}
            max={MAX}
            step={STEP}
            value={[conversations]}
            onValueChange={([value]) => setConversations(value)}
            aria-label={p.slider.label}
            className="relative flex h-6 w-full touch-none items-center select-none"
          >
            <Slider.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-(--m-ink)/10">
              <Slider.Range className="absolute h-full rounded-full bg-(--m-mint)" />
            </Slider.Track>
            <Slider.Thumb
              aria-label={p.slider.label}
              className="block size-5 rounded-full bg-(--m-card) shadow-[0_0_0_1px_var(--m-line-strong),0_2px_6px_oklch(0_0_0/0.2)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)"
            />
          </Slider.Root>
        </div>
      </Reveal>

      <ul ref={gridRef} className="mt-8 grid gap-3 lg:grid-cols-3">
        {TIERS.map((tier, index) => {
          const plan = p.tiers[tier.key];
          const isFit = tier.key === fit;
          return (
            <li key={tier.key}>
              <Reveal delay={index * 0.06} className="h-full">
                <motion.article
                  animate={{ y: isFit && !shouldReduceMotion ? -6 : 0 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  className={cn(
                    "relative flex h-full flex-col gap-5 rounded-2xl p-6 transition-[background-color,box-shadow] duration-300",
                    isFit
                      ? "bg-(--m-card) shadow-[0_0_0_1.5px_var(--m-accent),0_24px_48px_-28px_oklch(0_0_0/0.35)]"
                      : "bg-(--m-panel) shadow-[0_0_0_1px_transparent]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[0.9375rem] font-semibold text-(--m-ink)">{plan.name}</h3>
                    <span className="flex items-center gap-1.5">
                      {plan.badge ? (
                        <span className="rounded-full bg-(--m-ink) px-2 py-0.5 text-[0.6875rem] font-medium text-(--m-paper)">
                          {plan.badge}
                        </span>
                      ) : null}
                      <motion.span
                        initial={false}
                        animate={isFit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="rounded-full bg-(--m-accent)/10 px-2 py-0.5 text-[0.6875rem] font-medium text-(--m-accent)"
                      >
                        {p.slider.fit}
                      </motion.span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="flex items-baseline gap-1.5 text-(--m-ink)">
                      <span className="text-[2rem] leading-none font-semibold tabular-nums">
                        {tier.price ? <CountUp value={tier.price} run={inView} /> : p.custom}
                      </span>
                      {tier.price ? <span className="text-sm text-(--m-muted)">{p.period}</span> : null}
                    </p>
                    <p className="text-sm leading-5 text-pretty text-(--m-muted) rtl:leading-6">{plan.description}</p>
                  </div>
                  <ul className="flex flex-1 flex-col gap-2.5 border-t border-(--m-line) pt-5">
                    {plan.lead ? <li className="text-sm font-medium text-(--m-ink)">{plan.lead}</li> : null}
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm leading-5 text-(--m-ink)/85 rtl:leading-6">
                        <GlassIcon icon={IconCircleCheck} tone="accent" size={16} className="mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={mailto(`${t.common.demoSubject} · ${plan.name}`)}
                    variant={isFit ? "solid" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </motion.article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
