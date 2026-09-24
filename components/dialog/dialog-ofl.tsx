"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function OflDialog({ license }: { license: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex w-full min-w-0 items-center justify-between gap-2">
        <span className="min-w-0 wrap-break-word">{license}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="SIL 오픈 폰트 라이선스 정보 보기"
          className="-mr-1 size-6 shrink-0 rounded-full text-foreground/40 hover:bg-foreground hover:text-paper"
        >
          <Info aria-hidden="true" className="size-3.5" />
        </Button>
      </div>

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-hidden rounded-none border border-black/20 bg-paper p-0 ring-0 sm:max-w-lg">
        <DialogHeader className="border-b border-black/20 px-4 py-5 pr-14 text-left sm:px-6">
          <p className="font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
            License guide
          </p>
          <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
            SIL 오픈 폰트 라이선스
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-foreground/55 sm:text-sm">
            OFL 폰트를 사용할 때 알아두면 좋은 핵심 내용입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
          <ul className="grid gap-3 text-sm leading-relaxed">
            <li className="border border-black/20 p-4">
              웹사이트, 앱, 영상, 인쇄물, 로고 등 개인·상업 작업에 사용할 수
              있습니다.
            </li>
            <li className="border border-black/20 p-4">
              폰트를 수정하거나 다른 소프트웨어와 함께 재배포할 수 있습니다.
              재배포할 때는 저작권과 라이선스 정보를 유지해야 합니다.
            </li>
            <li className="border border-black/20 p-4">
              폰트 파일만 단독으로{" "}
              <span className="underline decoration-signal decoration-1 underline-offset-4">
                판매할 수 없으며
              </span>
              , 지정된 예약 글꼴 이름이 있다면 수정본의 이름에{" "}
              <span className="underline decoration-signal decoration-1 underline-offset-4">
                사용할 수 없습니다.
              </span>
            </li>
            <li className="border border-black/20 p-4">
              폰트를 사용해 만든 문서나 디자인 결과물에 OFL을 적용할 필요는
              없습니다.
            </li>
          </ul>

          <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
            이 안내는 이해를 돕기 위한 요약이며, 정확한 조건은 해당 폰트에
            포함된 라이선스와 공식 원문을 확인해 주세요.
            <a
              href="https://openfontlicense.org/open-font-license-official-text/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-2 border-b border-black hover:bg-foreground hover:text-paper"
            >
              OFL 1.1 공식 원문 보기
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
