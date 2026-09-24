"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowDown,
  ArrowUpRight,
  Search,
  Shuffle,
  Sparkles,
  Type,
} from "lucide-react";

import type fontCatalog from "@/data/font-catalog.json";
import fontQuotes from "@/data/font-quotes.json";

type Font = (typeof fontCatalog)[number];
type TypeFilter = string;
type CompanyFilter = string;
type WeightFilter =
  | "전체"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

const WEIGHT_FILTERS: { label: string; value: WeightFilter }[] = [
  { label: "모든 굵기", value: "전체" },
  { label: "아주 얇게", value: 100 },
  { label: "매우 가늘게", value: 200 },
  { label: "가늘게", value: 300 },
  { label: "보통", value: 400 },
  { label: "중간", value: 500 },
  { label: "약간 굵게", value: 600 },
  { label: "굵게", value: 700 },
  { label: "두껍게", value: 800 },
  { label: "아주 두껍게", value: 900 },
];
const PREVIEW_QUOTES = fontQuotes.previewQuotes;
const PAGE_SIZE = 12;

function getFontTypes(font: Font): string[] {
  const catalogTypes = font.type
    ?.flatMap((type) => type.split(/[,，]/))
    .map((type) => type.trim())
    .filter((type) => type.length > 0);

  return catalogTypes && catalogTypes.length > 0
    ? Array.from(new Set(catalogTypes))
    : ["기타"];
}

function getFontCompany(font: Font): string {
  return font.company?.trim() || "기타";
}

function matchesWeight(font: Font, weight: WeightFilter) {
  if (weight === "전체") return true;
  return font.weightValue === weight;
}

function shuffleFonts(fonts: Font[]) {
  const shuffled = [...fonts];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function PageWebfont({ fonts }: { fonts: Font[] }) {
  const [orderedFonts, setOrderedFonts] = useState(fonts);
  const [previewText, setPreviewText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("전체");
  const [weightFilter, setWeightFilter] = useState<WeightFilter>("전체");
  const [companyFilter, setCompanyFilter] =
    useState<CompanyFilter>("전체");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const catalogTypes = Array.from(
    new Set(fonts.flatMap((font) => getFontTypes(font))),
  );
  const typeFilters: TypeFilter[] = [
    "전체",
    ...catalogTypes
      .filter((type) => type !== "기타")
      .sort((a, b) => a.localeCompare(b, "ko")),
    ...(catalogTypes.includes("기타") ? ["기타"] : []),
  ];
  const catalogCompanies = Array.from(
    new Set(fonts.map((font) => getFontCompany(font))),
  );
  const companyFilters: CompanyFilter[] = [
    "전체",
    ...catalogCompanies
      .filter((company) => company !== "기타")
      .sort((a, b) => a.localeCompare(b, "ko")),
    ...(catalogCompanies.includes("기타") ? ["기타"] : []),
  ];

  const filteredFonts = orderedFonts.filter((font) => {
    const matchesType =
      typeFilter === "전체" || getFontTypes(font).includes(typeFilter);
    const matchesCompany =
      companyFilter === "전체" || getFontCompany(font) === companyFilter;
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("ko");
    const matchesSearch =
      normalizedQuery.length === 0 ||
      font.koreanName?.toLocaleLowerCase("ko").includes(normalizedQuery) ||
      font.name.toLocaleLowerCase("ko").includes(normalizedQuery) ||
      font.className.toLocaleLowerCase("ko").includes(normalizedQuery);

    return (
      matchesType &&
      matchesWeight(font, weightFilter) &&
      matchesCompany &&
      matchesSearch
    );
  });
  const visibleFonts = filteredFonts.slice(0, visibleCount);

  const selectType = (type: TypeFilter) => {
    setTypeFilter(type);
    setVisibleCount(PAGE_SIZE);
  };

  const selectWeight = (weight: WeightFilter) => {
    setWeightFilter(weight);
    setVisibleCount(PAGE_SIZE);
  };

  const selectCompany = (company: CompanyFilter) => {
    setCompanyFilter(company);
    setVisibleCount(PAGE_SIZE);
  };

  const randomizeFonts = () => {
    setOrderedFonts((currentFonts) => shuffleFonts(currentFonts));
    setVisibleCount(PAGE_SIZE);
  };

  const randomizePreviewText = () => {
    const quotes = PREVIEW_QUOTES.filter((quote) => quote !== previewText);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setPreviewText(quotes[randomIndex]);
  };

  const searchFonts = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="flex-1 bg-paper text-foreground">
      <section className="bg-grain relative isolate">
        <div className="relative z-10 grid min-w-0 grid-cols-1 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)]">
          <aside className="min-w-0 border-black/20 md:border-r">
            <div className="border-b border-black/20 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <p className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                01 / Typeface collection
              </p>
              <h1 className="mt-2 flex items-center text-3xl leading-none font-bold tracking-tighter sm:text-4xl">
                <span>Web Font</span>
                <span
                  aria-hidden="true"
                  className="ml-2 -mt-3 size-2 shrink-0 rounded-full bg-signal"
                />
              </h1>
            </div>

            <div className="bg-transparent p-4 sm:p-5 md:sticky md:top-16 md:p-6">
              <div>
                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                  <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                    01 — Style
                  </p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase">
                    Select one
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {typeFilters.map((type) => {
                    const count =
                      type === "전체"
                        ? fonts.length
                        : fonts.filter((font) =>
                            getFontTypes(font).includes(type),
                          ).length;

                    return (
                      <Button
                        key={type}
                        type="button"
                        variant="ghost"
                        onClick={() => selectType(type)}
                        aria-pressed={typeFilter === type}
                        className={cn(
                          "h-12 flex-1 flex-col items-start justify-center gap-0 rounded-2xl border border-black/20 bg-transparent px-3 text-xs hover:border-foreground hover:bg-transparent hover:text-foreground",
                          typeFilter === type &&
                            "border-signal bg-signal text-paper hover:border-signal hover:bg-signal hover:text-paper",
                        )}
                      >
                        <span>{type === "전체" ? "전체 스타일" : type}</span>
                        <span className="mt-0.5 font-mono text-[9px] leading-none opacity-50 tabular-nums">
                          {String(count).padStart(2, "0")}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                  <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                    02 — Weight
                  </p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase">
                    Select one
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {WEIGHT_FILTERS.map(({ label, value }) => {
                    return (
                      <Button
                        key={value}
                        type="button"
                        variant="ghost"
                        onClick={() => selectWeight(value)}
                        aria-pressed={weightFilter === value}
                        className={cn(
                          "h-12 flex-col items-start justify-center gap-0 rounded-2xl border border-black/20 bg-transparent px-3 text-xs hover:border-foreground hover:bg-transparent hover:text-foreground",
                          weightFilter === value &&
                            "border-signal bg-signal text-paper hover:border-signal hover:bg-signal hover:text-paper",
                        )}
                      >
                        <span>{label}</span>
                        <span className="mt-0.5 font-mono text-[9px] leading-none opacity-50 tabular-nums">
                          {value}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                  <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                    03 — Company
                  </p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase">
                    Select one
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {companyFilters.map((company) => {
                    const count =
                      company === "전체"
                        ? fonts.length
                        : fonts.filter(
                            (font) => getFontCompany(font) === company,
                          ).length;

                    return (
                      <Button
                        key={company}
                        type="button"
                        variant="ghost"
                        onClick={() => selectCompany(company)}
                        aria-pressed={companyFilter === company}
                        className={cn(
                          "h-12 flex-col items-start justify-center gap-0 rounded-2xl border border-black/20 bg-transparent px-3 text-xs hover:border-foreground hover:bg-transparent hover:text-foreground",
                          companyFilter === company &&
                            "border-signal bg-signal text-paper hover:border-signal hover:bg-signal hover:text-paper",
                        )}
                      >
                        <span>
                          {company === "전체" ? "전체 회사" : company}
                        </span>
                        <span className="mt-0.5 font-mono text-[9px] leading-none opacity-50 tabular-nums">
                          {String(count).padStart(2, "0")}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex min-h-[calc(100svh-4rem)] min-w-0 flex-col">
            <div className="grid h-14 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_3.5rem]">
              <div className="flex min-w-0 items-center gap-2 border-r border-black/20 px-3 sm:px-4">
                <Search
                  aria-hidden="true"
                  className="size-4 shrink-0 text-foreground/40"
                />
                <Input
                  id="font-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => searchFonts(event.target.value)}
                  placeholder="폰트 검색"
                  aria-label="폰트 이름 검색"
                  autoComplete="off"
                  className="h-full rounded-none border-0 bg-transparent px-0 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
              <div className="flex min-w-0 items-center gap-2 border-r border-black/20 px-3 sm:px-4">
                <Type
                  aria-hidden="true"
                  className="size-4 shrink-0 text-foreground/40"
                />
                <Input
                  type="text"
                  value={previewText}
                  onChange={(event) => setPreviewText(event.target.value)}
                  placeholder="여기에 글씨를 넣어보세요!"
                  aria-label="폰트 미리보기 문구"
                  maxLength={40}
                  autoComplete="off"
                  className="font-line h-full rounded-none border-0 bg-transparent px-0 pt-1 tracking-normal shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={randomizePreviewText}
                  aria-label="랜덤 미리보기 문구 만들기"
                  title="랜덤 미리보기 문구 만들기"
                  className="size-8 shrink-0 rounded-none text-foreground/45 hover:bg-foreground hover:text-paper"
                >
                  <Sparkles aria-hidden="true" className="size-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={randomizeFonts}
                aria-label="폰트 순서 랜덤으로 섞기"
                title="폰트 순서 랜덤으로 섞기"
                className="h-full w-full rounded-none border-0 text-foreground/55 hover:bg-foreground hover:text-paper"
              >
                <Shuffle aria-hidden="true" className="size-4" />
              </Button>
            </div>

            {visibleFonts.length > 0 ? (
              <div className="grid min-w-0 grid-cols-1 xl:grid-cols-2">
                {visibleFonts.map((font, index) => (
                  <Link
                    key={font.className}
                    href={{
                      pathname: `/web-font/${font.className}`,
                      query: previewText.trim()
                        ? { text: previewText.trim() }
                        : undefined,
                    }}
                    className="group flex min-h-56 min-w-0 flex-col justify-between border-t border-black/20 p-4 transition-colors hover:bg-foreground hover:text-paper focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal sm:p-5 md:p-6 xl:odd:border-r"
                  >
                    <div className="flex items-start justify-between gap-3 font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex items-center gap-2 group-hover:text-paper/60">
                        {getFontTypes(font).join(" · ")} · {font.weight}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
                        />
                      </span>
                    </div>
                    <p
                      className="my-6 min-w-0 text-[clamp(2rem,4vw,3.25rem)] leading-tight break-keep"
                      style={{
                        fontFamily: `"${font.className}", sans-serif`,
                        fontWeight: font.weightValue,
                      }}
                    >
                      {previewText.trim() || font.koreanName}
                    </p>
                    <div className="min-w-0 border-t border-black/20 pt-3 group-hover:border-paper/30">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {font.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-foreground/50">
                          {font.weight} · {font.weightValue}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                role="status"
                className="flex flex-1 items-center justify-center border-t border-black/20 px-4 text-center"
              >
                <p className="text-sm text-foreground/60">
                  해당 조건에 맞는 웹폰트가 없습니다.
                </p>
              </div>
            )}

            {visibleCount < filteredFonts.length && (
              <div className="border-t border-black/20 p-4 sm:p-5 md:p-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="h-12 w-full rounded-none border border-black/20 hover:bg-foreground hover:text-paper"
                >
                  더 보기
                  <ArrowDown aria-hidden="true" className="ml-2 size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
