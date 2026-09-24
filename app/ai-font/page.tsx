import type { Metadata } from "next";

import PageAiFont from "@/components/page/page-ai-font";

export const metadata: Metadata = {
  title: "AI Font",
  description: "폰트조아의 AI 타이포그래피 이미지를 타입과 스타일로 살펴보세요.",
};

export default function AiFontPage() {
  return <PageAiFont />;
}
