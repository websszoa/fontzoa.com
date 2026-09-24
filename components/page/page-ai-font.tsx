"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import fontImages from "@/data/font-images.json";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = ["전체", ...Array.from(new Set(fontImages.flatMap((image) => image.type)))];
const STYLE_FILTERS = ["전체", ...Array.from(new Set(fontImages.map((image) => image.style)))];

export default function PageAiFont() {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [styleFilter, setStyleFilter] = useState("전체");

  const filteredImages = fontImages.filter((image) => {
    const matchesType = typeFilter === "전체" || image.type.includes(typeFilter);
    const matchesStyle = styleFilter === "전체" || image.style === styleFilter;
    return matchesType && matchesStyle;
  });

  return (
    <main className="flex-1 bg-paper text-foreground">
      <section className="bg-grain relative isolate border-b border-black/20">
        <div className="relative z-10 grid min-w-0 grid-cols-1 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)]">
          <aside className="min-w-0 border-black/20 md:border-r">
            <div className="border-b border-black/20 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <p className="font-mono text-[10px] tracking-[0.12em] text-foreground/50 uppercase">
                02 / Image collection
              </p>
              <h1 className="mt-2 flex items-center text-3xl leading-none font-bold tracking-[-0.07em] sm:text-4xl">
                <span>AI Font</span>
                <span aria-hidden="true" className="ml-2 -mt-3 size-2 shrink-0 rounded-full bg-signal" />
              </h1>
            </div>

            <div className="p-4 sm:p-5 md:sticky md:top-16 md:p-6">
              <div className="border border-black/20 p-4 sm:p-5">
                <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                  Filter images
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  원하는 타입과 스타일로 AI 타이포그래피를 살펴보세요.
                </p>

                <div className="mt-6 border-t border-black/20">
                  <p className="py-3 font-mono text-[10px] tracking-[0.08em] text-foreground/50 uppercase">
                    Type
                  </p>
                  <div className="flex flex-wrap gap-2 border-t border-black/20 pt-3">
                    {TYPE_FILTERS.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="ghost"
                        onClick={() => setTypeFilter(type)}
                        aria-pressed={typeFilter === type}
                        className={cn(
                          "h-8 rounded-none border border-black/20 px-2 text-xs hover:bg-foreground hover:text-paper",
                          typeFilter === type && "bg-foreground text-paper",
                        )}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="pb-3 font-mono text-[10px] tracking-[0.08em] text-foreground/50 uppercase">
                    Style
                  </p>
                  <div className="grid grid-cols-2 border-t border-l border-black/20">
                    {STYLE_FILTERS.map((style) => (
                      <Button
                        key={style}
                        type="button"
                        variant="ghost"
                        onClick={() => setStyleFilter(style)}
                        aria-pressed={styleFilter === style}
                        title={style}
                        className={cn(
                          "h-10 min-w-0 rounded-none border-0 border-r border-b border-black/20 px-2 text-xs hover:bg-foreground hover:text-paper",
                          styleFilter === style && "bg-foreground text-paper",
                        )}
                      >
                        <span className="truncate">{style}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <p aria-live="polite" className="mt-5 font-mono text-xs text-foreground/60 tabular-nums">
                {String(filteredImages.length).padStart(2, "0")} / {String(fontImages.length).padStart(2, "0")} works
              </p>
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
                    <div className="relative aspect-3/4 overflow-hidden border border-black/20">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 1279px) 37vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0 pt-3">
                      <p className="truncate text-sm font-semibold">{image.style}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/55">
                        {image.prompt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div role="status" className="flex min-h-64 items-center justify-center border-t border-black/20 px-4 text-center">
                <p className="text-sm text-foreground/60">해당 조건에 맞는 이미지가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
