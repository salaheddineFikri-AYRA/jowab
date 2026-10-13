"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { IconCircleCheck } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import { GlassIcon } from "@/components/jowab/icons";
import {
  LogoMark,
  Section,
  SectionHeader,
  EASE_OUT,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const ROWS = ["availability", "arabic", "speed", "actions", "setup", "cost"] as const;
const COLUMNS = ["jowab", "hiring", "generic"] as const;

type Column = (typeof COLUMNS)[number];

/** How far each reply-speed bar gets and how long it takes, in seconds. */
const RACE: Record<Column, { width: number; duration: number }> = {
  jowab: { width: 100, duration: 0.5 },
  hiring: { width: 16, duration: 4 },
  generic: { width: 100, duration: 0.4 },
};

function SpeedBar({ column, run }: { column: Column; run: boolean }) {
  const shouldReduceMotion = useReducedMotionSafe();
  const race = RACE[column];

  return (
    <span className="mt-2 block h-1 overflow-hidden rounded-full bg-(--m-ink)/8">
      <motion.span
        className={cn(
          "block h-full rounded-full ltr:origin-left rtl:origin-right",
          column === "jowab" ? "bg-(--m-mint)" : "bg-(--m-ink)/30",
        )}
        style={{ width: `${race.width}%` }}
        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
        animate={{ scaleX: run || shouldReduceMotion ? 1 : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: race.duration, delay: 0.5, ease: column === "hiring" ? "linear" : EASE_OUT }
        }
      />
    </span>
  );
}

export function Comparison() {
  const { t } = useLocale();
  const c = t.comparison;
  const shouldReduceMotion = useReducedMotionSafe();
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { once: true, amount: 0.3 });

  return (
    <Section id="comparison" labelledBy="comparison-heading">
      <SectionHeader id="comparison-heading" eyebrow={c.eyebrow} title={c.headline} lede={c.subheadline} />

      <div ref={tableRef} className="mx-auto mt-12 max-w-5xl sm:mt-16">
        <table className="w-full border-separate border-spacing-0 text-sm max-md:hidden">
          <caption className="sr-only">{c.headline}</caption>
          <thead>
            <tr>
              <td className="w-[28%]" />
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    "px-5 pt-5 pb-4 text-start align-bottom font-medium text-(--m-ink) rtl:font-semibold",
                    column === "jowab" && "relative rounded-t-2xl bg-(--m-card) shadow-[0_-1px_0_var(--m-line),1px_0_0_var(--m-line),-1px_0_0_var(--m-line)]",
                  )}
                >
                  {column === "jowab" ? (
                    <span className="flex flex-col items-start gap-2">
                      <span className="rounded-full bg-(--m-accent)/10 px-2 py-0.5 text-[0.6875rem] font-medium text-(--m-accent)">
                        {c.highlight}
                      </span>
                      <span className="flex items-center gap-2 text-base">
                        <LogoMark className="size-5" />
                        {c.columns.jowab}
                      </span>
                    </span>
                  ) : (
                    <span className="text-(--m-muted)">{c.columns[column]}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, index) => {
              const isLast = index === ROWS.length - 1;
              return (
                <motion.tr
                  key={row}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: EASE_OUT }}
                >
                  <th scope="row" className="border-t border-(--m-line) py-4 pe-4 text-start align-top font-medium text-(--m-ink) rtl:font-semibold">
                    {c.rows[row].label}
                  </th>
                  {COLUMNS.map((column) => (
                    <td
                      key={column}
                      className={cn(
                        "px-5 py-4 align-top",
                        column === "jowab"
                          ? cn(
                              "border-t border-(--m-line) bg-(--m-card) font-medium text-(--m-ink) shadow-[1px_0_0_var(--m-line),-1px_0_0_var(--m-line)]",
                              isLast && "rounded-b-2xl shadow-[1px_0_0_var(--m-line),-1px_0_0_var(--m-line),0_1px_0_var(--m-line)]",
                            )
                          : "border-t border-(--m-line) text-(--m-muted)",
                      )}
                    >
                      <span className="flex items-start gap-2">
                        {column === "jowab" ? (
                          <GlassIcon icon={IconCircleCheck} tone="accent" size={16} className="mt-0.5" />
                        ) : null}
                        <span className="flex-1">
                          {c.rows[row][column]}
                          {row === "speed" ? <SpeedBar column={column} run={inView} /> : null}
                        </span>
                      </span>
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        <ul className="flex flex-col gap-3 md:hidden">
          {ROWS.map((row) => (
            <li key={row} className="rounded-2xl bg-(--m-panel) p-4">
              <p className="text-sm font-medium text-(--m-ink) rtl:font-semibold">{c.rows[row].label}</p>
              <dl className="mt-3 flex flex-col gap-2 text-sm">
                {COLUMNS.map((column) => (
                  <div
                    key={column}
                    className={cn(
                      "flex items-start justify-between gap-3 rounded-lg px-3 py-2",
                      column === "jowab" ? "bg-(--m-card) shadow-[0_0_0_1px_var(--m-line)]" : "",
                    )}
                  >
                    <dt className={column === "jowab" ? "font-medium text-(--m-ink)" : "text-(--m-muted)"}>
                      {c.columns[column]}
                    </dt>
                    <dd className={cn("text-end", column === "jowab" ? "font-medium text-(--m-accent)" : "text-(--m-muted)")}>
                      {c.rows[row][column]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
