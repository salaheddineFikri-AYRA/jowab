import type { ReactNode } from "react";
import "../globals.css";
import { cairo } from "@/lib/fonts";
import { landingMetadata, landingViewport } from "@/lib/metadata";

export const metadata = landingMetadata("ar");
export const viewport = landingViewport;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>{children}</body>
    </html>
  );
}
