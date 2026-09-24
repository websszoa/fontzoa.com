"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Download, Sparkles } from "lucide-react";

import OflDialog from "@/components/dialog/dialog-ofl";
import WebfontUseDialog from "@/components/dialog/dialog-use";

import type fontCatalog from "@/data/font-catalog.json";
import fontQuotes from "@/data/font-quotes.json";

type Font = (typeof fontCatalog)[number];
type PreviewLanguage = "ko" | "en";

const DEFAULT_PREVIEW = fontQuotes.quotes[0].text;
const DEFAULT_ENGLISH_PREVIEW = fontQuotes.quotes[0].scaleText;
const DEFAULT_AUTHOR = fontQuotes.quotes[0].author;
const KOREAN_GLYPHS = "가나다라마바사아자차카타파하";
const LATIN_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LATIN_LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789  ! ? & @ # %";
const SIZE_STEPS = [60, 48, 32, 24, 18, 14, 12, 10];
const READING_SAMPLES = fontQuotes.readingSamples;
const LICENSE_USES = fontQuotes.licenseUses;

function getFontType(font: Font) {
  const types = font.type
    ?.flatMap((type) => type.split(/[,，]/))
    .map((type) => type.trim())
    .filter((type) => type.length > 0);

  return types && types.length > 0
    ? Array.from(new Set(types)).join(" · ")
    : "기타";
}

export default function PageWebfontDetail({
  font,
  initialScaleText,
}: {
  font: Font;
  initialScaleText: string;
}) {
  const [previewText, setPreviewText] = useState(DEFAULT_PREVIEW);
  const [englishText, setEnglishText] = useState(DEFAULT_ENGLISH_PREVIEW);
  const [quoteAuthor, setQuoteAuthor] = useState(DEFAULT_AUTHOR);
  const [previewLanguage, setPreviewLanguage] = useState<PreviewLanguage>("ko");
  const [fontSize, setFontSize] = useState(64);
  const [scaleText, setScaleText] = useState(initialScaleText);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [readingFontSize, setReadingFontSize] = useState(16);
  const [readingLineHeight, setReadingLineHeight] = useState(1.8);
  const displayName = font.koreanName || font.name;
  const isOfl = font.license?.includes("OFL") ?? false;
  const fontStyle = {
    fontFamily: `"${font.className}", sans-serif`,
    fontWeight: font.weightValue,
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const randomQuote =
        fontQuotes.quotes[Math.floor(Math.random() * fontQuotes.quotes.length)];

      setPreviewText(randomQuote.text);
      setEnglishText(randomQuote.scaleText);
      setQuoteAuthor(randomQuote.author);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const randomizeQuote = () => {
    const quotes = fontQuotes.quotes.filter(
      (quote) => quote.text !== previewText,
    );
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    setPreviewText(randomQuote.text);
    setEnglishText(randomQuote.scaleText);
    setQuoteAuthor(randomQuote.author);
  };

  const randomizeScaleText = () => {
    const quotes = fontQuotes.previewQuotes.filter(
      (quote) => quote !== scaleText,
    );
    setScaleText(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <main className="flex-1 bg-paper text-foreground">
      <section className="bg-grain relative isolate border-b border-black/20">
        <div className="relative z-10 grid min-w-0 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)]">
          <aside className="min-w-0 border-black/20 md:border-r">
            <div className="border-b border-black/20 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <Link
                href="/web-font"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/50 uppercase hover:text-signal"
              >
                <ArrowLeft aria-hidden="true" className="size-3.5" />
                Web font collection
              </Link>
              <h1
                className="mt-4 break-keep text-3xl leading-none tracking-tighter sm:text-4xl"
                style={fontStyle}
              >
                {displayName}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block size-2 rounded-full bg-signal align-top"
                />
              </h1>
              <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-foreground/45 uppercase">
                {font.name}
              </p>
            </div>

            <div className="p-4 sm:p-5 md:sticky md:top-16 md:p-6">
              <dl className="border-t border-black/20">
                {[
                  { label: "Style", value: getFontType(font) },
                  {
                    label: "Weight",
                    value: `${font.weight} / ${font.weightValue}`,
                  },
                  { label: "Format", value: "WOFF2" },
                  ...(font.license
                    ? [
                        {
                          label: "License",
                          value: font.license.includes("OFL") ? (
                            <OflDialog license={font.license} />
                          ) : (
                            font.license
                          ),
                        },
                      ]
                    : []),
                  { label: "Class", value: font.className },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="grid min-h-12 grid-cols-[5rem_minmax(0,1fr)] items-center border-b border-black/20 py-2 text-xs"
                  >
                    <dt className="flex h-full items-center font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                      {label}
                    </dt>
                    <dd className="flex h-full min-w-0 items-center wrap-break-word">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid gap-2">
                {font.download?.[0] && (
                  <a
                    href={font.download[0]}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-11 w-full justify-between rounded-none border border-signal bg-signal px-3 text-paper hover:bg-foreground hover:text-paper",
                    )}
                  >
                    폰트 다운로드
                    <Download aria-hidden="true" className="size-4" />
                  </a>
                )}
                {font.website?.[0] && (
                  <a
                    href={font.website[0]}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-11 w-full justify-between rounded-none border border-black/20 px-3 hover:bg-foreground hover:text-paper",
                    )}
                  >
                    이 폰트로 만들어진 사이트
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                )}
                <WebfontUseDialog
                  displayName={displayName}
                  className={font.className}
                  file={font.file}
                  weightValue={font.weightValue}
                />
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <section className="min-h-120 overflow-hidden bg-paper bg-grain">
              <div className="relative z-10 flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-black/20 px-4 py-2 font-mono text-[10px] tracking-widest text-foreground/45 uppercase sm:px-5 md:px-6">
                <span>01 — Live preview</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3 tabular-nums">
                    <span>Size</span>
                    <input
                      type="range"
                      min="32"
                      max="120"
                      value={fontSize}
                      onChange={(event) =>
                        setFontSize(Number(event.target.value))
                      }
                      aria-label="Live Preview 글자 크기"
                      className="h-1 w-28 cursor-pointer accent-signal sm:w-36"
                    />
                    <span className="w-5 text-right text-foreground/70">
                      {fontSize}px
                    </span>
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={randomizeQuote}
                    aria-label="랜덤 명언 변경"
                    title="랜덤 명언 변경"
                    className="size-9 rounded-none border-0 text-foreground/45 hover:bg-foreground hover:text-paper"
                  >
                    <Sparkles aria-hidden="true" className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="relative z-10 grid min-h-144 lg:grid-cols-4">
                <div className="flex min-w-0 flex-col justify-between p-4 sm:p-6 md:p-8 lg:col-span-3">
                  <div className="flex items-center gap-3 font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                    <span>Selected quotation</span>
                    <span className="h-px w-8 bg-foreground/20" />
                    <span>
                      {previewLanguage === "ko" ? "Korean" : "English"} ·{" "}
                      {getFontType(font)}
                    </span>
                  </div>

                  <div>
                    <p
                      className={cn(
                        "w-full min-w-0 tracking-tight",
                        previewLanguage === "ko"
                          ? "break-keep"
                          : "wrap-break-word",
                      )}
                      style={{ ...fontStyle, fontSize, lineHeight: 1.3 }}
                    >
                      {previewLanguage === "ko"
                        ? previewText || DEFAULT_PREVIEW
                        : englishText || DEFAULT_ENGLISH_PREVIEW}
                    </p>
                    <p
                      className="mt-8 text-lg text-foreground/45"
                      style={fontStyle}
                    >
                      — {quoteAuthor}
                    </p>
                  </div>
                </div>

                <div
                  className="grid grid-cols-2 border-t border-black/20 lg:grid-cols-1 lg:grid-rows-2 lg:border-t-0 lg:border-l lg:border-black/20"
                  style={fontStyle}
                  aria-label="미리보기 언어 선택"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    style={fontStyle}
                    onClick={() => setPreviewLanguage("ko")}
                    aria-pressed={previewLanguage === "ko"}
                    className={cn(
                      "relative h-auto min-h-36 rounded-none border-0 border-r border-black/20 text-7xl leading-none hover:bg-transparent hover:text-signal lg:border-r-0 lg:border-b",
                      previewLanguage === "ko" && "text-signal",
                    )}
                  >
                    가
                    {previewLanguage === "ko" && (
                      <span
                        aria-hidden="true"
                        className="absolute top-4 right-4 size-2 rounded-full bg-signal"
                      />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    style={fontStyle}
                    onClick={() => setPreviewLanguage("en")}
                    aria-pressed={previewLanguage === "en"}
                    className={cn(
                      "relative h-auto min-h-36 rounded-none border-0 text-6xl leading-none hover:bg-transparent hover:text-signal",
                      previewLanguage === "en" && "text-signal",
                    )}
                  >
                    Aa
                    {previewLanguage === "en" && (
                      <span
                        aria-hidden="true"
                        className="absolute top-4 right-4 size-2 rounded-full bg-signal"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="bg-paper bg-grain">
        <div className="relative z-10">
          <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-black/20 px-4 py-2 sm:px-5 md:px-6">
            <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              02 — Scale
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              <label className="flex items-center gap-3 tabular-nums">
                <span>Spacing</span>
                <input
                  type="range"
                  min="-2"
                  max="12"
                  step="0.5"
                  value={letterSpacing}
                  onChange={(event) =>
                    setLetterSpacing(Number(event.target.value))
                  }
                  aria-label="Scale 글자 사이 간격"
                  className="h-1 w-28 cursor-pointer accent-signal sm:w-36"
                />
                <span className="w-10 text-right text-foreground/70">
                  {letterSpacing}px
                </span>
              </label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={randomizeScaleText}
                aria-label="Scale 랜덤 문구 변경"
                title="Scale 랜덤 문구 변경"
                className="size-9 rounded-none border-0 text-foreground/45 hover:bg-foreground hover:text-paper"
              >
                <Sparkles aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </header>
          <div>
            {SIZE_STEPS.map((size) => (
              <div
                key={size}
                className="grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] border-b border-black/20 sm:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <span className="flex items-start justify-center border-r border-black/20 py-5 font-mono text-[9px] text-foreground/40 tabular-nums sm:py-6">
                  {size}px
                </span>
                <p
                  className="min-w-0 overflow-hidden px-4 py-4 whitespace-nowrap sm:px-6 sm:py-5"
                  style={{
                    ...fontStyle,
                    fontSize: size,
                    letterSpacing,
                    lineHeight: 1.25,
                  }}
                >
                  {scaleText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/20 bg-paper bg-grain">
        <div className="relative z-10">
          <header className="flex items-center justify-between border-b border-black/20 px-4 py-4 sm:px-5 md:px-6">
            <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              03 — Characters
            </p>
            <p className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
              <span className="size-1.5 rounded-full bg-signal" />
              Hangul / Latin / Numeric
            </p>
          </header>

          <div style={fontStyle}>
            <div className="border-b border-black/20 p-4 sm:p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                <span>Hangul syllables</span>
                <span>가 — 하</span>
              </div>
              <p className="text-5xl leading-tight break-all text-signal sm:text-7xl lg:text-8xl">
                {KOREAN_GLYPHS}
              </p>
              <p className="mt-8 max-w-6xl text-2xl leading-relaxed break-keep text-foreground/55 sm:text-3xl">
                글자의 모양과 균형, 획의 흐름이 만드는 한글의 표정을 살펴보세요.
              </p>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className="min-w-0 border-b border-black/20 p-4 sm:p-6 md:p-8 lg:border-r lg:border-b-0">
                <p className="mb-8 font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                  Latin alphabet
                </p>
                <p className="text-4xl leading-snug break-all sm:text-5xl">
                  {LATIN_UPPER}
                </p>
                <p className="mt-5 text-4xl leading-snug break-all text-foreground/55 sm:text-5xl">
                  {LATIN_LOWER}
                </p>
              </div>

              <div className="min-w-0 p-4 sm:p-6 md:p-8">
                <p className="mb-8 font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                  Numbers & symbols
                </p>
                <p className="text-4xl leading-snug break-all sm:text-6xl">
                  {NUMBERS}
                </p>
                <p className="mt-6 text-2xl leading-relaxed text-foreground/55 sm:text-3xl">
                  2026.09.23 / (Font) [Type] — 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper bg-grain" style={{ overflowAnchor: "none" }}>
        <div className="relative z-10 min-w-0">
          <header className="flex min-h-14 flex-col items-stretch justify-between gap-3 border-b border-black/20 px-4 py-3 sm:flex-row sm:items-center sm:px-6 sm:py-2">
            <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              04 — Reading
            </p>
            <div className="grid min-w-0 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <label className="grid grid-cols-[auto_minmax(0,1fr)_2rem] items-center gap-3 font-mono text-[10px] tracking-widest text-foreground/45 uppercase tabular-nums sm:flex">
                <span>Size</span>
                <input
                  type="range"
                  min="10"
                  max="18"
                  step="1"
                  value={readingFontSize}
                  onChange={(event) =>
                    setReadingFontSize(Number(event.target.value))
                  }
                  aria-label="Reading 글자 크기"
                  className="h-1 w-full min-w-0 cursor-pointer accent-signal sm:w-32"
                />
                <span className="w-8 text-right text-foreground/70">
                  {readingFontSize}px
                </span>
              </label>
              <label className="grid grid-cols-[auto_minmax(0,1fr)_1.5rem] items-center gap-3 font-mono text-[10px] tracking-widest text-foreground/45 uppercase tabular-nums sm:flex">
                <span>Line height</span>
                <input
                  type="range"
                  min="1.2"
                  max="2.2"
                  step="0.1"
                  value={readingLineHeight}
                  onChange={(event) =>
                    setReadingLineHeight(Number(event.target.value))
                  }
                  aria-label="Reading 줄 간격"
                  className="h-1 w-full min-w-0 cursor-pointer accent-signal sm:w-32"
                />
                <span className="w-6 text-right text-foreground/70">
                  {readingLineHeight.toFixed(1)}
                </span>
              </label>
            </div>
          </header>
          <div className="grid border-b border-black/20 lg:grid-cols-2">
            {READING_SAMPLES.map((sample) => (
              <article
                key={sample.language}
                className="min-w-0 border-b border-black/20 p-4 last:border-b-0 sm:p-6 md:p-8 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="flex items-center justify-between border-b border-black/20 pb-4">
                  <span className="font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                    {sample.title}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-foreground/30 uppercase">
                    Long-form reading
                  </span>
                </div>
                <div
                  className="mt-8 space-y-6"
                  style={{
                    ...fontStyle,
                    fontSize: readingFontSize,
                    lineHeight: readingLineHeight,
                  }}
                  lang={sample.language}
                >
                  {sample.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper bg-grain">
        <div className="relative z-10 min-w-0">
          <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-black/20 px-4 py-3 sm:px-6">
            <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              05 — License
            </p>
            {font.license && (
              <p className="text-right font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                {font.license}
              </p>
            )}
          </header>

          {isOfl ? (
            <div style={fontStyle}>
              {LICENSE_USES.map(({ category, example, allowed }) => (
                <div
                  key={category}
                  className="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)_4.5rem] border-b border-black/20 sm:grid-cols-[10rem_minmax(0,1fr)_6rem]"
                >
                  <span className="flex items-center border-r border-black/20 px-4 py-4 text-sm">
                    {category}
                  </span>
                  <p className="min-w-0 px-4 py-4 leading-relaxed text-foreground/65 text-sm">
                    {example}
                  </p>
                  <span
                    className={cn(
                      "flex items-center justify-center border-l border-black/20 px-2 text-center whitespace-nowrap text-sm",
                      allowed ? "text-signal" : "text-foreground",
                    )}
                    aria-label={allowed ? "사용 가능" : "사용 불가"}
                  >
                    {allowed ? "사용 가능" : "사용 불가"}
                  </span>
                </div>
              ))}

              <p className="px-4 py-5 text-[14px] leading-relaxed text-foreground/85 sm:px-6">
                위 내용은 라이선스의 주요 사용 범위를 이해하기 쉽게 정리한
                안내입니다. 정확한 사용 범위와 세부 조건은 폰트 원본 배포
                사이트에서 자세히 확인해 주세요.
              </p>
            </div>
          ) : (
            <div className="border-b border-black/20 px-4 py-12 text-center text-sm text-foreground/45 sm:px-6">
              이 폰트의 라이선스 정보는 준비 중입니다.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
