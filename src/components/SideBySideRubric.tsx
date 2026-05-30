import type { Dispatch } from 'react'
import { Button } from '@/components/ui/button'
import { RubricRow } from '@/components/RubricRow'
import { RubricRefLink } from '@/components/RubricRefLink'
import { SIDE_BY_SIDE_AXES } from '@/lib/rubric-config'
import type { RubricState, RubricAction, RubricPick, SideBySideAxisKey } from '@/lib/types'

interface Props {
  state: RubricState
  dispatch: Dispatch<RubricAction>
}

const NOTE_KEY: Record<SideBySideAxisKey, keyof RubricState> = {
  comprehensiveness: 'comprehensiveness_note',
  trustworthiness: 'trustworthiness_note',
  specificity: 'specificity_note',
}

function ChoiceButton({
  value,
  selected,
  onSelect,
}: {
  value: 'A' | 'B'
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={selected ? 'default' : 'outline'}
      aria-pressed={selected}
      onClick={onSelect}
      className="w-12"
    >
      {value}
    </Button>
  )
}

// Three side-by-side preference axes. Each is an A-or-B pick (no Tie, per
// rubric v2).
export function SideBySideRubric({ state, dispatch }: Props) {
  const chosen = SIDE_BY_SIDE_AXES.filter((a) => state[a.key] !== null).length
  const total = SIDE_BY_SIDE_AXES.length
  return (
    <section className="rounded-lg border bg-card px-4">
      <div className="flex items-start justify-between gap-3 border-b py-3">
        <div>
          <h2 className="text-sm font-semibold">Side-by-side preference</h2>
          <p className="text-xs text-muted-foreground">
            Which response is better on each axis?
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={
              'rounded-full px-2 py-0.5 text-xs font-medium ' +
              (chosen === total
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground')
            }
          >
            {chosen} of {total} chosen
          </span>
          <RubricRefLink />
        </div>
      </div>
      <div className="divide-y">
        {SIDE_BY_SIDE_AXES.map((axis) => {
          const pick = state[axis.key] as RubricPick
          const setPick = (value: 'A' | 'B') =>
            dispatch({ type: 'SET_PICK', axis: axis.key, value })
          return (
            <RubricRow
              key={axis.key}
              axisLabel={axis.label}
              tooltip={axis.tooltip}
              noteValue={state[NOTE_KEY[axis.key]] as string}
              onNoteChange={(value) =>
                dispatch({ type: 'SET_NOTE', axis: NOTE_KEY[axis.key], value })
              }
            >
              <ChoiceButton value="A" selected={pick === 'A'} onSelect={() => setPick('A')} />
              <ChoiceButton value="B" selected={pick === 'B'} onSelect={() => setPick('B')} />
            </RubricRow>
          )
        })}
      </div>
    </section>
  )
}
