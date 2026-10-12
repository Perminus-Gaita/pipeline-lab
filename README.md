# pipeline-lab

A practice repo for learning a full frontend and backend testing pipeline by hand, before automating it with AI agents.

## Stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4
- pnpm
- Storybook 10
- Vitest (`storybook` and `unit` projects)
- GitHub Actions

## Project layout

```
components/       UI components, with stories next to each one
app/api/todos/    Route handler and its unit tests
lib/              In-memory todos store
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

## CI

Three parallel jobs run on every push to `main` and on pull requests:

- Lint, typecheck, build
- Unit tests
- Storybook tests

All three must pass before merging to `main`.

## Roadmap

- Branch protection
- CODEOWNERS
- Chromatic
- Accessibility checks as errors
- Autodocs
- Playwright end-to-end tests
- AGENTS.md rules

## License

MIT. See [LICENSE](LICENSE).
