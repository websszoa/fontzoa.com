"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  "a, button, input, textarea, select, label, [role='button']";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (!cursor || !dot || !finePointer.matches) return;

    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...current };
    let animationFrame = 0;

    document.documentElement.classList.add("has-custom-cursor");

    const render = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      animationFrame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      dot.dataset.visible = "true";
      dot.dataset.active = String(
        event.target instanceof Element &&
          Boolean(event.target.closest(interactiveSelector)),
      );
    };

    const handlePointerLeave = () => {
      dot.dataset.visible = "false";
    };

    const handlePointerDown = () => {
      dot.dataset.pressed = "true";
    };

    const handlePointerUp = () => {
      dot.dataset.pressed = "false";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    animationFrame = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-999 hidden size-0 md:block"
      aria-hidden="true"
    >
      <span
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent bg-signal opacity-0 transition-[width,height,background-color,border-color,opacity,scale] duration-300 data-[active=true]:size-10 data-[active=true]:border-signal data-[active=true]:bg-signal/10 data-[pressed=true]:scale-75 data-[visible=true]:opacity-100"
      />
    </div>
  );
}
