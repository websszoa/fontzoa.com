"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type WebfontUseDialogProps = {
  displayName: string;
  className: string;
  file: string;
  weightValue: number;
};

const GITHUB_FONT_BASE_URL =
  "https://raw.githubusercontent.com/websszoa/fontzoa.com/refs/heads/main/public/fonts/catalog";

export default function WebfontUseDialog({
  displayName,
  className,
  file,
  weightValue,
}: WebfontUseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cssSource, setCssSource] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const openDialog = () => {
    const fontUrl = `${GITHUB_FONT_BASE_URL}/${encodeURIComponent(file)}`;
    const css = `@font-face {
  font-family: "${className}";
  src: url("${fontUrl}") format("woff2");
  font-weight: ${weightValue};
  font-style: normal;
  font-display: swap;
}

.${className} {
  font-family: "${className}", sans-serif;
  font-weight: ${weightValue};
}`;

    setCssSource(css);
    setIsCopied(false);
    setIsOpen(true);
  };

  const copyCssSource = async () => {
    await navigator.clipboard.writeText(cssSource);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setIsCopied(false);
      }}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={openDialog}
        className="h-11 w-full justify-between rounded-none border border-black/20 px-3 hover:bg-foreground hover:text-paper"
      >
        웹폰트로 사용하기
        <Copy aria-hidden="true" className="size-4" />
      </Button>

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-hidden rounded-none border border-black/20 bg-paper p-0 ring-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-black/20 px-4 py-5 pr-14 text-left sm:px-6">
          <p className="font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
            Webfont CSS
          </p>
          <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
            {displayName} 웹폰트 사용하기
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-foreground/55 sm:text-sm">
            아래 CSS를 스타일시트에 붙여 넣고, 사용할 요소에 클래스 이름을
            추가하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
          <ol className="mb-5 grid gap-3 text-xs leading-relaxed sm:grid-cols-2">
            <li className="border border-black/20 p-3">
              <span className="mr-2 font-mono text-[9px] text-signal">01</span>
              CSS 파일에 아래 소스를 붙여 넣습니다.
            </li>
            <li className="border border-black/20 p-3">
              <span className="mr-2 font-mono text-[9px] text-signal">02</span>
              HTML 요소에 <code>{className}</code> 클래스를 추가합니다.
            </li>
          </ol>

          <div className="overflow-hidden border border-black/20 bg-foreground text-paper">
            <div className="flex items-center justify-between border-b border-paper/15 px-3 py-2 font-mono text-[9px] tracking-widest text-paper/50 uppercase">
              <span>CSS</span>
              <span>WOFF2 / {weightValue}</span>
            </div>
            <pre className="max-h-72 overflow-auto p-4 font-mono text-[11px] leading-relaxed whitespace-pre sm:text-xs">
              <code>{cssSource}</code>
            </pre>
          </div>

          <Button
            type="button"
            onClick={copyCssSource}
            className="mt-3 h-11 w-full justify-between rounded-none bg-signal px-4 text-paper hover:bg-foreground"
            aria-live="polite"
          >
            {isCopied ? "복사가 되었습니다." : "CSS 소스 복사하기"}
            {isCopied ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <Copy aria-hidden="true" className="size-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
