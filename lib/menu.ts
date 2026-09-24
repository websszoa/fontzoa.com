export type MenuItem = {
  label: string;
  href: string;
};

export const MAIN_MENU: MenuItem[] = [
  { label: "AI font", href: "/ai-font" },
  { label: "WEB font", href: "/web-font" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_MENU: MenuItem[] = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "License", href: "/license" },
];
