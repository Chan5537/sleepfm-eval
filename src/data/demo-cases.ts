import type { DemoCase } from '@/lib/types'

// Hand-authored demo data. App.tsx renders DEMO_CASES[0] only.
//
// CONTENT IS PLACEHOLDER (clinically plausible) — replace response_left /
// response_right with the canonical worked_example_onepager.pdf text before deploy.
//
// SOURCE-BLINDING RULE: response_left / response_right must never contain the
// strings Agent, Base, GPT, Gemini, SleepFM, tool, or ReAct. The A/B assignment
// lives only in `left_is_agent` and is never surfaced in the UI.
//
// To flip which side is shown as A in the demo: swap response_left/response_right
// and flip left_is_agent. No code change needed.

const HSP_001_RESPONSE_A = `Based on your sleep study and current health profile, your data points to an **elevated 6-year risk of developing atrial fibrillation (AF)**. A few findings drive this assessment:

**1. Probable obstructive sleep apnea (OSA).** Your sleep recording shows a breathing-disruption pattern consistent with moderate OSA. Untreated OSA is one of the strongest modifiable risk factors for AF — the repeated overnight drops in oxygen and surges in blood pressure place mechanical and electrical stress on the left atrium.[^1]

**2. Hypertension + OSA together.** You carry a diagnosis of essential hypertension, and the combination of high blood pressure with sleep apnea is associated with meaningfully higher AF incidence than either condition alone.[^2]

**3. Prediabetes.** Impaired glucose metabolism contributes additional, smaller-magnitude risk through atrial remodeling.

**What this means for you.** None of this guarantees you will develop AF — it means your profile sits above average for your age and sex. The encouraging part is that the largest single contributor here, OSA, is treatable. Consistent CPAP therapy in patients with OSA has been associated with a reduction in new-onset and recurrent AF.[^1]

I'd suggest discussing a formal OSA evaluation and blood-pressure optimization with your physician. These are concrete, evidence-backed steps that act directly on the drivers above.

[^1]: January CT, et al. 2019 AHA/ACC/HRS Focused Update on the Management of Patients With Atrial Fibrillation. *Circulation.* 2019.
[^2]: Linz D, et al. Associations of Obstructive Sleep Apnea With Atrial Fibrillation. *J Am Heart Assoc (JAHA).* 2021.`

const HSP_001_RESPONSE_B = `Atrial fibrillation (AF) is the most common sustained heart rhythm disturbance, and several well-established factors raise a person's risk of developing it.

**Common risk factors include:**

- **Older age** — risk rises substantially after age 60.
- **High blood pressure** — long-standing hypertension is a leading contributor.
- **Obesity** — a higher body mass index is associated with greater AF risk.
- **Diabetes or prediabetes** — abnormal glucose handling can affect the heart.
- **Heart disease** — coronary artery disease, valve problems, or prior heart failure.
- **Thyroid problems and excess alcohol** — both can trigger episodes.

Given your background, the factors most relevant to you are likely your blood pressure and weight. Maintaining good blood-pressure control, staying physically active, limiting alcohol, and keeping a healthy weight are the standard recommendations for lowering AF risk.

If you have any symptoms such as palpitations, an irregular pulse, shortness of breath, or lightheadedness, you should bring them to your doctor's attention so they can decide whether further testing is warranted.`

export const DEMO_CASES: DemoCase[] = [
  {
    case_id: 'HSP_synth_001',
    demographics: { age: 58, sex: 'F', bmi: 32.4, race: 'African American' },
    ehr_history: [
      'Essential hypertension (I10)',
      'Hyperlipidemia (E78.5)',
      'Prediabetes (R73.03)',
      'Gastroesophageal reflux disease (K21.9)',
    ],
    query_id: 'q3_reasoning',
    query_text:
      'What is my risk of developing atrial fibrillation, and what in my data supports it?',
    response_left: HSP_001_RESPONSE_A,
    response_right: HSP_001_RESPONSE_B,
    left_is_agent: true,
  },

  // --- Dormant demo cases (not rendered by default) -----------------------
  // To demo one of these, set `const demoCase = DEMO_CASES[1]` in App.tsx.

  {
    case_id: 'HSP_synth_002',
    demographics: { age: 64, sex: 'M', bmi: 29.1, race: 'White' },
    ehr_history: ['Type 2 diabetes mellitus (E11.9)', 'Obesity (E66.9)'],
    query_id: 'q1_general',
    query_text: 'Am I at risk of developing any chronic disease in the future?',
    response_left: `_(placeholder — author a general chronic-disease-risk narrative with citations here)_`,
    response_right: `_(placeholder — author a generic chronic-disease-risk response, no citations here)_`,
    left_is_agent: true,
  },
  {
    case_id: 'HSP_synth_003',
    demographics: { age: 71, sex: 'F', bmi: 34.8, race: 'Hispanic' },
    ehr_history: [
      'Heart failure with preserved ejection fraction (I50.31)',
      'Chronic kidney disease, stage 3 (N18.3)',
      'Essential hypertension (I10)',
    ],
    query_id: 'q5_comprehensive',
    query_text:
      'Based on my sleep findings and current diagnoses, what conditions am I most at risk of developing in the next 6 years, and what changes could reduce that risk?',
    response_left: `_(placeholder — author a multi-disease, action-oriented narrative with citations here)_`,
    response_right: `_(placeholder — author a generic multi-disease response, no citations here)_`,
    left_is_agent: false,
  },
]
