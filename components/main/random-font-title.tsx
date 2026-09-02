"use client";

import { useEffect, useRef } from "react";

const titleFontClasses = [
  "fontzoa-dimi-bang",
  "fontzoa-gyeonggi-batang-bold",
  "fontzoa-cafe24-oneprettynight",
  "fontzoa-bm-doh-yeon",
  "fontzoa-nanum-pen-regular",
];

export default function RandomFontTitle() {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = rootRef.current;
    if (!title) return;

    const randomIndex = Math.floor(Math.random() * titleFontClasses.length);
    title.classList.remove(...titleFontClasses);
    title.classList.add(titleFontClasses[randomIndex]);
  }, []);

  return (
    <h1
      ref={rootRef}
      className="fontzoa-dimi-bang max-w-5xl text-[clamp(3.4rem,8.5vw,8.5rem)] leading-[.99] font-light tracking-[-.075em]"
    >
      글자의 표정을
      <br />
      <span className="text-signal">수집합니다.</span>
    </h1>
  );
}
