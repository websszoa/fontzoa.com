"use client";

import { useEffect, useState } from "react";

type FontLoadingProps = {
  total: number;
  onReady: () => void;
};

export default function FontLoading({ total, onReady }: FontLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const finishLoading = () => {
      requestAnimationFrame(() => {
        if (!cancelled) {
          setIsLoading(false);
          onReady();
        }
      });
    };

    if (!("fonts" in document)) {
      finishLoading();
      return () => {
        cancelled = true;
      };
    }

    document.fonts.ready.then(finishLoading, finishLoading);

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-paper px-6 text-ink"
      role="status"
      aria-live="polite"
      aria-label="폰트를 불러오는 중입니다"
    >
      <div className="w-full max-w-sm font-mono uppercase">
        <div className="mb-3 flex items-end justify-between gap-4 text-[10px] tracking-widest">
          <span>Loading font archive</span>
          <span>[{total} faces]</span>
        </div>
        <div className="h-px overflow-hidden bg-black/20">
          <div className="h-full w-2/3 animate-pulse bg-signal" />
        </div>
        <p className="mt-3 text-[9px] tracking-widest text-black/70">
          Downloading typefaces
        </p>
      </div>
    </div>
  );
}
