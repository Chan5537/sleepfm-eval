import { Info } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Props {
  label: string
  text: string
}

// Per-axis help. Implemented as a click/tap Popover toggletip rather than a
// hover Tooltip, because Radix Tooltip does not open on touch and the audience
// may use iPads.
export function AxisHelp({ label, text }: Props) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={`What does ${label} mean?`}
        className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-full"
      >
        <Info className="size-4" />
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-72 text-sm leading-relaxed">
        {text}
      </PopoverContent>
    </Popover>
  )
}
