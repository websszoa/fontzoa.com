import type { Metadata } from "next";

import PageWebfont from "@/components/page/page-webfont";
import fontCatalog from "@/data/font-catalog.json";
import "@/app/webfont.css";

export const metadata: Metadata = {
  title: "Web Font",
  description: "폰트조아의 웹폰트를 스타일과 굵기로 살펴보세요.",
};

function getRandomFonts() {
  const fonts = fontCatalog.filter(
    (font) => typeof font.koreanName === "string" && font.koreanName.trim(),
  );

  for (let index = fonts.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [fonts[index], fonts[randomIndex]] = [fonts[randomIndex], fonts[index]];
  }

  return fonts;
}

export default function WebFontPage() {
  return <PageWebfont fonts={getRandomFonts()} />;
}
