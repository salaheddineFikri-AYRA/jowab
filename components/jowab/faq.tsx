"use client";

import { motion } from "motion/react";
import { Accordion } from "radix-ui";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import {
  Button,
  Eyebrow,
  LogoMark,
  Section,
  TypingDots,
  mailto,
  text,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

function TypedAnswer({ answer }: { answer: string }) {
  const shouldReduceMotion = useReducedMotionSafe();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setTimeout(() => setReady(true), 480);
    return () => window.clearTimeout(id);
  }, [shouldReduceMotion]);

  const show = ready || Boolean(shouldReduceMotion);

  return (
    <div className="flex gap-3 pb-5">
      <LogoMark className="mt-0.5 size-6" />
      {show ? (
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="max-w-[60ch] text-[0.9375rem] leading-7 text-pretty text-(--m-muted)"
        >
          {answer}
        </motion.p>
      ) : (
        <span className="flex h-7 items-center text-(--m-muted)">
          <TypingDots />
        </span>
      )}
    </div>
  );
}

export function Faq() {
  const { t } = useLocale();
  const f = t.faq;

  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 id="faq-heading" className={cn(text.h2, "max-w-[14ch]")}>
            {f.headline}
          </h2>
          <p className={text.lede}>{f.subheadline}</p>
          <Button href={mailto(t.common.demoSubject)} className="mt-2">
            {t.common.bookDemo}
          </Button>
        </div>

        <Accordion.Root type="single" collapsible defaultValue="q0" className="flex flex-col">
          {f.items.map((item, index) => (
            <Accordion.Item key={item.question} value={`q${index}`} className="border-b border-(--m-line) first:border-t">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-start text-base font-medium text-(--m-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink) rtl:font-semibold">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-(--m-panel) transition-colors group-hover:bg-(--m-chip)"
                  >
                    <span className="absolute h-[1.5px] w-3 rounded-full bg-(--m-ink)" />
                    <span className="absolute h-3 w-[1.5px] rounded-full bg-(--m-ink) transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[state=open]:scale-y-0" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <TypedAnswer answer={item.answer} />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </Section>
  );
}
