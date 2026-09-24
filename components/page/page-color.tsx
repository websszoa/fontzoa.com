"use client";

import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { COLOR_PALETTES } from "@/lib/setting";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "fontzoa-color-palette";
const PALETTE_CHANGE_EVENT = "fontzoa-palette-change";

type PaletteId = (typeof COLOR_PALETTES)[number]["id"];

function getSavedPalette(): PaletteId {
  const savedPalette = localStorage.getItem(STORAGE_KEY);

  return COLOR_PALETTES.find(({ id }) => id === savedPalette)?.id ?? "ink";
}

function subscribeToPaletteChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PALETTE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PALETTE_CHANGE_EVENT, callback);
  };
}

function applyPalette(paletteId: PaletteId) {
  const palette = COLOR_PALETTES.find(({ id }) => id === paletteId);

  if (!palette) return;

  const root = document.documentElement;
  root.style.setProperty("--background", palette.secondary);
  root.style.setProperty("--foreground", palette.primary);
  root.style.setProperty("--card", palette.secondary);
  root.style.setProperty("--card-foreground", palette.primary);
  root.style.setProperty("--popover", palette.secondary);
  root.style.setProperty("--popover-foreground", palette.primary);
  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", palette.secondary);
  root.style.setProperty("--signal", palette.primary);
  root.style.setProperty("--paper", palette.secondary);
  root.style.setProperty("--secondary", palette.secondary);
  root.style.setProperty("--secondary-foreground", palette.primary);
}

export default function PageColor() {
  const selectedPalette = useSyncExternalStore<PaletteId>(
    subscribeToPaletteChange,
    getSavedPalette,
    () => "ink",
  );

  useEffect(() => {
    applyPalette(selectedPalette);
  }, [selectedPalette]);

  const selectPalette = (paletteId: PaletteId) => {
    applyPalette(paletteId);
    localStorage.setItem(STORAGE_KEY, paletteId);
    window.dispatchEvent(new Event(PALETTE_CHANGE_EVENT));
  };

  return (
    <section
      aria-label="사이트 컬러 선택"
      className="border-t border-black/20 bg-paper/90 bg-grain text-foreground backdrop-blur-md"
    >
      <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex h-16 w-max min-w-full snap-x items-center justify-start gap-2 px-4 lg:justify-center">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = palette.id === selectedPalette;

            return (
              <Button
                key={palette.id}
                type="button"
                variant="ghost"
                onClick={() => selectPalette(palette.id)}
                aria-label={`${palette.name} 컬러 조합 선택`}
                aria-pressed={isSelected}
                className={cn(
                  "group relative size-10 shrink-0 snap-start overflow-hidden rounded-none p-0",
                  isSelected
                    ? "border-2 border-foreground"
                    : "border-black/20 ",
                )}
              >
                <span className="absolute inset-0 flex">
                  <span
                    className="h-full w-1/2 transition-[filter] group-hover:brightness-110"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <span
                    className="h-full w-1/2 transition-[filter] group-hover:brightness-95"
                    style={{ backgroundColor: palette.secondary }}
                  />
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
