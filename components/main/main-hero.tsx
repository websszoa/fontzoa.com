"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEATURED_CLASS_NAMES } from "@/lib/setting";
import { MAIN_MENU } from "@/lib/menu";

import fontCatalog from "@/data/font-catalog.json";

const featuredFonts = FEATURED_CLASS_NAMES.map((className) => {
  const font = fontCatalog.find((item) => item.className === className);

  if (!font) throw new Error(`Font catalog entry not found: ${className}`);
  return font;
});

const previewText = {
  ko: "상상이 글자가 되는 순간, 좋은 폰트가 시작됩니다. 폰트조아에서 나만의 서체를 만나보세요.",
  en: "FontZoa is the easiest way to discover, preview and choose beautiful Korean typefaces for every creative project.",
};

const webFontMenu = MAIN_MENU.find((item) => item.label === "WEB font");

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewLanguage, setPreviewLanguage] = useState<"ko" | "en">("en");
  const previewRef = useRef<HTMLHeadingElement>(null);
  const currentFont = featuredFonts[currentIndex];
  const fontDetails = [
    { label: "Font name", value: currentFont.name },
    {
      label: "Weight",
      value: `${currentFont.weight} · ${currentFont.weightValue}`,
    },
    { label: "Style", value: currentFont.type?.[0] ?? "디스플레이" },
    { label: "Class name", value: currentFont.className },
  ];

  const moveFont = (direction: -1 | 1) => {
    setCurrentIndex(
      (index) =>
        (index + direction + featuredFonts.length) % featuredFonts.length,
    );
  };

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.registerPlugin(SplitText);

        const split = SplitText.create(preview, {
          type: "lines,chars",
          mask: "lines",
          charsClass: "preview-char",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            const timeline = gsap.timeline();

            self.lines.forEach((line, index) => {
              timeline.fromTo(
                line.querySelectorAll(".preview-char"),
                { yPercent: 115, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power3.out",
                  stagger: 0.018,
                },
                index === 0 ? 0 : ">-0.08",
              );
            });

            return timeline;
          },
        });

        return () => split.kill();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(preview, { opacity: 1 });
      });

      return () => media.revert();
    }, preview);

    return () => context.revert();
  }, [currentIndex, previewLanguage]);

  return (
    <section className="bg-grain relative isolate overflow-hidden border-b border-black/20 bg-paper text-foreground">
      <div className="relative z-10 grid min-h-125 grid-cols-1 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)] md:grid-rows-[minmax(26.25rem,auto)_5rem]">
        <aside className="flex min-w-0 flex-col border-black/20 md:border-r">
          <div className="flex items-stretch justify-between border-b border-black/20">
            <div className="min-w-0 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <p className="font-mono text-[10px] tracking-[0.12em] text-foreground/50 uppercase">
                01 / Typeface collection
              </p>
              <h2 className="mt-2 flex items-center text-3xl leading-none font-bold tracking-[-0.07em] sm:text-4xl">
                <span>Web Font</span>
                <span
                  aria-hidden="true"
                  className="ml-2 -mt-3 size-2 shrink-0 rounded-full bg-signal"
                />
              </h2>
            </div>

            {webFontMenu && (
              <Link
                href={webFontMenu.href}
                aria-label="Web Font 자세히 보기"
                className="group relative flex aspect-square w-18 mr-5 shrink-0 self-center items-center justify-center overflow-hidden border border-y-0 border-r-0 border-black/20 bg-signal text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-foreground"
              >
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:-translate-y-full">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
                <span className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
              </Link>
            )}
          </div>

          <div className="flex min-h-64 flex-1 flex-col p-4 sm:p-5 md:p-6">
            <div className="relative flex min-h-48 flex-1 flex-col justify-between overflow-hidden border border-black/20 p-4 sm:p-5">
              <span className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                Type specimen
              </span>
              <p
                aria-live="polite"
                className={cn(
                  "my-6 min-w-0 text-center text-[clamp(2rem,4vw,3.5rem)] leading-tight break-keep",
                  currentFont.className,
                )}
              >
                {currentFont.koreanName ?? currentFont.name}
              </p>
              <span className="truncate font-mono text-[10px] tracking-[0.06em] text-foreground/45 uppercase">
                {currentFont.name}
              </span>
            </div>

            <div className="grid h-10 grid-cols-2 border-x border-b border-black/20">
              <Button
                type="button"
                variant="ghost"
                onClick={() => moveFont(-1)}
                aria-label="이전 폰트"
                className="h-full w-full rounded-none border-0 border-r border-black/20 hover:bg-foreground hover:text-paper"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => moveFont(1)}
                aria-label="다음 폰트"
                className="h-full w-full rounded-none border-0 hover:bg-foreground hover:text-paper"
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-foreground/60 tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(featuredFonts.length).padStart(2, "0")}
              </p>
              <div aria-hidden="true" className="flex gap-1.5">
                {featuredFonts.map((font, index) => (
                  <span
                    key={font.className}
                    className={cn(
                      "size-2 rounded-full border border-foreground/35",
                      index === currentIndex &&
                        "border-foreground bg-foreground",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="relative min-w-0 border-t border-black/20 md:border-t-0">
          <div className="flex items-start justify-between gap-3 px-4 py-4 font-mono text-[10px] tracking-[0.08em] text-foreground/55 uppercase sm:px-5 md:absolute md:inset-x-5 md:top-5 md:p-0">
            <span>Selected typeface</span>
            <span className="hidden md:inline">Preview</span>
          </div>

          <div className="flex items-start px-4 pt-4 pb-12 sm:px-5 sm:pb-14 md:px-5 md:pt-14 md:pb-4">
            <h1
              key={`${currentFont.className}-${previewLanguage}`}
              ref={previewRef}
              aria-live="polite"
              className={cn(
                "w-full max-w-full text-[clamp(2.25rem,11vw,4.5rem)] leading-[1.2] text-pretty md:text-[clamp(2.75rem,4.5vw,5.8rem)] md:leading-[1.18] md:tracking-[-0.06em]",
                currentFont.className,
              )}
            >
              {previewText[previewLanguage]}
            </h1>
          </div>
        </div>

        <div className="col-span-full grid min-w-0 border-t border-black/20 md:h-20 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid min-w-0 grid-cols-2 border-b border-black/20 md:flex md:divide-x md:divide-black/20 md:border-b-0">
            {fontDetails.map((detail, index) => (
              <div
                key={detail.label}
                className={cn(
                  "flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5 md:border-0 md:py-0",
                  index < 2 && "border-b border-black/20",
                  index % 2 === 0 && "border-r border-black/20",
                )}
              >
                <p className="text-[10px] text-foreground/45">{detail.label}</p>
                <span
                  aria-hidden="true"
                  className="my-1.5 w-5 border-t border-black/35"
                />
                <p className="truncate text-xs">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="grid h-16 min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:h-20">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPreviewLanguage("ko")}
              aria-pressed={previewLanguage === "ko"}
              className={cn(
                "font-anyvid h-full min-w-0 rounded-none border-0 border-r border-black/20 px-2 text-[13px] whitespace-nowrap sm:px-4 md:px-8",
                previewLanguage === "ko"
                  ? "bg-signal/15 text-foreground hover:bg-signal/25"
                  : "hover:bg-black/5",
              )}
            >
              <span className="whitespace-nowrap">한글</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPreviewLanguage("en")}
              aria-pressed={previewLanguage === "en"}
              className={cn(
                "font-anyvid h-full min-w-0 rounded-none border-0 px-2 text-[13px] whitespace-nowrap sm:px-4",
                previewLanguage === "en"
                  ? "bg-signal/15 text-foreground hover:bg-signal/25"
                  : "hover:bg-black/5",
              )}
            >
              <span className="whitespace-nowrap">영어</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
