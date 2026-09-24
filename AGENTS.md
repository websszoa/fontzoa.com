<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- UI 컴포넌트는 shadcn/ui를 기준으로 작업한다. 필요한 컴포넌트가 `components/ui/`에 없으면 `npx shadcn@latest add <component>`로 설치하고, 설치 명령을 README.md에 기록한다.
- 전역 페이지 메뉴는 하드코딩하지 않고 `lib/menu.ts`의 `MAIN_MENU`에서 관리한다.
