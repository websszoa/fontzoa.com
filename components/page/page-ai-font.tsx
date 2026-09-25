"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

import fontImages from "@/data/font-images.json";

const TYPE_FILTERS = [
  "전체",
  ...Array.from(new Set(fontImages.flatMap((image) => image.type))),
];
const STYLE_FILTERS = [
  "전체",
  ...Array.from(new Set(fontImages.map((image) => image.style))),
];

export default function PageAiFont() {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [styleFilter, setStyleFilter] = useState("전체");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredImages = fontImages.filter((image) => {
    const matchesType =
      typeFilter === "전체" || image.type.includes(typeFilter);
    const matchesStyle = styleFilter === "전체" || image.style === styleFilter;
    return matchesType && matchesStyle;
  });

  return (
    <main className="flex-1 bg-paper text-foreground">
      <section className="bg-grain relative isolate border-b border-black/20">
        <div className="relative z-10 grid min-w-0 grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-w-0 border-black/20 md:border-r">
            <div className="border-b border-black/20 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <p className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                02 / Image collection
              </p>
              <h1 className="mt-2 flex items-center text-3xl leading-none font-bold tracking-tighter sm:text-4xl">
                <span>AI Font</span>
                <span
                  aria-hidden="true"
                  className="ml-2 -mt-3 size-2 shrink-0 rounded-full bg-signal"
                />
              </h1>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="ai-font-filters"
                className="mt-5 flex h-11 w-full justify-between rounded-none border border-black/20 px-3 md:hidden"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal aria-hidden="true" className="size-4" />
                  필터 메뉴
                </span>
                {filtersOpen ? (
                  <X aria-hidden="true" className="size-4" />
                ) : (
                  <span className="font-mono text-[9px] text-foreground/45">
                    {typeFilter} · {styleFilter}
                  </span>
                )}
              </Button>
            </div>

            <div
              id="ai-font-filters"
              className={cn(
                "border-b border-black/20 bg-transparent p-4 sm:p-5 md:sticky md:top-16 md:block md:border-b-0 md:p-6",
                filtersOpen ? "block" : "hidden",
              )}
            >
              <div>
                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                  <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                    01 — Type
                  </p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase">
                    Select one
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {TYPE_FILTERS.map((type) => {
                    const count =
                      type === "전체"
                        ? fontImages.length
                        : fontImages.filter((image) =>
                            image.type.includes(type),
                          ).length;

                    return (
                      <Button
                        key={type}
                        type="button"
                        variant="ghost"
                        onClick={() => setTypeFilter(type)}
                        aria-pressed={typeFilter === type}
                        className={cn(
                          "h-12 flex-col items-start justify-center gap-0 rounded-2xl border border-black/20 bg-transparent px-3 text-xs hover:border-foreground hover:bg-transparent hover:text-foreground",
                          typeFilter === type &&
                            "border-signal bg-signal text-paper hover:border-signal hover:bg-signal hover:text-paper",
                        )}
                      >
                        <span>{type === "전체" ? "전체 타입" : type}</span>
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
                    02 — Style
                  </p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase">
                    Select one
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {STYLE_FILTERS.map((style) => {
                    const count =
                      style === "전체"
                        ? fontImages.length
                        : fontImages.filter((image) => image.style === style)
                            .length;

                    return (
                      <Button
                        key={style}
                        type="button"
                        variant="ghost"
                        onClick={() => setStyleFilter(style)}
                        aria-pressed={styleFilter === style}
                        title={style}
                        className={cn(
                          "h-12 min-w-0 flex-col items-start justify-center gap-0 rounded-2xl border border-black/20 bg-transparent px-3 text-xs hover:border-foreground hover:bg-transparent hover:text-foreground",
                          styleFilter === style &&
                            "border-signal bg-signal text-paper hover:border-signal hover:bg-signal hover:text-paper",
                        )}
                      >
                        <span className="w-full truncate text-left">
                          {style === "전체" ? "전체 스타일" : style}
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

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3 px-4 py-4 font-mono text-[10px] tracking-[0.08em] text-foreground/55 uppercase sm:px-5 md:px-5 md:pt-5 md:pb-4">
              <span>Image collection</span>
              <span className="hidden md:inline">Browse</span>
            </div>

            {filteredImages.length > 0 ? (
              <div className="grid min-w-0 grid-cols-2 xl:grid-cols-3">
                {filteredImages.map((image, index) => (
                  <article
                    key={image.src}
                    className="min-w-0 border-t border-black/20 p-3 sm:p-5 md:p-6"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2 font-mono text-[10px] tracking-[0.08em] text-foreground/50 uppercase">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{image.type.join(" · ")}</span>
                    </div>
                    <div className="relative aspect-3/4 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 1279px) 37vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0 pt-3">
                      <p className="truncate text-sm font-semibold">
                        {image.style}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/55">
                        {image.prompt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                role="status"
                className="flex min-h-64 items-center justify-center border-t border-black/20 px-4 text-center"
              >
                <p className="text-sm text-foreground/60">
                  해당 조건에 맞는 이미지가 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
