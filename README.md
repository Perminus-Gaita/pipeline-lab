# pipeline-lab

A practice repo for learning a full frontend and backend testing pipeline by hand, before automating it with AI agents.

## Stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4
- pnpm
- Storybook 10
- Vitest (`storybook` and `unit` projects)
- Playwright (end-to-end tests)
- Chromatic (visual tests)
- GitHub Actions

## Project layout

```
components/       UI components, with stories next to each one
app/api/todos/    Route handler and its unit tests
lib/              In-memory todos store
e2e/              Playwright end-to-end tests
```

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests (Vitest `unit` project) |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm build-storybook` | Build a static Storybook |
| `pnpm test-storybook` | Run story tests (Vitest `storybook` project) |
| `pnpm test:e2e` | Run Playwright end-to-end tests |
| `pnpm test:e2e:ui` | Open Playwright UI mode, slowed down so you can follow along |

## CI

Five parallel jobs run on every push to `main` and on pull requests:

- Lint, typecheck, build
- Unit tests
- Storybook tests
- Chromatic
- E2E tests

Lint, typecheck, build, Unit tests, Storybook tests and E2E tests are required checks on `main`, along with Chromatic's UI Tests check.

## Roadmap

- CODEOWNERS

## License

MIT. See [LICENSE](LICENSE).
