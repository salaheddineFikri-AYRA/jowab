import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type BrandEntry = { src: string; fill?: boolean; wide?: boolean };

const BRANDS = {
  whatsapp: { src: "/logos/whatsapp.svg" },
  instagram: { src: "/logos/instagram.svg" },
  messenger: { src: "/logos/messenger.svg" },
  telegram: { src: "/logos/telegram.svg" },
  meta: { src: "/logos/meta.svg" },
  salla: { src: "/logos/salla.png" },
  foodics: { src: "/logos/foodics.png", fill: true },
  zoho: { src: "/logos/zoho.svg" },
  bayzat: { src: "/logos/bayzat.svg", fill: true },
  tally: { src: "/logos/tally.svg", wide: true },
  quickbooks: { src: "/logos/quickbooks.svg" },
  salesforce: { src: "/logos/salesforce.svg" },
  hubspot: { src: "/logos/hubspot.svg" },
  zendesk: { src: "/logos/zendesk.svg" },
  freshdesk: { src: "/logos/freshdesk.svg" },
  linkedin: { src: "/logos/linkedin.svg" },
} satisfies Record<string, BrandEntry>;

export type Brand = keyof typeof BRANDS;

export function isWideBrand(brand: Brand) {
  return "wide" in BRANDS[brand];
}

export function BrandLogo({
  brand,
  className,
  mono = false,
}: {
  brand: Brand;
  className?: string;
  mono?: boolean;
}) {
  const { src } = BRANDS[brand];

  if (mono) {
    const mask = `url(${src}) center / contain no-repeat`;
    return (
      <span
        aria-hidden="true"
        className={cn("inline-block shrink-0 bg-current", className)}
        style={{ mask, WebkitMask: mask } as CSSProperties}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      className={cn("shrink-0 object-contain select-none", className)}
    />
  );
}

/** Brand marks sit on a white tile, the way app icons do. */
export function BrandTile({
  brand,
  className,
  logoClassName,
}: {
  brand: Brand;
  className?: string;
  logoClassName?: string;
}) {
  const entry: BrandEntry = BRANDS[brand];

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-[0.55rem] bg-white shadow-[0_0_0_1px_rgb(12_55_47/0.09),0_1px_2px_rgb(12_55_47/0.08)]",
        entry.wide && "aspect-[2.1/1]",
        className,
      )}
    >
      <BrandLogo
        brand={brand}
        className={cn(
          entry.fill ? "size-full" : entry.wide ? "h-[62%] w-[78%]" : "size-[60%]",
          logoClassName,
        )}
      />
    </span>
  );
}
