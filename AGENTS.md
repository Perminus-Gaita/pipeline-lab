<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# pipeline-lab

## Project

A small todo app used to practise a full testing pipeline. Next.js 16 (App Router, no `src/`), TypeScript, Tailwind v4, pnpm, Storybook 10 (`@storybook/nextjs-vite`), Vitest (projects `unit` and `storybook`), Playwright, Chromatic, GitHub Actions. Todos live in an in-memory store on the server.

- `app/`: pages and route handlers (`app/api/todos/route.ts`, unit tests next to it)
- `components/`: UI components, each with a `*.stories.tsx` next to it
- `lib/`: the in-memory todos store
- `e2e/`: Playwright tests
- `.storybook/`: Storybook config (a11y violations fail tests)
- `.github/workflows/ci.yml`: CI; every job is a required check on `main`

## Commands

| Task | Command |
|---|---|
| Install | `pnpm install` |
| Dev server | `pnpm dev` |
| Lint | `pnpm lint` |
| Typegen + typecheck | `pnpm exec next typegen && pnpm exec tsc --noEmit` |
| Unit tests | `pnpm test` |
| Storybook tests | `pnpm test-storybook` |
| E2E tests | `pnpm test:e2e` |
| Build | `pnpm build` |

Full local check, run before every push:

```sh
pnpm lint && pnpm exec next typegen && pnpm exec tsc --noEmit && pnpm test && pnpm test-storybook && pnpm build && pnpm test:e2e
```

## Conventions

- File names are kebab-case: `todo-form.tsx`.
- Stories sit next to their component (`button.stories.tsx`), import types from `@storybook/nextjs-vite`, and use `satisfies Meta<typeof Component>`.
- Every new component gets a story. Every new route handler or store function gets a unit test. Every new user flow gets an E2E test.
- Tests find elements by role and accessible name (`getByRole("button", { name: "Add" })`), never by CSS class or test ID.
- E2E tests share one in-memory store: give each todo a unique title and never depend on test order.

## Workflow

- Create a branch, commit, push and open a PR. Never push to `main` and never force push.
- Run the full local check before pushing.
- Watch CI with `gh pr checks --watch`. Read failures with `gh run view <id> --log-failed`.
- At most 3 fix attempts per failure. Then stop and report what you tried.
- Do not merge PRs.
- No `Co-Authored-By` trailers or other AI attribution in commits or PRs.

## Never do (unless the task explicitly allows it)

- Edit, skip or delete existing tests to make a check pass. No `.skip`, `.only` or `test.fixme`.
- Lower `a11y.test` from `'error'`, add Playwright retries, raise timeouts to hide slowness, or add lint-disable comments.
- Edit `.github/workflows/`, `playwright.config.ts`, `vitest.config.ts`, `.storybook/` or the repo rulesets.
- Accept Chromatic visual changes. A failing UI Tests check means a human reviews the change.
- Read, print or add secrets.
- Add a dependency without explaining why in the PR description.

## Known pitfalls

- Locally, `pnpm test:e2e` reuses any server already listening on port 3000. If tests see an old page or the API returns 500, check `ss -ltnp | grep ':3000'` and stop the stale process. In CI this cannot happen: `CI=true` turns off server reuse, so Playwright starts its own (`pnpm start` on the build).
- On a clean checkout, run `next typegen` before `tsc`, or the `LayoutProps` types are missing.
- After `pnpm install` changes `node_modules`, restart the dev server. A long-running `next dev` keeps serving from deleted files and returns 500s (check `.next/dev/logs/next-development.log` for `ENOENT`). Next 16 allows only one dev server per project, so you cannot start a second one on another port.
- `typescript` is intentionally aliased to TS 6 (`npm:@typescript/typescript6`), and `@typescript/native` is TS 7, which provides `tsc`. This is because typescript-eslint does not support TS 7 yet. Do not "fix" the alias.
- pnpm's `minimumReleaseAge` blocks packages published less than a day ago. Use the previous version; never add `minimumReleaseAgeExclude` entries.
- `pnpm peers check` warns that eslint-plugin-react, -import and -jsx-a11y want ESLint 9. This is expected; their rules were verified to work under ESLint 10.
