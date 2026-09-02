"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, Type, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ScrambleText from "@/components/main/scramble-text";
import RandomFontTitle from "@/components/main/random-font-title";
import ViewTypeGrid from "@/components/main/view-type-grid";
import ViewTypeList from "@/components/main/view-type-list";
import fontCatalog from "@/data/font-catalog.json";
import { getWeightLabel, type FontCatalogItem } from "@/lib/utils";

const scramblePhrases = [
  "KOREAN TYPE\nARCHIVE",
  "한글의 표정\n오백여 가지",
  "FONT ZOA\nCOLLECTION",
];

const viewModes = [
  { value: "box", label: "Grid view" },
  { value: "list", label: "List view" },
] as const;

const fonts = fontCatalog as FontCatalogItem[];
const fontTypes = [
  { label: "모든폰트", value: null },
  { label: "필기체", value: "필기체" },
  { label: "고딕체", value: "고딕체" },
  { label: "명조체", value: "명조체" },
] as const;
const fontWeights: { label: string; value: number | null }[] = [
  { label: "ALL", value: null },
  { label: getWeightLabel("Thin"), value: 100 },
  { label: getWeightLabel("ExtraLight"), value: 200 },
  { label: getWeightLabel("Light"), value: 300 },
  { label: getWeightLabel("Regular"), value: 400 },
  { label: getWeightLabel("Medium"), value: 500 },
  { label: getWeightLabel("SemiBold"), value: 600 },
  { label: getWeightLabel("Bold"), value: 700 },
  { label: getWeightLabel("ExtraBold"), value: 800 },
  { label: getWeightLabel("Black"), value: 900 },
];

export default function FontArchive() {
  const [view, setView] = useState<"list" | "box">("box");
  const [query, setQuery] = useState("");
  const [sample, setSample] = useState("좋은 글자는 오래 남습니다");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const deferredQuery = useDeferredValue(query);

  const filteredFonts = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase("ko");
    return fonts.filter((font) => {
      const matchesQuery =
        !normalizedQuery ||
        [font.name, font.koreanName, font.weight].some((value) =>
          value?.toLocaleLowerCase("ko").includes(normalizedQuery),
        );
      const matchesType =
        selectedType === null || font.type?.includes(selectedType);
      const matchesWeight =
        selectedWeight === null || font.weightValue === selectedWeight;

      return matchesQuery && matchesType && matchesWeight;
    });
  }, [deferredQuery, selectedType, selectedWeight]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="grid min-h-75 border-b border-black/20 md:min-h-97.5 md:grid-cols-[1fr_34%]">
        <div className="flex flex-col justify-between px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
          <p className="font-mono text-[10px] tracking-[.12em] uppercase">
            Korean Free Font Archive · {fonts.length} Faces
          </p>
          <RandomFontTitle />
        </div>
        <div
          className="relative hidden overflow-hidden border-l border-black/20 md:flex md:flex-col"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between border-b border-black/25 px-5 py-4 font-mono text-[9px] tracking-[.12em] uppercase">
            <span>Scramble Type</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-black" />{" "}
              Live
            </span>
          </div>
          <div className="flex flex-1 items-center px-5 lg:px-7">
            <p className="font-mono text-[clamp(2rem,3.4vw,4.2rem)] leading-[.94] font-bold tracking-[-.06em] uppercase">
              <ScrambleText phrases={scramblePhrases} />
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-black/25 font-mono text-[9px] tracking-widest uppercase">
            <span className="px-5 py-4">Character by character</span>
            <span className="border-l border-black/25 px-5 py-4 text-right">
              {fonts.length} faces
            </span>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-black/20 bg-paper/95 backdrop-blur-md md:top-18">
        <div className="grid grid-cols-2">
          <label className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">폰트 검색</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="폰트 이름 검색"
              className="h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="rounded-none"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            )}
          </label>
          <label className="flex h-14 items-center gap-3 border-l border-black/20 px-4 sm:px-6 lg:px-8">
            <Type className="size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">미리보기 문구</span>
            <Input
              value={sample}
              maxLength={36}
              onChange={(event) => setSample(event.target.value)}
              placeholder="미리보기 문구를 입력하세요"
              className="h-auto rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </label>
        </div>

        <div className="flex h-14 justify-between border-t border-black/20">
          <div className="flex flex-1 items-center px-4 font-mono text-[10px] tracking-widest uppercase sm:px-6">
            View type
            <sup className="ml-1 text-signal">[{viewModes.length}]</sup>
          </div>
          <div
            className="flex border-l border-black/20"
            role="group"
            aria-label="보기 방식 선택"
          >
            {viewModes.map((mode, index) => (
              <Button
                key={mode.value}
                type="button"
                variant="ghost"
                aria-label={
                  mode.value === "box" ? "격자로 보기" : "목록으로 보기"
                }
                aria-pressed={view === mode.value}
                onClick={() => setView(mode.value)}
                className={`flex h-14 w-20 flex-col items-start justify-between rounded-none border-0 border-r border-black/20 px-3 py-2 font-mono text-[10px] font-normal tracking-widest uppercase ${view === mode.value ? "bg-ink text-paper hover:bg-ink hover:text-paper" : "hover:bg-black/5"}`}
              >
                <span>[{String(index + 1).padStart(2, "0")}]</span>
                <span>{mode.label.replace(" view", "")}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-14 items-center justify-between border-b border-black/20 font-mono text-[10px] tracking-widest uppercase">
        <span className="px-4 sm:px-6">
          All fonts <sup className="text-signal">[{filteredFonts.length}]</sup>
        </span>
        <div
          className="flex h-full border-l border-black/20"
          role="group"
          aria-label="폰트 유형 필터"
        >
          {fontTypes.map((type, index) => (
            <Button
              key={type.label}
              type="button"
              variant="ghost"
              aria-pressed={selectedType === type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex h-14 w-20 flex-col items-start justify-between rounded-none border-0 border-r border-black/20 px-3 py-2 font-mono text-[10px] font-normal tracking-widest ${selectedType === type.value ? "bg-ink text-paper hover:bg-ink hover:text-paper" : "hover:bg-black/5"}`}
            >
              <span>[{String(index + 1).padStart(2, "0")}]</span>
              <span className="text-[11px]">{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex h-14 items-center justify-between border-b border-black/20 font-mono text-[10px] tracking-widest uppercase">
        <span className="shrink-0 px-4 sm:px-6">
          Font weight
          <sup className="ml-1 text-signal">[{fontWeights.length - 1}]</sup>
        </span>
        <div
          className="flex h-full min-w-0 overflow-x-auto border-l border-black/20"
          role="group"
          aria-label="폰트 굵기 필터"
        >
          {fontWeights.map((weight) => (
            <Button
              key={weight.label}
              type="button"
              variant="ghost"
              aria-pressed={selectedWeight === weight.value}
              onClick={() => setSelectedWeight(weight.value)}
              className={`flex h-14 w-20 shrink-0 flex-col items-start justify-between rounded-none border-0 border-r border-black/20 px-3 py-2 font-mono text-[10px] font-normal tracking-widest ${selectedWeight === weight.value ? "bg-ink text-paper hover:bg-ink hover:text-paper" : "hover:bg-black/5"}`}
            >
              <span>[{weight.value ?? "ALL"}]</span>
              <span className="text-[8px] tracking-normal whitespace-nowrap">
                {weight.label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {view === "box" ? (
        <ViewTypeGrid fonts={filteredFonts} sample={sample} />
      ) : (
        <ViewTypeList fonts={filteredFonts} sample={sample} />
      )}

      {filteredFonts.length === 0 && (
        <div className="grid min-h-72 w-full place-items-center px-4 text-center">
          <p className="text-sm text-black/55">
            검색 결과가 없습니다. 다른 이름으로 찾아보세요.
          </p>
        </div>
      )}
    </div>
  );
}
