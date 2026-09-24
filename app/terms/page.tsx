import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "폰트조아의 서비스 이용 약관을 확인해 보세요.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-paper px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] tracking-[0.14em] text-foreground/55 uppercase">
          06 / Terms
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.07em] sm:text-5xl">
          Terms of Service
        </h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-foreground/70">
          <p>
            본 서비스는 폰트 정보 탐색 및 미리보기 제공을 목적으로 운영됩니다. 사용자는 본 서비스를
            합법적이고 적법한 목적에 한해 이용해야 하며, 타인의 권리를 침해하는 행위를 해서는 안 됩니다.
          </p>
          <p>
            제공되는 폰트 메타 정보, 라이선스 표기, 다운로드 안내 및 관련 콘텐츠는 참고용으로 제공되며,
            실제 사용 전 각 폰트의 공식 라이선스와 제공처를 반드시 확인해 주세요.
          </p>
          <p>
            서비스 운영자는 사전 공지 없이 기능, 콘텐츠, 디자인, 경로를 변경하거나 중단할 수 있습니다.
          </p>
        </div>
      </div>
    </main>
  );
}
