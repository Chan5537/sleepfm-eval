// Client-side export of the session's ratings to JSON and CSV.
//
// Columns mirror the deferred SQLite `reviews` schema (context doc §10.5) so the
// download ports directly into the lab's analysis pipeline. One row per case
// that the clinician has touched. The export carries the un-blinding key
// (a_is_agent) and is therefore offered ONLY on the completion screen.

import type { SessionState } from './session'
import { SCHEMA_VERSION } from './session'
import { pickCount } from './reducer'
import { DEMO_CASES } from '@/data/demo-cases'

export interface ReviewRow {
  reviewer: string
  case_id: string
  query_id: string
  a_is_agent: boolean
  comprehensiveness_pick: string | null
  comprehensiveness_note: string
  trustworthiness_pick: string | null
  trustworthiness_note: string
  specificity_pick: string | null
  specificity_note: string
  a_factuality: string | null
  a_factuality_note: string
  a_reference_interp: string | null
  a_reference_note: string
  a_safety: string | null
  a_safety_note: string
  a_grounding: string | null
  a_grounding_note: string
  b_factuality: string | null
  b_factuality_note: string
  b_reference_interp: string | null
  b_reference_note: string
  b_safety: string | null
  b_safety_note: string
  b_grounding: string | null
  b_grounding_note: string
  submitted_at: string | null
  duration_seconds: number | null
}

export function buildRows(session: SessionState): ReviewRow[] {
  const rows: ReviewRow[] = []
  session.cases.forEach((c, i) => {
    const touched = pickCount(c.state) > 0 || c.submitted
    if (!touched) return
    const dc = DEMO_CASES[i]
    const s = c.state
    rows.push({
      reviewer: session.reviewer,
      case_id: dc.case_id,
      query_id: dc.query_id,
      a_is_agent: dc.left_is_agent, // un-blinding key — copy, never negate (A === left)
      comprehensiveness_pick: s.comprehensiveness,
      comprehensiveness_note: s.comprehensiveness_note,
      trustworthiness_pick: s.trustworthiness,
      trustworthiness_note: s.trustworthiness_note,
      specificity_pick: s.specificity,
      specificity_note: s.specificity_note,
      a_factuality: s.a_factuality,
      a_factuality_note: s.a_factuality_note,
      a_reference_interp: s.a_reference_interp,
      a_reference_note: s.a_reference_note, // NOTE: a_reference_note, not a_reference_interp_note
      a_safety: s.a_safety,
      a_safety_note: s.a_safety_note,
      a_grounding: s.a_grounding,
      a_grounding_note: s.a_grounding_note,
      b_factuality: s.b_factuality,
      b_factuality_note: s.b_factuality_note,
      b_reference_interp: s.b_reference_interp,
      b_reference_note: s.b_reference_note,
      b_safety: s.b_safety,
      b_safety_note: s.b_safety_note,
      b_grounding: s.b_grounding,
      b_grounding_note: s.b_grounding_note,
      submitted_at: c.submittedAt, // recorded at Submit, never synthesized at export
      duration_seconds: c.durationSeconds,
    })
  })
  return rows
}

export function toJSON(session: SessionState): string {
  return JSON.stringify(
    {
      schema_version: SCHEMA_VERSION,
      exported_at: new Date().toISOString(),
      reviewer: session.reviewer,
      reviews: buildRows(session),
    },
    null,
    2,
  )
}

const COLUMNS: Array<keyof ReviewRow> = [
  'reviewer',
  'case_id',
  'query_id',
  'a_is_agent',
  'comprehensiveness_pick',
  'comprehensiveness_note',
  'trustworthiness_pick',
  'trustworthiness_note',
  'specificity_pick',
  'specificity_note',
  'a_factuality',
  'a_factuality_note',
  'a_reference_interp',
  'a_reference_note',
  'a_safety',
  'a_safety_note',
  'a_grounding',
  'a_grounding_note',
  'b_factuality',
  'b_factuality_note',
  'b_reference_interp',
  'b_reference_note',
  'b_safety',
  'b_safety_note',
  'b_grounding',
  'b_grounding_note',
  'submitted_at',
  'duration_seconds',
]

// RFC-4180: quote any field containing , " CR or LF; double embedded quotes.
// Excel CSV-injection guard: prefix a leading = + - @ with a single quote.
export function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return ''
  let s = String(value)
  if (/^[=+\-@]/.test(s)) s = `'${s}`
  if (/[",\r\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`
  return s
}

export function toCSV(session: SessionState): string {
  const rows = buildRows(session)
  const lines = [COLUMNS.join(',')]
  for (const r of rows) lines.push(COLUMNS.map((c) => escapeCSV(r[c])).join(','))
  return '﻿' + lines.join('\r\n') + '\r\n' // UTF-8 BOM + CRLF terminators
}

export function downloadText(filename: string, mime: string, text: string): void {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename // neutral filename — no source tokens
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
