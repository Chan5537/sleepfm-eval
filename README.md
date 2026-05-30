# SleepFM v2 — Clinician Evaluation Interface (frontend mockup)

A polished, single-page demo of the clinician evaluation task for the SleepFM v2
agentic-evaluation framework (UCLA Health Intelligence Lab). A clinician sees one
case, a clinical query, and two source-blinded responses (A and B),
then completes an 11-pick rubric and submits. This iteration is a **frontend-only
mockup** — no backend, no persistence, no auth — intended as a recruitment artifact
and the visual prototype of the eventual labeling tool.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui · react-markdown +
remark-gfm · sonner. State is a single `useReducer`; there is no router and no
network access.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

> Node 20.19+ or 22.12+ is recommended (Vite prints a warning on older 20.x but
> still builds). If `npm run build` fails with a Rolldown
> `Cannot find module './rolldown-binding.*.node'` error, install your platform's
> native binary explicitly, e.g. `npm i -D @rolldown/binding-darwin-arm64@<rolldown-version>`.

## The rubric

- **Side-by-side preference (3 axes, A or B):** Comprehensiveness, Trustworthiness,
  Specificity. No "Tie" option.
- **Absolute accuracy (4 axes × both responses = 8 Yes/No):** Factuality,
  Reference & Interpretation, Safety, Grounding.

Submit is disabled until all 11 picks are made. Per-axis notes are optional.

## Flow & data

A landing screen → **3 cases** in sequence (with a "Case n of 3" progress
indicator) → a completion screen with **Download JSON / Download CSV** buttons.
There is no backend: progress is saved in the browser's `localStorage`
(`sleepfm-eval-v1`), so a clinician can close the page and resume from the first
unsubmitted case. The CSV/JSON columns mirror the lab's `reviews` schema (one row
per case, including the internal `a_is_agent` un-blinding key used only by the
research team). All state lives in:

- [`src/lib/session.ts`](src/lib/session.ts) — multi-case session reducer.
- [`src/lib/storage.ts`](src/lib/storage.ts) — versioned, fault-tolerant localStorage.
- [`src/lib/export.ts`](src/lib/export.ts) — JSON/CSV builders (RFC-4180 + BOM).

## Updating the demo cases

Edit [`src/data/demo-cases.ts`](src/data/demo-cases.ts) — `DEMO_CASES` drives every
case in the cycle. To flip which response shows as A vs B, swap
`response_left`/`response_right` and the `left_is_agent` flag. If you change case
**content or count**, bump `SCHEMA_VERSION` in `src/lib/session.ts` so stale saved
progress is discarded. Rubric axis labels and help text live in
[`src/lib/rubric-config.ts`](src/lib/rubric-config.ts).

## Blinding — do not regress

The UI must never reveal which response is which arm, nor the agent's internals.
Before deploying, confirm the built artifact + content are clean (word-boundary,
case-sensitive — the `\b` excludes the `tool` inside `tooltip`; lowercase
`react`/`sleepfm` are import identifiers, not visible copy):

```bash
npm run build
# The shipped bundle is the real gate — expect 0 (comments in src/ that document
# the rule are stripped from the build, so audit dist/, not src/):
grep -roE '\b(Agent|Base LLM|GPT|Gemini|SleepFM|ReAct|tool)\b' dist/assets/   # Expect 0
grep -ro 'visualizations' dist/assets/                                        # Expect 0
grep -ro 'If no citations are present, select Yes.' dist/assets/              # Expect present
```

Demo response content lives only in `src/data/demo-cases.ts`; keep all source
labels out of it.

## Deploying to GitHub Pages

Static, backend-free. CI builds and publishes to Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Base path

The site is served at `https://<user>.github.io/<repo-name>/`, so Vite's `base`
must be `'/<repo-name>/'`, read from `VITE_BASE` at build time (default
`'/sleepfm-eval/'`). CI sets it in the workflow:

```yaml
env:
  VITE_BASE: /sleepfm-eval/   # both slashes; must equal the exact repo name
```

### One-time setup

1. Pick a repo name; it must match `VITE_BASE` (default repo: `sleepfm-eval`).
2. From this `app/` directory: `gh repo create <user>/sleepfm-eval --public --source . --remote origin`.
3. `git push -u origin main`.
4. **Settings → Pages → Build and deployment → Source = "GitHub Actions"** (the one un-scriptable click).
5. The workflow runs on push; the deploy job summary shows the live URL.

### Local preview of the production base

```bash
VITE_BASE=/sleepfm-eval/ npm run build && npm run preview
# open http://localhost:4173/sleepfm-eval/
```

### Blank page after deploy?

White page + Console 404s for `/<repo>/assets/index-*.js` means `VITE_BASE` ≠ the
repo name. Fix: set it to exactly `/<repo>/` (both slashes, exact case) and re-run.

### Runtime asset rule

Never hardcode a leading-slash asset/href in TSX; use an ESM `import` or
`import.meta.env.BASE_URL`, or the path breaks under the Pages base.
