import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import type { Demographics } from '@/lib/types'

interface Props {
  demographics: Demographics
  ehrHistory: string[]
}

function DemographicItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

// Collapsible reference panel, expanded by default. Shows what the clinician
// is allowed to see about the patient — demographics + coded EHR history.
// Deliberately holds no PSG signal or sleep-derived metrics.
export function PatientContextPanel({ demographics, ehrHistory }: Props) {
  const { age, sex, bmi, race } = demographics
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="patient-context"
      className="rounded-lg border bg-card px-4"
    >
      <AccordionItem value="patient-context" className="border-none">
        <AccordionTrigger className="text-sm font-semibold">
          Patient context
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <DemographicItem label="Age" value={`${age}`} />
            <DemographicItem label="Sex" value={sex} />
            <DemographicItem label="BMI" value={bmi.toFixed(1)} />
            <DemographicItem label="Race" value={race} />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              EHR history
            </span>
            <div className="flex flex-wrap gap-2">
              {ehrHistory.map((dx) => (
                <Badge key={dx} variant="secondary" className="font-normal">
                  {dx}
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
