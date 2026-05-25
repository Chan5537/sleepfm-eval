import type { ReactNode } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { AxisHelp } from '@/components/AxisHelp'

interface Props {
  axisLabel: string
  tooltip: string
  children: ReactNode // the controls (A/B buttons, or Yes/No columns)
  noteValue: string
  onNoteChange: (value: string) => void
}

// Generic rubric row: label + help popover, a controls slot, and an optional
// comment box. Used by both the side-by-side and absolute rubrics.
export function RubricRow({ axisLabel, tooltip, children, noteValue, onNoteChange }: Props) {
  return (
    <div className="space-y-3 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{axisLabel}</span>
          <AxisHelp label={axisLabel} text={tooltip} />
        </div>
        <div className="flex shrink-0 items-center gap-6">{children}</div>
      </div>
      <Textarea
        value={noteValue}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="Comment (optional)"
        className="min-h-0 resize-none bg-background text-sm"
        rows={1}
      />
    </div>
  )
}
