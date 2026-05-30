import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { LogoLockup } from '@/components/LogoLockup'
import { AppFooter } from '@/components/AppFooter'
import { SIDE_BY_SIDE_AXES, ABSOLUTE_AXES } from '@/lib/rubric-config'
import { GUIDELINE_DOC_URL, RUBRIC_DOC_URL } from '@/lib/links'
import { DEMO_CASES } from '@/data/demo-cases'

interface Props {
  reviewer: string
  onReviewerChange: (value: string) => void
  onBegin: () => void
}

// Opening screen: task explanation + axis overview (labels imported from
// rubric-config so the audited blinding copy is never retyped) + optional
// initials. The word "tool" never appears; no agent architecture is revealed.
export function LandingScreen({ reviewer, onReviewerChange, onBegin }: Props) {
  const total = DEMO_CASES.length
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10">
        <Card>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <LogoLockup />
            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight">
                Clinician Evaluation Study
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Thank you for taking part. You will review{' '}
                <strong>{total} query–response pairs</strong>. For each, you will see
                a case summary, a clinical query, and <strong>two responses (Response
                A and Response B)</strong>. You will not be told which system produced
                each response.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                For each pair you will record a side-by-side preference on three axes
                and an absolute Yes/No judgment of each response on four accuracy
                axes — <strong>11 selections in total</strong>. Optional comments are
                welcome. The whole study takes about <strong>10–15 minutes</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Side-by-side preference
                </p>
                <ul className="space-y-1 text-sm">
                  {SIDE_BY_SIDE_AXES.map((a) => (
                    <li key={a.key}>{a.label}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Accuracy (each response)
                </p>
                <ul className="space-y-1 text-sm">
                  {ABSOLUTE_AXES.map((a) => (
                    <li key={a.key}>{a.label}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reference materials
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="flex-1 justify-between">
                  <a href={GUIDELINE_DOC_URL} target="_blank" rel="noopener noreferrer">
                    Evaluation guideline
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1 justify-between">
                  <a href={RUBRIC_DOC_URL} target="_blank" rel="noopener noreferrer">
                    Scoring rubric
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                These open in a new tab; you can also reach the rubric from each
                section during the evaluation.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviewer">Your initials (optional)</Label>
              <Input
                id="reviewer"
                value={reviewer}
                onChange={(e) => onReviewerChange(e.target.value)}
                placeholder="e.g. JS"
                className="max-w-[12rem]"
                autoComplete="off"
              />
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Your progress is saved in this browser, so you can close the page and
              resume later.
            </p>

            <Button size="lg" className="w-full sm:w-auto" onClick={onBegin}>
              Begin evaluation
            </Button>
          </CardContent>
        </Card>
      </main>
      <AppFooter />
    </div>
  )
}
