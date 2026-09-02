import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { APP_CONTACT_EMAIL } from "@/lib/constants";

export default function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-black/20 bg-paper/90 backdrop-blur-md"
    >
      <div className="grid h-16 grid-cols-[1fr_auto] items-stretch md:h-18 md:grid-cols-[1fr_180px_180px]">
        <Link
          href="/"
          className="flex items-center px-4 text-[25px] tracking-[-0.06em] sm:px-6 lg:px-8"
        >
          <span className="font-line">fontzoa</span>
          <span
            className="ml-1 -mt-1 size-2 rounded-full bg-signal"
            aria-hidden="true"
          />
        </Link>
        <a
          href="#font-archive"
          className="hidden items-center justify-between border-l border-black/20 px-5 font-mono text-[11px] tracking-[.08em] uppercase transition-colors hover:bg-signal hover:text-white md:flex"
        >
          Archive <span>↘</span>
        </a>
        <a
          href={`mailto:${APP_CONTACT_EMAIL}`}
          className="flex items-center gap-3 border-l border-black/20 px-4 font-mono text-[11px] tracking-[.08em] text-signal uppercase transition-colors hover:bg-signal hover:text-white sm:px-6 md:justify-between md:px-5"
        >
          Contact <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </header>
  );
}
