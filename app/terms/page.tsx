import type { Metadata } from "next";

import PageTerms from "@/components/page/page-terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "폰트조아의 서비스 이용약관을 확인해 보세요.",
};

export default function TermsPage() {
  return <PageTerms />;
}
