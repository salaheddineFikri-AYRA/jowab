import type { ReactNode } from "react";
import "../globals.css";
import { cairo } from "@/lib/fonts";
import { landingMetadata, landingViewport } from "@/lib/metadata";

export const metadata = landingMetadata("en");
export const viewport = landingViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={cairo.variable}>
      <body>{children}</body>
    </html>
  );
}
