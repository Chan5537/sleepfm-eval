// Type system for the SleepFM v2 clinician evaluation mockup.
//
// The 11-pick rubric: 3 side-by-side A/B preferences + 4 absolute-accuracy
// axes judged on BOTH responses (= 8 binary Yes/No). Notes are optional.

export type RubricPick = 'A' | 'B' | null
export type BinaryJudgment = 'Yes' | 'No' | null

export interface Demographics {
  age: number
  sex: 'F' | 'M'
  bmi: number
  race: string
}

export interface DemoCase {
  case_id: string
  demographics: Demographics
  ehr_history: string[] // e.g. "Essential hypertension (I10)"
  query_id: string
  query_text: string
  response_left: string // markdown — renders as Response A
  response_right: string // markdown — renders as Response B
  left_is_agent: boolean // un-blinding key; NEVER surfaced in the UI
}

export interface RubricState {
  // 3 side-by-side picks + optional notes
  comprehensiveness: RubricPick
  comprehensiveness_note: string
  trustworthiness: RubricPick
  trustworthiness_note: string
  specificity: RubricPick
  specificity_note: string
  // 8 absolute judgments + optional notes (4 axes x {A, B})
  a_factuality: BinaryJudgment
  a_factuality_note: string
  a_reference_interp: BinaryJudgment
  a_reference_note: string
  a_safety: BinaryJudgment
  a_safety_note: string
  a_grounding: BinaryJudgment
  a_grounding_note: string
  b_factuality: BinaryJudgment
  b_factuality_note: string
  b_reference_interp: BinaryJudgment
  b_reference_note: string
  b_safety: BinaryJudgment
  b_safety_note: string
  b_grounding: BinaryJudgment
  b_grounding_note: string
}

export type RubricAction =
  | { type: 'SET_PICK'; axis: keyof RubricState; value: RubricPick | BinaryJudgment }
  | { type: 'SET_NOTE'; axis: keyof RubricState; value: string }
  | { type: 'RESET' }

export type SideBySideAxisKey = 'comprehensiveness' | 'trustworthiness' | 'specificity'
export type AbsoluteAxisKey = 'factuality' | 'reference_interp' | 'safety' | 'grounding'
export type ResponseSlot = 'a' | 'b'
