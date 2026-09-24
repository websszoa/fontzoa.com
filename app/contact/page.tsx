import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "폰트조아와 연락하고 문의사항을 남겨보세요.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-paper px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] tracking-[0.14em] text-foreground/55 uppercase">
          05 / Contact
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.07em] sm:text-5xl">
          Contact
        </h1>
        <div className="mt-8 space-y-6 border border-black/20 bg-white/40 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-foreground/70">
            폰트 제안, 협업 문의, 사이트 개선 의견이 있으시면 아래 메일로 편하게 연락해 주세요.
          </p>
          <a
            href="mailto:webstoryboy@naver.com"
            className="inline-flex items-center border border-black/20 px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:bg-foreground hover:text-paper"
          >
            webstoryboy@naver.com
          </a>
        </div>
      </div>
    </main>
  );
}
