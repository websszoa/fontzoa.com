export const headerMenu = [{ label: "Search", href: "/search" }] as const;

export const footerMenu = [
  {
    title: "Service",
    links: [
      { label: "폰트 검색", href: "/search" },
      { label: "폰트 리스트", href: "/list" },
      { label: "쇼케이스", href: "/showcase" },
      { label: "API", href: "/api" },
    ],
  },
  {
    title: "Guide",
    links: [
      { label: "폰트 라이선스", href: "/license" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "문의하기", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/fontzoa_official",
      },
      { label: "Threads", href: "https://www.threads.com/@fontzoa_official" },
      { label: "GitHub", href: "https://github.com/webstoryboy" },
    ],
  },
  {
    title: "Policy",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
] as const;
