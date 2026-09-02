import type { Metadata } from "next";

import { APP_CONTACT_EMAIL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${APP_NAME} 개인정보처리방침입니다.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto min-h-[70svh] max-w-3xl px-5 py-16 sm:px-7 sm:py-24">
      <p className="mb-5 font-mono text-[10px] tracking-widest uppercase">
        Policy / Privacy
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Privacy Policy
      </h1>
      <div className="mt-12 space-y-10 text-sm leading-7 text-black/75">
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">수집 및 이용</h2>
          <p>
            {APP_NAME}는 서비스 이용 현황을 이해하고 품질을 개선하기 위해
            Google Analytics를 사용합니다. 이 과정에서 방문 페이지, 브라우저,
            기기와 같은 이용 정보가 처리될 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">외부 서비스</h2>
          <p>
            분석 정보의 처리는 Google의 개인정보 보호정책과 서비스 설정을
            따릅니다. 브라우저 설정이나 Google에서 제공하는 도구를 통해 분석
            데이터 수집을 제한할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">문의</h2>
          <p>
            개인정보 관련 문의는{" "}
            <a className="underline underline-offset-4" href={`mailto:${APP_CONTACT_EMAIL}`}>
              {APP_CONTACT_EMAIL}
            </a>
            으로 보내주세요.
          </p>
        </section>
        <p className="font-mono text-[10px] tracking-widest uppercase text-black/60">
          Effective date · 2026-09-03
        </p>
      </div>
    </article>
  );
}
