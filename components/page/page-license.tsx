"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  LICENSE_ARTICLES,
  LICENSE_DESCRIPTION,
} from "@/lib/terms";

export default function PageLicense() {
  const [activeArticleId, setActiveArticleId] = useState(
    LICENSE_ARTICLES[0]?.id ?? "",
  );
  const contentsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const updateActiveArticle = () => {
      const activeArticle = LICENSE_ARTICLES.reduce((current, article) => {
        const element = document.getElementById(article.id);

        return element && element.getBoundingClientRect().top <= 180
          ? article
          : current;
      }, LICENSE_ARTICLES[0]);

      if (activeArticle) setActiveArticleId(activeArticle.id);
    };

    updateActiveArticle();
    window.addEventListener("scroll", updateActiveArticle, { passive: true });

    return () => window.removeEventListener("scroll", updateActiveArticle);
  }, []);

  useEffect(() => {
    const contents = contentsRef.current;
    const activeLink = contents?.querySelector<HTMLElement>(
      `[data-article-id="${activeArticleId}"]`,
    );

    if (!contents || !activeLink) return;

    const linkTop = activeLink.offsetTop;
    const linkBottom = linkTop + activeLink.offsetHeight;
    const visibleTop = contents.scrollTop;
    const visibleBottom = visibleTop + contents.clientHeight;

    if (linkTop < visibleTop || linkBottom > visibleBottom) {
      contents.scrollTo({
        top: linkTop - contents.clientHeight / 2 + activeLink.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeArticleId]);

  return (
    <main className="flex-1 bg-paper text-foreground">
      <section className="bg-grain relative isolate">
        <div className="relative z-10 grid min-w-0 md:grid-cols-[minmax(15rem,26%)_minmax(0,1fr)]">
          <aside className="min-w-0 border-black/20 md:border-r">
            <div className="border-b border-black/20 px-4 py-5 sm:px-5 md:px-6 md:py-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/50 uppercase hover:text-signal"
              >
                <ArrowLeft aria-hidden="true" className="size-3.5" />
                Back to home
              </Link>
              <h1 className="mt-3 break-keep text-4xl font-bold leading-[0.95] tracking-[-0.07em] sm:text-5xl">
                License Guide
              </h1>
              <p className="mt-4 break-keep text-sm leading-6 text-foreground/65">
                {LICENSE_DESCRIPTION}
              </p>
            </div>

            <div className="hidden md:sticky md:top-16 md:block md:p-6">
              <nav aria-label="라이선스 정책 목차" className="mt-4">
                <p className="mb-3 font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                  Contents
                </p>
                <ol
                  ref={contentsRef}
                  className="max-h-[calc(100vh-14rem)] overflow-y-auto border-t border-black/20 overscroll-contain"
                >
                  {LICENSE_ARTICLES.map((article, index) => (
                    <li key={article.id} className="border-b border-black/20">
                      <a
                        href={`#${article.id}`}
                        data-article-id={article.id}
                        aria-current={activeArticleId === article.id ? "location" : undefined}
                        onClick={() => setActiveArticleId(article.id)}
                        className={cn(
                          "group flex items-center gap-3 border-l-2 border-transparent py-3 pr-2 pl-3 text-xs leading-5 transition-colors hover:text-signal",
                          activeArticleId === article.id &&
                            "border-signal bg-signal/8 text-signal",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[9px] text-foreground/35",
                            activeArticleId === article.id && "text-signal",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">{article.title}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className={cn(
                            "size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                            activeArticleId === article.id && "opacity-100",
                          )}
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <header className="border-b border-black/20 px-4 py-10 sm:px-6 md:px-10 md:py-8 lg:px-14">
              <p className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
                FontZoa License Document
              </p>
              <p className="mt-5 max-w-6xl break-keep text-xl leading-8 tracking-tight sm:text-3xl sm:leading-9">
                라이선스 정책
              </p>
            </header>

            {LICENSE_ARTICLES.map((article) => (
              <section
                id={article.id}
                key={article.id}
                className="scroll-mt-24 border-b border-black/20 px-4 py-9 last:border-b-0 sm:px-6 md:px-10 md:py-12 lg:px-14"
              >
                <div className="max-w-6xl">
                  <h2 className="break-keep text-xl tracking-tight sm:text-2xl">
                    {article.title}
                  </h2>
                  <div className="mt-5 min-w-0 space-y-4 wrap-break-word text-sm leading-7 text-foreground/70 sm:text-[15px]">
                    {article.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="break-keep">{paragraph}</p>
                    ))}
                    {article.items && (
                      <ol className="space-y-2 pl-5 marker:font-mono marker:text-xs marker:text-signal [&>li]:list-decimal [&>li]:pl-1">
                        {article.items.map((item) => (
                          <li key={item} className="break-keep">{item}</li>
                        ))}
                      </ol>
                    )}
                    {article.closingParagraphs?.map((paragraph) => (
                      <p key={paragraph} className="break-keep">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
