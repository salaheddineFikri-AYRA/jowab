import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { cairo } from "@/lib/fonts";
import jowabMark from "@/public/logo/jowab-mark.png";

export const metadata: Metadata = {
  title: "Page not found · الصفحة غير موجودة — Jowab",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={cairo.variable}>
      <body>
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
          <Image src={jowabMark} alt="" sizes="56px" className="size-14" />
          <p className="text-[0.75rem] font-semibold tracking-[0.18em] text-(--m-muted) uppercase">
            404
          </p>
          <h1 className="text-4xl leading-[1.15] font-semibold text-balance text-(--m-ink) sm:text-5xl">
            This page doesn&rsquo;t have an answer.
          </h1>
          <p lang="ar" dir="rtl" className="text-lg text-(--m-muted)">
            هالصفحة ما لها جواب.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center rounded-full bg-(--m-ink) px-4 text-sm font-semibold text-(--m-paper) hover:bg-(--m-ink)/88"
            >
              Home
            </Link>
            <Link
              href="/ar"
              lang="ar"
              className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold text-(--m-ink) shadow-[inset_0_0_0_1px_var(--m-line-strong)] hover:bg-(--m-ink)/4"
            >
              العربية
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
