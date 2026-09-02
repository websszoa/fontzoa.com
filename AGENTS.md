<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI implementation rules

- Use Tailwind CSS v4 canonical utilities whenever an equivalent utility exists. Avoid arbitrary values such as `md:min-h-[390px]` when the current spacing scale supports `md:min-h-97.5`.
- Define repeated project colors and design tokens in the Tailwind theme instead of repeating arbitrary color values in component class names.
- Prefer existing shadcn/ui components for common UI primitives such as buttons, inputs, dialogs, menus, and form controls. Add the matching shadcn/ui component when the project does not have it yet, and customize it through `className` rather than rebuilding the primitive in feature code.
