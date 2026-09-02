"use client";

import { useEffect, useState } from "react";

const scrambleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789가나다라마바사아자차카타파하!?#%";
const changeInterval = 10000;
const scrambleDuration = 1100;

type ScrambleTextProps = {
  phrases: string[];
};

export default function ScrambleText({ phrases }: ScrambleTextProps) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (phrases.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let phraseIndex = 0;
    let animationFrame = 0;
    let pauseTimer = 0;
    let disposed = false;

    const animatePhrase = (target: string) => {
      const characters = Array.from(target);
      const startedAt = performance.now();
      const duration = scrambleDuration;

      const animate = (now: number) => {
        if (disposed) return;

        const progress = Math.min((now - startedAt) / duration, 1);
        const revealedCharacters = Math.floor(progress * characters.length);

        setText(
          characters
            .map((character, index) => {
              if (/\s/.test(character) || index < revealedCharacters) {
                return character;
              }

              return scrambleCharacters[
                Math.floor(Math.random() * scrambleCharacters.length)
              ];
            })
            .join(""),
        );

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
          return;
        }

        setText(target);
        pauseTimer = window.setTimeout(() => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          animatePhrase(phrases[phraseIndex]);
        }, changeInterval - scrambleDuration);
      };

      animationFrame = requestAnimationFrame(animate);
    };

    pauseTimer = window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      animatePhrase(phrases[phraseIndex]);
    }, changeInterval);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(pauseTimer);
    };
  }, [phrases]);

  return <span className="whitespace-pre-line">{text}</span>;
}
