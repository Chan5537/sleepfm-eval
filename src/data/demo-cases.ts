import type { DemoCase } from '@/lib/types'

// Hand-authored demo data. App cycles through every entry in DEMO_CASES.
//
// CONTENT IS SYNTHETIC but clinically plausible (made-up cases, real guideline
// citations). Edit freely; if you change case content or count, bump
// SCHEMA_VERSION in src/lib/session.ts so stale saved progress is discarded.
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

// --- Case 1 (HSP_synth_002): generic vs. case-specific, cited side is B ---

const HSP_002_GENERIC = `Everyone's long-term health risk depends on a mix of factors, and some general patterns apply broadly.

**Common chronic conditions to be aware of:**

- **Cardiovascular disease** — heart disease and stroke remain leading causes of long-term illness.
- **Type 2 diabetes and its complications** — including effects on the eyes, kidneys, and nerves.
- **Kidney disease** — often develops quietly over years.
- **Joint and mobility problems** — frequently linked to body weight.
- **Sleep-related conditions** — such as disrupted or non-restorative sleep.

**General steps that help.** Staying physically active, eating a balanced diet, maintaining a healthy weight, not smoking, and keeping up with routine check-ups are the standard recommendations for reducing chronic-disease risk over time.

If you have specific concerns, your physician can review your individual history and order any testing that may be appropriate.`

const HSP_002_SPECIFIC = `Looking at your specific profile, your most pressing long-term risks cluster around **cardiometabolic disease** — and the good news is that the main drivers are modifiable.

**1. Cardiovascular disease is your leading long-term risk.** You carry diagnoses of type 2 diabetes and obesity, a combination that substantially raises the risk of coronary artery disease and stroke over the coming years. Diabetes alone roughly doubles cardiovascular risk, and excess weight compounds it through blood pressure and lipid effects.[^1]

**2. Your sleep pattern adds an independent signal.** Your overnight recording shows fragmented sleep with a breathing-disruption pattern. In people with type 2 diabetes, coexisting sleep-disordered breathing is associated with worse glucose control and higher cardiovascular risk, so it is worth a formal evaluation.[^2]

**3. Diabetes-related organ effects.** Sustained high glucose can affect the kidneys, eyes, and nerves over time. Regular monitoring of kidney function (urine albumin and eGFR) and annual eye exams are the standard safeguards.[^2]

**What this means for you.** Your risk is above average, but it is concentrated in areas you can act on: weight reduction, glucose control, and addressing the sleep findings would each move the needle. I'd suggest discussing a structured weight-management plan and a sleep evaluation with your physician.

[^1]: Arnett DK, et al. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. *Circulation.* 2021.
[^2]: American Diabetes Association. Standards of Care in Diabetes — 2024. *Diabetes Care.* 2024.`

// --- Case 2 (HSP_synth_003): case-specific vs. generic, cited side is A ---

const HSP_003_SPECIFIC = `Based on your diagnoses and sleep findings, here are the conditions that most warrant attention over the next several years, along with concrete steps that can reduce each risk.

**1. Worsening heart failure and hospitalization.** You have heart failure with preserved ejection fraction (HFpEF) alongside hypertension. The single highest-yield step is tight blood-pressure control, which is the cornerstone of reducing HFpEF symptoms and admissions. Daily weight tracking and prompt attention to swelling or breathlessness help catch fluid buildup early.[^1]

**2. Progression of chronic kidney disease.** Your stage 3 CKD can advance over time, and it interacts closely with both your heart failure and blood pressure. Avoiding NSAIDs, keeping blood pressure at target, and periodic monitoring of eGFR and urine albumin are the standard protective measures.[^2]

**3. Sleep-disordered breathing.** Your overnight recording shows a breathing-disruption pattern. In heart failure this is common and, when present, addressing it can improve daytime symptoms and cardiac strain — so a formal sleep evaluation is worthwhile.[^1]

**Highest-impact changes for you:** consistent blood-pressure control, a lower-sodium dietary pattern, careful fluid awareness, avoiding kidney-stressing medications, and following up on the sleep findings. Each acts on more than one of the risks above.

[^1]: Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. *Circulation.* 2022.
[^2]: KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD. *Kidney Int.* 2024.`

const HSP_003_GENERIC = `As we get older, the chance of developing additional health conditions naturally increases, especially when some conditions are already present.

**Conditions that become more common with age:**

- **Heart problems** — including worsening of existing heart conditions.
- **Kidney issues** — kidney function can decline gradually over time.
- **High blood pressure complications** — affecting the heart, brain, and kidneys.
- **Reduced mobility and falls** — which can affect independence.
- **Sleep difficulties** — which are common in older adults.

**General advice.** Eating well, staying as active as your condition allows, taking medications as prescribed, limiting salt, and attending regular check-ups are all sensible ways to stay healthy. Keeping in touch with your care team so they can monitor your existing conditions is also important.

Be sure to report any new or worsening symptoms — such as increased shortness of breath, swelling, or unusual tiredness — to your doctor promptly.`

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

  // --- Case 1: general chronic-disease risk; cited side is B -------------
  {
    case_id: 'HSP_synth_002',
    demographics: { age: 64, sex: 'M', bmi: 29.1, race: 'White' },
    ehr_history: ['Type 2 diabetes mellitus (E11.9)', 'Obesity (E66.9)'],
    query_id: 'q1_general',
    query_text: 'Am I at risk of developing any chronic disease in the future?',
    response_left: HSP_002_GENERIC,
    response_right: HSP_002_SPECIFIC,
    left_is_agent: false,
  },

  // --- Case 2: comprehensive multi-disease; cited side is A --------------
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
    response_left: HSP_003_SPECIFIC,
    response_right: HSP_003_GENERIC,
    left_is_agent: true,
  },
]
