import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "폰트조아의 개인정보 처리방침을 확인해 보세요.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-paper px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] tracking-[0.14em] text-foreground/55 uppercase">
          07 / Privacy
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.07em] sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-foreground/70">
          <p>
            폰트조아는 서비스 개선을 위해 기본적인 방문 통계 및 사용 흐름을 분석할 수 있습니다. 분석 정보는
            개인을 식별할 수 없는 형태로 수집되며, 서비스 운영에 필요한 범위에서만 사용됩니다.
          </p>
          <p>
            사용자가 직접 제공한 이메일, 문의 내용 등은 문의 응대 및 서비스 개선 목적에 한해 보관합니다.
          </p>
          <p>
            본 정책은 법령 및 서비스 운영 정책 변화에 따라 변경될 수 있으며, 변경 시 사이트에 공지합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
