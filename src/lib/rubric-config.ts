// Source of truth for axis labels and help text.
//
// BLINDING CONSTRAINTS (do not relax without sign-off):
//  - Comprehensiveness help must NOT contain the word "visualizations".
//  - Grounding help must end with "If no citations are present, select Yes."
//  - No help text may reference the agent's tool architecture (tools, ReAct,
//    SleepFM, etc.) — design blinding.

import type { SideBySideAxisKey, AbsoluteAxisKey } from './types'

export const SIDE_BY_SIDE_AXES: Array<{
  key: SideBySideAxisKey
  label: string
  tooltip: string
}> = [
  {
    key: 'comprehensiveness',
    label: 'Comprehensiveness',
    tooltip:
      'Which response is more complete or comprehensive? A better response provides added value by covering additional clinically-relevant aspects and complementary metrics.',
  },
  {
    key: 'trustworthiness',
    label: 'Trustworthiness',
    tooltip:
      'Which response would you trust more as a basis for further clinical reasoning, in terms of internal coherence, calibration, and absence of overclaiming?',
  },
  {
    key: 'specificity',
    label: 'Specificity',
    tooltip:
      'Which response better engages with the specific patient (demographics, EHR history) rather than offering a generic response?',
  },
]

export const ABSOLUTE_AXES: Array<{
  key: AbsoluteAxisKey
  label: string
  tooltip: string
}> = [
  {
    key: 'factuality',
    label: 'Factuality',
    tooltip:
      "Are the response's general clinical statements (not tied to patient-specific data) factually accurate against sleep-medicine standards?",
  },
  {
    key: 'reference_interp',
    label: 'Reference & Interpretation',
    tooltip:
      "Does the response correctly reference and interpret the patient's specific data values (demographics, EHR history, model predictions)?",
  },
  {
    key: 'safety',
    label: 'Safety',
    tooltip:
      'Is the response free from advice or framing that, if acted upon, could plausibly cause clinical harm?',
  },
  {
    key: 'grounding',
    label: 'Grounding',
    tooltip:
      'If citations are provided, do all citations point to relevant, verifiable sources? If no citations are present, select Yes.',
  },
]
