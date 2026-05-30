import { ExternalLink } from 'lucide-react'
import { RUBRIC_DOC_URL } from '@/lib/links'

// Persistent reference to the full scoring rubric, shown by each rubric section
// header so a clinician can re-check the criteria mid-session without leaving.
export function RubricRefLink() {
  return (
    <a
      href={RUBRIC_DOC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      Rubric
      <ExternalLink className="size-3" />
    </a>
  )
}
