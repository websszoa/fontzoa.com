import type { Metadata } from "next";

import PageLicense from "@/components/page/page-license";

export const metadata: Metadata = {
  title: "License",
  description: "폰트조아의 라이선스 정책과 콘텐츠 이용조건을 확인해 보세요.",
};

export default function LicensePage() {
  return <PageLicense />;
}
