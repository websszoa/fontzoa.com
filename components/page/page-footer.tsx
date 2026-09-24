import Link from "next/link";

import { APP_COPYRIGHT } from "@/lib/constants";
import { FOOTER_MENU } from "@/lib/menu";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-black/20 bg-paper bg-grain text-ink -mt-px"
    >
      <div className="flex flex-col font-mono text-[10px] tracking-[.06em] uppercase md:flex-row md:items-stretch md:justify-between">
        <p className="order-last px-5 py-5 text-center sm:px-7 md:order-first md:text-left">
          {APP_COPYRIGHT}
        </p>
        <nav
          aria-label="정책"
          className="flex border-b border-black/20 md:border-b-0 md:border-l"
        >
          {FOOTER_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 items-center justify-center border-l border-black/20 px-5 py-5 text-[12px] first:border-l-0 hover:text-signal md:flex-none md:justify-start"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
