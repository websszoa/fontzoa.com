import type { Metadata } from "next";

import { APP_CONTACT_EMAIL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `${APP_NAME} 서비스 이용약관입니다.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto min-h-[70svh] max-w-3xl px-5 py-16 sm:px-7 sm:py-24">
      <p className="mb-5 font-mono text-[10px] tracking-widest uppercase">
        Policy / Terms
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Terms of Use
      </h1>
      <div className="mt-12 space-y-10 text-sm leading-7 text-black/75">
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">서비스 안내</h2>
          <p>
            {APP_NAME}는 폰트 탐색과 미리보기를 돕기 위한 정보 서비스를
            제공합니다. 제공되는 정보는 변경될 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">폰트 이용</h2>
          <p>
            각 폰트의 저작권과 이용 조건은 해당 제작사와 배포처에 있습니다.
            다운로드 또는 상업적 이용 전 원 배포처의 최신 라이선스를 반드시
            확인해야 합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">문의</h2>
          <p>
            서비스 관련 문의는{" "}
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
