"use client";

import { useId, type ComponentType, type SVGProps } from "react";
import {
  IconBahrain,
  IconEgypt,
  IconKuwait,
  IconOman,
  IconQatar,
  IconSaudiArabia,
  IconUnitedArabEmirates,
  IconUnitedStates,
} from "nucleo-flags";
import { cn } from "@/lib/utils";

type NucleoProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
};

export type GlassIconComponent = ComponentType<
  NucleoProps & { uniqueId?: string }
>;

/** `ink` is Nucleo's own neutral glass; `accent` tints it with the logo greens. */
const TONES = {
  ink: "",
  accent: cn(
    "[--nc-gradient-1-color-1:#46d9ae] [--nc-gradient-1-color-2:#027963]",
    "",
  ),
  danger: cn(
    "[--nc-gradient-1-color-1:#ff8a8f] [--nc-gradient-1-color-2:#c62a2f]",
    "",
  ),
} as const;

export type GlassTone = keyof typeof TONES;

export function GlassIcon({
  icon: Icon,
  tone = "ink",
  size = 20,
  className,
  title,
}: {
  icon: GlassIconComponent;
  tone?: GlassTone;
  size?: number;
  className?: string;
  title?: string;
}) {
  const uniqueId = `g${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <Icon
      uniqueId={uniqueId}
      size={size}
      title={title}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn("shrink-0", TONES[tone], className)}
    />
  );
}

const FLAGS = {
  sa: IconSaudiArabia,
  ae: IconUnitedArabEmirates,
  kw: IconKuwait,
  qa: IconQatar,
  bh: IconBahrain,
  om: IconOman,
  eg: IconEgypt,
  us: IconUnitedStates,
} satisfies Record<string, ComponentType<NucleoProps>>;

export type FlagCode = keyof typeof FLAGS;

export function Flag({
  code,
  size = 16,
  className,
  title,
}: {
  code: FlagCode;
  size?: number;
  className?: string;
  title?: string;
}) {
  const Component = FLAGS[code];
  return (
    <Component
      size={size}
      title={title}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn("shrink-0", className)}
    />
  );
}
