import { dictionaries, type Lang } from "@/lib/i18n";
import { LocaleProvider } from "@/components/jowab/locale";
import { Navbar } from "@/components/jowab/navbar";
import { Hero } from "@/components/jowab/hero";
import { Problem } from "@/components/jowab/problem";
import { Features } from "@/components/jowab/features";
import { HowItWorks } from "@/components/jowab/how-it-works";
import { Devices } from "@/components/jowab/devices";
import { Industries } from "@/components/jowab/industries";
import { Pricing } from "@/components/jowab/pricing";
import { Comparison } from "@/components/jowab/comparison";
import { Faq } from "@/components/jowab/faq";
import { Cta } from "@/components/jowab/cta";
import { LogoWall } from "@/components/jowab/logo-wall";
import { Footer } from "@/components/jowab/footer";

export function Landing({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];

  return (
    <LocaleProvider lang={lang} t={t}>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-(--m-ink) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-(--m-paper)"
      >
        {t.common.skipToContent}
      </a>
      <div className="w-full">
        <Navbar />
        <main id="top" className="overflow-x-clip">
          <Hero />
          <Problem />
          <Features />
          <HowItWorks />
          <Devices />
          <Industries />
          <Pricing />
          <Comparison />
          <Faq />
          <Cta />
          <LogoWall />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
