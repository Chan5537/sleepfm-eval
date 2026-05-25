import { ResponseCard } from '@/components/ResponseCard'

interface Props {
  responseLeft: string // renders as Response A
  responseRight: string // renders as Response B
}

// Two responses side-by-side on desktop, stacked below 768px. The caption keeps
// the clinician aware that ordering is randomized and source-blinded.
export function ResponsePair({ responseLeft, responseRight }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-xs italic text-muted-foreground">
        Two responses, randomized A/B, source-blinded
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ResponseCard label="A" markdown={responseLeft} />
        <ResponseCard label="B" markdown={responseRight} />
      </div>
    </div>
  )
}
