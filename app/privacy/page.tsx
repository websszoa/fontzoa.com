import type { Metadata } from "next";

import PagePrivacy from "@/components/page/page-privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "폰트조아의 개인정보처리방침을 확인해 보세요.",
};

export default function PrivacyPage() {
  return <PagePrivacy />;
}
