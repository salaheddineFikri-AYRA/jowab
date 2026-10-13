"use client";

import {
  AnimatePresence,
  motion,
  useInView,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { IconAward } from "nucleo-glass";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/jowab/locale";
import {
  HeroPhone,
  SURFACES,
  SurfaceIcon,
  type Surface,
} from "@/components/jowab/hero-phone";
import { Flag, GlassIcon, type FlagCode } from "@/components/jowab/icons";
import {
  Button,
  EASE_OUT,
  mailto,
  text,
  useReducedMotionSafe,
} from "@/components/jowab/ui";

const CYCLE_MS = 7000;
const GULF: FlagCode[] = ["sa", "ae", "kw", "qa", "bh", "om"];

function Headline() {
  const { t } = useLocale();
  const words = t.hero.headline.split(" ");

  return (
    <h1
      id="hero-heading"
      className={cn(
        text.display,
        "max-w-4xl text-center text-[2.625rem] leading-[1.05] tracking-[-0.045em] text-balance text-(--m-ink) sm:text-6xl lg:text-[4.25rem] rtl:leading-[1.3]",
      )}
    >
      {words.map((word, index) => {
        const isHighlight = word.replace(/[.,،!]/g, "") === t.hero.highlight;
        return (
          <span key={index}>
            <span
              className="jowab-word relative"
              style={{ "--i": index } as CSSProperties}
            >
              {word}
              {isHighlight ? (
                <svg
                  viewBox="0 0 240 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-[0.12em] h-[0.26em] w-full overflow-visible rtl:-scale-x-100"
                >
                  <path
                    d="M3 11C46 4 92 3 136 6.5S212 11 237 5"
                    pathLength="1"
                    fill="none"
                    stroke="var(--m-mint)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="jowab-draw"
                    style={{ "--delay": `${0.15 + words.length * 0.07 + 0.2}s` } as CSSProperties}
                  />
                </svg>
              ) : null}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </h1>
  );
}

function SurfaceTabs({
  active,
  onPick,
  baseId,
  cycling,
}: {
  active: Surface;
  onPick: (surface: Surface) => void;
  baseId: string;
  cycling: boolean;
}) {
  const { t, dir } = useLocale();
  const shouldReduceMotion = useReducedMotionSafe();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hasMoved, setHasMoved] = useState(false);

  function select(surface: Surface) {
    if (surface === active) return;
    setHasMoved(true);
    onPick(surface);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = SURFACES.length - 1;
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    let next: number | null = null;
    if (event.key === forward) next = index === last ? 0 : index + 1;
    if (event.key === backward) next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;

    event.preventDefault();
    select(SURFACES[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={t.hero.tablistLabel}
      className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-(--m-chip) p-1 [scrollbar-width:none]"
    >
      {SURFACES.map((surface, index) => {
        const isActive = surface === active;
        return (
          <button
            key={surface}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${baseId}-tab-${surface}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`${baseId}-panel`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(surface)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "relative flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-[0.875rem] font-semibold sm:min-h-9 sm:px-3.5",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-ink)",
              isActive ? "text-(--m-ink)" : "text-(--m-muted) hover:text-(--m-ink)",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={`${baseId}-pill`}
                className="absolute inset-0"
                style={{ borderRadius: 9999 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.5, bounce: 0.18 }
                }
              >
                <motion.span
                  className="absolute inset-0 overflow-hidden rounded-full bg-(--m-card) shadow-[0_0_0_1px_var(--m-line),0_1px_2px_rgb(12_55_47/0.08)]"
                  animate={
                    hasMoved && !shouldReduceMotion
                      ? { scaleX: [1, 1.1, 1], scaleY: [1, 0.8, 1] }
                      : undefined
                  }
                  transition={{
                    duration: 0.5,
                    times: [0, 0.4, 1],
                    ease: ["easeOut", "easeInOut"],
                  }}
                >
                  {cycling ? (
                    <motion.span
                      key={active}
                      className="absolute inset-x-3 bottom-[3px] h-[2px] rounded-full bg-(--m-mint) ltr:origin-left rtl:origin-right"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </motion.span>
              </motion.span>
            ) : null}
            <span className="relative">
              <SurfaceIcon surface={surface} size={16} />
            </span>
            <span className="relative">{t.hero.surfaces[surface].label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Hero() {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotionSafe();
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [active, setActive] = useState<Surface>("whatsapp");
  const [runKey, setRunKey] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cycling = inView && !userPicked && !hovering && !shouldReduceMotion;
  const current = t.hero.surfaces[active];

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(
      () =>
        setActive(
          (surface) => SURFACES[(SURFACES.indexOf(surface) + 1) % SURFACES.length],
        ),
      CYCLE_MS,
    );
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  function pick(surface: Surface) {
    setUserPicked(true);
    setActive(surface);
  }

  function replay(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setUserPicked(false);
    setActive("whatsapp");
    setRunKey((key) => key + 1);
    document.getElementById("console")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-28"
    >
      <Headline />
      <p
        className="jowab-fade-up relative mt-5 max-w-[48ch] text-center text-base text-pretty text-(--m-muted) sm:text-[1.0625rem] sm:leading-7 rtl:sm:text-lg rtl:sm:leading-8"
        style={{ "--delay": "0.55s" } as CSSProperties}
      >
        {t.hero.subheadline}
      </p>
      <div
        className="jowab-fade-up relative mt-8 flex flex-wrap items-center justify-center gap-2.5"
        style={{ "--delay": "0.7s" } as CSSProperties}
      >
        <Button href={mailto(t.common.demoSubject)}>{t.common.bookDemo}</Button>
        <Button href="#console" variant="outline" onClick={replay}>
          {t.common.seeItAnswer}
        </Button>
      </div>
      <ul
        className="jowab-fade-up relative mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[0.875rem] text-(--m-muted)"
        style={{ "--delay": "0.85s" } as CSSProperties}
      >
        <li className="flex items-center gap-1.5">
          <GlassIcon icon={IconAward} tone="accent" size={20} />
          <span className="font-bold text-(--m-ink)">{t.hero.proofRated}</span>
        </li>
        <li className="font-semibold">{t.hero.proofProjects}</li>
        <li className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            {GULF.map((code) => (
              <Flag key={code} code={code} size={22} />
            ))}
          </span>
          {t.hero.trustLine}
        </li>
      </ul>

      <div className="relative mt-12 flex max-w-full justify-center sm:mt-14">
        <SurfaceTabs
          active={active}
          onPick={pick}
          baseId={baseId}
          cycling={cycling}
        />
      </div>

      <figure
        id="console"
        className="relative mt-10 flex w-full max-w-5xl flex-col items-center sm:mt-12"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative"
        >
          <p className="sr-only">
            {t.hero.windowLabel} {current.label}. {current.caption}
          </p>
          <div aria-hidden="true" className="relative">
            <HeroPhone surface={active} runKey={runKey} className="w-[300px] sm:w-[340px]" />
          </div>
        </div>
        <figcaption
          aria-hidden="true"
          className="relative mt-6 flex min-h-12 justify-center text-center text-sm text-pretty text-(--m-muted) sm:min-h-6 rtl:text-[0.9375rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              className="max-w-[52ch]"
              initial={{
                opacity: 0,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
              }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
              }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
            >
              {current.caption}
            </motion.span>
          </AnimatePresence>
        </figcaption>
      </figure>
    </section>
  );
}
