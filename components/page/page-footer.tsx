import Link from "next/link";
import { Mail } from "lucide-react";
import { footerMenu } from "@/lib/navigation";
import {
  APP_CONTACT_EMAIL,
  APP_COPYRIGHT,
  APP_DESCRIPTION,
  APP_GITHUB_URL,
  APP_NAME,
  APP_SLOGAN,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label={`${APP_NAME} 홈`}
              className="font-line text-2xl"
            >
              fontzoa
            </Link>
            <p className="mt-5 leading-6 text-muted-foreground break-keep">
              {APP_DESCRIPTION}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={APP_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="FontZoa GitHub"
                className="flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 fill-current"
                >
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
                </svg>
              </a>
              <a
                href={`mailto:${APP_CONTACT_EMAIL}`}
                aria-label="FontZoa 이메일"
                className="flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerMenu.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-line">{group.title}</h2>
                <ul className="mt-4 font-line space-y-2">
                  {group.links.map((link) => {
                    const isExternal = link.href.startsWith("http");

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-1.5 border-t pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:gap-3 sm:text-left">
          <p>{APP_COPYRIGHT}</p>
          <p>{APP_SLOGAN}</p>
        </div>
      </div>
    </footer>
  );
}
