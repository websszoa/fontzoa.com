import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License",
  description: "폰트별 라이선스 정보를 확인하고 사용 조건을 점검해 보세요.",
};

export default function LicensePage() {
  return (
    <main className="flex-1 bg-paper px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] tracking-[0.14em] text-foreground/55 uppercase">
          08 / License
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.07em] sm:text-5xl">
          License
        </h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-foreground/70">
          <p>
            폰트조아에 소개된 각 폰트는 제작사 또는 배포자의 라이선스 조건을 기준으로 안내합니다.
            상업적 사용, 수정, 재배포, 웹 사용 여부는 각 폰트의 공식 라이선스를 우선 확인해 주세요.
          </p>
          <p>
            일부 폰트는 OFL(Open Font License) 또는 별도 라이선스 조건을 적용하며, 본 서비스는 사용 편의를
            위해 핵심 내용을 요약해 전달합니다.
          </p>
          <p>
            최종적인 사용 여부 판단은 공식 문서와 배포자의 안내를 기준으로 진행하는 것을 권장합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
