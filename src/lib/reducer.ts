import type { RubricState, RubricAction } from './types'

export const initialRubricState: RubricState = {
  comprehensiveness: null,
  comprehensiveness_note: '',
  trustworthiness: null,
  trustworthiness_note: '',
  specificity: null,
  specificity_note: '',
  a_factuality: null,
  a_factuality_note: '',
  a_reference_interp: null,
  a_reference_note: '',
  a_safety: null,
  a_safety_note: '',
  a_grounding: null,
  a_grounding_note: '',
  b_factuality: null,
  b_factuality_note: '',
  b_reference_interp: null,
  b_reference_note: '',
  b_safety: null,
  b_safety_note: '',
  b_grounding: null,
  b_grounding_note: '',
}

// The 11 pick keys that gate submission. Notes are intentionally excluded.
export const PICK_KEYS: Array<keyof RubricState> = [
  'comprehensiveness',
  'trustworthiness',
  'specificity',
  'a_factuality',
  'a_reference_interp',
  'a_safety',
  'a_grounding',
  'b_factuality',
  'b_reference_interp',
  'b_safety',
  'b_grounding',
]

export function rubricReducer(state: RubricState, action: RubricAction): RubricState {
  switch (action.type) {
    case 'SET_PICK':
      return { ...state, [action.axis]: action.value }
    case 'SET_NOTE':
      return { ...state, [action.axis]: action.value }
    case 'RESET':
      return initialRubricState
    default:
      return state
  }
}

/** Number of the 11 required picks that have been made. */
export function pickCount(state: RubricState): number {
  return PICK_KEYS.reduce((n, key) => (state[key] !== null ? n + 1 : n), 0)
}

/** True iff all 11 picks are non-null. Notes remain optional. */
export function isComplete(state: RubricState): boolean {
  return PICK_KEYS.every((key) => state[key] !== null)
}
