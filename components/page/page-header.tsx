import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MAIN_MENU } from "@/lib/menu";

export default function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-black/20 bg-paper/90 bg-grain backdrop-blur-md"
    >
      <div className="flex h-16 items-stretch">
        <Link
          href="/"
          className="flex items-center px-4 text-[25px] tracking-[-0.06em] sm:px-6"
        >
          <span>fontzoa</span>
          <span
            className="ml-1 -mt-1 size-2 rounded-full bg-signal"
            aria-hidden="true"
          />
        </Link>

        <nav className="ml-auto flex items-stretch">
          {MAIN_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 border-l border-black/20 px-5 font-mono text-[11px] tracking-[.08em] uppercase hover:bg-signal hover:text-white"
            >
              {item.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:rotate-45"
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
