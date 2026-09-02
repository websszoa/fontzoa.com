import Link from "next/link";

import { footerMenu } from "@/lib/navigation";
import { APP_COPYRIGHT } from "@/lib/constants";

const policyMenu = footerMenu.find((group) => group.title === "Policy");

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-black/20 bg-paper text-ink -mt-px"
    >
      <div className="flex flex-col font-mono text-[10px] tracking-[.06em] uppercase md:flex-row md:items-stretch md:justify-between">
        <p className="px-5 py-5 sm:px-7">{APP_COPYRIGHT}</p>
        <nav
          aria-label="정책"
          className="flex border-t border-black/20 md:border-t-0 md:border-l"
        >
          {policyMenu?.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-1 items-center border-l text-[12px] border-black/20 px-5 py-5 first:border-l-0 hover:text-signal md:flex-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
