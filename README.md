# SleepFM v2 — Clinician Evaluation Interface (frontend mockup)

A polished, single-page demo of the clinician evaluation task for the SleepFM v2
agentic-evaluation framework (UCLA Health Intelligence Lab). A clinician sees one
patient case, the patient's question, and two source-blinded responses (A and B),
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
Submitting shows a confirmation toast and resets the form (no data is stored).

## Updating the demo case

Edit [`src/data/demo-cases.ts`](src/data/demo-cases.ts). `App.tsx` renders
`DEMO_CASES[0]`; point it at a different index to show another case. To flip which
response shows as A vs B, swap `response_left`/`response_right` and the
`left_is_agent` flag — no code change. Rubric axis labels and help text live in
[`src/lib/rubric-config.ts`](src/lib/rubric-config.ts).

## Blinding — do not regress

The UI must never reveal which response is which arm, nor the agent's internals.
Before deploying, confirm the production bundle is clean:

```bash
npm run build
# All of these must print 0:
grep -oF -e Agent -e "Base LLM" -e GPT -e Gemini -e SleepFM -e ReAct dist/assets/*.js | wc -l
grep -oE '\btool\b' dist/assets/*.js | wc -l
grep -oF 'visualizations' dist/assets/*.js | wc -l   # Comprehensiveness help must not say this
```

Demo response content lives only in `src/data/demo-cases.ts`; keep all source
labels out of it.

## Deploy (Vercel)

1. Push this `app/` directory to a GitHub repo.
2. On vercel.com, import the repo. Vercel auto-detects the Vite preset
   (build `npm run build`, output `dist/`). No `vercel.json` is needed — there is
   no client-side router.
3. Deploys run automatically on push to the default branch; share the resulting URL.
