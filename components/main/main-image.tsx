"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import fontImages from "@/data/font-images.json";
import { cn } from "@/lib/utils";
import { MAIN_MENU } from "@/lib/menu";

const AI_IMAGE_ITEMS = fontImages.slice(0, 8);
const aiFontMenu = MAIN_MENU.find((item) => item.label === "AI font");

export default function MainImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewLanguage, setPreviewLanguage] = useState<"ko" | "en">("ko");
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentImage = AI_IMAGE_ITEMS[currentIndex];

  useEffect(() => {
    const ensureVisible = () => {
      const gallery = galleryRef.current;
      const image = imageRefs.current[currentIndex];
      if (!gallery || !image) return;

      const galleryRect = gallery.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();
      const padding = 16;

      if (imageRect.left < galleryRect.left + padding) {
        gallery.scrollBy({
          left: imageRect.left - galleryRect.left - padding,
          behavior: "smooth",
        });
      } else if (imageRect.right > galleryRect.right - padding) {
        gallery.scrollBy({
          left: imageRect.right - galleryRect.right + padding,
          behavior: "smooth",
        });
      }
    };

    ensureVisible();
    const timeout = window.setTimeout(ensureVisible, 550);
    return () => window.clearTimeout(timeout);
  }, [currentIndex]);

  const moveImage = (direction: -1 | 1) => {
    setCurrentIndex(
      (index) =>
        (index + direction + AI_IMAGE_ITEMS.length) % AI_IMAGE_ITEMS.length,
    );
  };

  return (
    <section className="bg-grain relative isolate overflow-hidden bg-paper text-foreground">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)] md:grid-rows-[minmax(27rem,48svh)_5rem]">
        <aside className="flex min-w-0 flex-col border-black/20 md:border-r">
          <div className="flex items-stretch justify-between border-b border-black/20">
            <div className="min-w-0 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <p className="font-mono text-[10px] tracking-[0.12em] text-foreground/50 uppercase">
                02 / Image collection
              </p>
              <h2 className="mt-2 flex items-center text-3xl leading-none font-bold tracking-[-0.07em] sm:text-4xl">
                <span>AI Font</span>
                <span
                  aria-hidden="true"
                  className="ml-2 -mt-3 size-2 shrink-0 rounded-full bg-signal"
                />
              </h2>
            </div>

            {aiFontMenu && (
              <Link
                href={aiFontMenu.href}
                aria-label="AI Font 자세히 보기"
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

          <div className="hidden min-h-64 flex-1 flex-col p-4 sm:p-5 md:flex md:p-6">
            <div className="relative flex min-h-48 flex-1 flex-col justify-between overflow-hidden border border-black/20 p-4 sm:p-5">
              <span className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
                {previewLanguage === "ko"
                  ? "Image prompt"
                  : "English collection"}
              </span>
              <p className="my-6 min-w-0 text-sm leading-relaxed tracking-[-0.01em] md:line-clamp-7">
                {previewLanguage === "ko"
                  ? `“${currentImage.prompt}”`
                  : "영어 폰트는 아직 없어요."}
              </p>
              <span className="truncate font-mono text-[10px] tracking-[0.06em] text-foreground/45 uppercase">
                {previewLanguage === "ko" ? currentImage.style : "Coming soon"}
              </span>
            </div>

            <div className="grid h-10 grid-cols-2 border-x border-b border-black/20">
              <Button
                type="button"
                variant="ghost"
                onClick={() => moveImage(-1)}
                disabled={previewLanguage === "en"}
                aria-label="이전 이미지"
                className="h-full w-full rounded-none border-0 border-r border-black/20 hover:bg-foreground hover:text-paper"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => moveImage(1)}
                disabled={previewLanguage === "en"}
                aria-label="다음 이미지"
                className="h-full w-full rounded-none border-0 hover:bg-foreground hover:text-paper"
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>

            <div
              className={cn(
                "mt-5 flex items-center justify-between gap-4",
                previewLanguage === "en" && "invisible",
              )}
            >
              <p className="font-mono text-xs text-foreground/60 tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(AI_IMAGE_ITEMS.length).padStart(2, "0")}
              </p>
              <div aria-hidden="true" className="flex gap-1.5">
                {AI_IMAGE_ITEMS.map((image, index) => (
                  <span
                    key={image.src}
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

        <div className="relative min-w-0 md:min-h-0 md:overflow-hidden">
          <div className="flex items-start justify-between gap-3 px-4 py-4 font-mono text-[10px] tracking-[0.08em] text-foreground/55 uppercase sm:px-5 md:absolute md:inset-x-5 md:top-5 md:p-0">
            <span className="md:hidden">Image collection</span>
            <span className="hidden md:inline">Selected work</span>
            {previewLanguage === "ko" && (
              <span className="hidden md:inline">Scroll</span>
            )}
          </div>

          {previewLanguage === "ko" ? (
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:hidden">
              <div className="grid grid-cols-2 gap-3">
                {AI_IMAGE_ITEMS.map((image) => (
                  <figure key={image.src} className="min-w-0">
                    <div className="relative aspect-3/4 overflow-hidden border border-black/20">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 50vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-1.5 min-w-0 text-[10px] leading-relaxed text-foreground/60">
                      <span className="block truncate text-foreground">
                        {image.style}
                      </span>
                      <span className="block truncate">
                        {image.type.join(" · ")}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : (
            <div
              role="status"
              className="flex min-h-64 items-center justify-center px-4 py-12 text-center md:absolute md:inset-0 md:pt-14"
            >
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                영어 폰트는 아직 없어요.
              </p>
            </div>
          )}

          <div
            ref={galleryRef}
            className={cn(
              "absolute inset-x-0 top-14 bottom-0 hidden overflow-x-auto overscroll-x-contain scrollbar-none [&::-webkit-scrollbar]:hidden",
              previewLanguage === "ko" && "md:block",
            )}
          >
            <div className="flex h-full w-max min-w-full items-end gap-3 px-4 pb-4 sm:gap-4 sm:px-5 sm:pb-5 md:w-full">
              {AI_IMAGE_ITEMS.map((image, index) => {
                const isSelected = index === currentIndex;

                return (
                  <Button
                    key={image.src}
                    ref={(element) => {
                      imageRefs.current[index] = element;
                    }}
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${index + 1}번 이미지 선택`}
                    aria-pressed={isSelected}
                    className={cn(
                      "relative aspect-3/4 w-auto shrink-0 overflow-hidden rounded-none border-0 p-0 transition-[width,height] duration-500 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:ring-0 after:ring-foreground after:ring-inset after:content-[''] hover:after:ring-2 focus-visible:after:ring-2",
                      isSelected ? "h-[84%] after:ring-2" : "h-[42%]",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1023px) 40vw, 25vw"
                      className="object-contain"
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full grid min-w-0 border-t border-black/20 md:h-20 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="hidden min-w-0 md:grid md:grid-cols-4">
            <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5 md:py-0">
              <p className="text-[10px] text-foreground/45">Style</p>
              <span
                aria-hidden="true"
                className="my-1.5 w-5 border-t border-black/35"
              />
              <p className="truncate text-xs">
                {previewLanguage === "ko" ? currentImage.style : "—"}
              </p>
            </div>
            <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5 md:py-0">
              <p className="text-[10px] text-foreground/45">Type</p>
              <span
                aria-hidden="true"
                className="my-1.5 w-5 border-t border-black/35"
              />
              <p
                className="truncate text-xs"
                title={
                  previewLanguage === "ko"
                    ? currentImage.type.join(", ")
                    : undefined
                }
              >
                {previewLanguage === "ko" ? currentImage.type.join(" · ") : "—"}
              </p>
            </div>
            <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5 md:py-0">
              <p className="text-[10px] text-foreground/45">Format</p>
              <span
                aria-hidden="true"
                className="my-1.5 w-5 border-t border-black/35"
              />
              <p className="text-xs">
                {previewLanguage === "ko" ? "JPG" : "—"}
              </p>
            </div>
            <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5 md:py-0">
              <p className="text-[10px] text-foreground/45">Collection</p>
              <span
                aria-hidden="true"
                className="my-1.5 w-5 border-t border-black/35"
              />
              <p className="text-xs">
                {previewLanguage === "ko" ? "AI Typography" : "—"}
              </p>
            </div>
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
