import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageWebfontDetail from "@/components/page/page-webfont-detail";
import fontCatalog from "@/data/font-catalog.json";
import fontQuotes from "@/data/font-quotes.json";
import "@/app/webfont.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return fontCatalog.map((font) => ({ slug: font.className }));
}

export async function generateMetadata({
  params,
}: PageProps<"/web-font/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const font = fontCatalog.find((item) => item.className === slug);

  if (!font) return {};

  const displayName = font.koreanName || font.name;

  return {
    title: `${displayName} 웹폰트`,
    description: `${displayName} 폰트를 다양한 크기와 문장으로 미리 확인해 보세요.`,
  };
}

export default async function WebFontDetailPage({
  params,
}: PageProps<"/web-font/[slug]">) {
  const { slug } = await params;
  const font = fontCatalog.find((item) => item.className === slug);

  if (!font) notFound();

  return (
    <PageWebfontDetail
      font={font}
      initialScaleText={fontQuotes.previewQuotes[0]}
    />
  );
}
