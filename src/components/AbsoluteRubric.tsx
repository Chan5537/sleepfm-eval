import type { Dispatch } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AxisHelp } from '@/components/AxisHelp'
import { RubricRefLink } from '@/components/RubricRefLink'
import { ABSOLUTE_AXES } from '@/lib/rubric-config'
import { cn } from '@/lib/utils'
import type {
  RubricState,
  RubricAction,
  BinaryJudgment,
  AbsoluteAxisKey,
  ResponseSlot,
} from '@/lib/types'

interface Props {
  state: RubricState
  dispatch: Dispatch<RubricAction>
}

type PickKey = keyof RubricState
type NoteKey = keyof RubricState

function pickKey(slot: ResponseSlot, axis: AbsoluteAxisKey): PickKey {
  return `${slot}_${axis}` as PickKey
}

// The note fields don't share the axis suffix (e.g. a_reference_note), so map
// them explicitly.
const NOTE_KEYS: Record<ResponseSlot, Record<AbsoluteAxisKey, NoteKey>> = {
  a: {
    factuality: 'a_factuality_note',
    reference_interp: 'a_reference_note',
    safety: 'a_safety_note',
    grounding: 'a_grounding_note',
  },
  b: {
    factuality: 'b_factuality_note',
    reference_interp: 'b_reference_note',
    safety: 'b_safety_note',
    grounding: 'b_grounding_note',
  },
}

function YesNoToggle({
  value,
  onSelect,
}: {
  value: BinaryJudgment
  onSelect: (v: 'Yes' | 'No') => void
}) {
  return (
    <div className="flex gap-1.5">
      <Button
        type="button"
        size="sm"
        variant={value === 'Yes' ? 'default' : 'outline'}
        aria-pressed={value === 'Yes'}
        onClick={() => onSelect('Yes')}
        className={cn(
          'w-14',
          value === 'Yes' && 'bg-green-600 text-white hover:bg-green-700',
        )}
      >
        Yes
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === 'No' ? 'default' : 'outline'}
        aria-pressed={value === 'No'}
        onClick={() => onSelect('No')}
        className={cn('w-14', value === 'No' && 'bg-red-600 text-white hover:bg-red-700')}
      >
        No
      </Button>
    </div>
  )
}

function ResponseCell({
  slot,
  axis,
  state,
  dispatch,
}: {
  slot: ResponseSlot
  axis: AbsoluteAxisKey
  state: RubricState
  dispatch: Dispatch<RubricAction>
}) {
  const pk = pickKey(slot, axis)
  const nk = NOTE_KEYS[slot][axis]
  return (
    <div className="space-y-2 rounded-md border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Response {slot.toUpperCase()}
        </span>
        <YesNoToggle
          value={state[pk] as BinaryJudgment}
          onSelect={(value) => dispatch({ type: 'SET_PICK', axis: pk, value })}
        />
      </div>
      <Textarea
        value={state[nk] as string}
        onChange={(e) => dispatch({ type: 'SET_NOTE', axis: nk, value: e.target.value })}
        placeholder="Comment (optional)"
        className="min-h-0 resize-none text-sm"
        rows={1}
      />
    </div>
  )
}

// Four absolute-accuracy axes, each judged Yes/No on BOTH responses (= 8 picks).
// Applying both arms keeps the clinician blinded and yields a baseline-vs-other
// absolute comparison.
export function AbsoluteRubric({ state, dispatch }: Props) {
  const slots: ResponseSlot[] = ['a', 'b']
  const total = ABSOLUTE_AXES.length * slots.length
  const chosen = ABSOLUTE_AXES.reduce(
    (n, axis) =>
      n + slots.filter((slot) => state[pickKey(slot, axis.key)] !== null).length,
    0,
  )
  return (
    <section className="rounded-lg border bg-card px-4">
      <div className="flex items-start justify-between gap-3 border-b py-3">
        <div>
          <h2 className="text-sm font-semibold">Absolute accuracy</h2>
          <p className="text-xs text-muted-foreground">
            Judge each response on its own. Default to Yes unless a problem applies.
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
        {ABSOLUTE_AXES.map((axis) => (
          <div key={axis.key} className="space-y-3 py-4">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">{axis.label}</span>
              <AxisHelp label={axis.label} text={axis.tooltip} />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ResponseCell slot="a" axis={axis.key} state={state} dispatch={dispatch} />
              <ResponseCell slot="b" axis={axis.key} state={state} dispatch={dispatch} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
