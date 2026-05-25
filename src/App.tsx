import { useReducer } from 'react'
import { toast } from 'sonner'
import { DEMO_CASES } from '@/data/demo-cases'
import { rubricReducer, initialRubricState } from '@/lib/reducer'
import { PatientContextPanel } from '@/components/PatientContextPanel'
import { QueryBubble } from '@/components/QueryBubble'
import { ResponsePair } from '@/components/ResponsePair'
import { SideBySideRubric } from '@/components/SideBySideRubric'
import { AbsoluteRubric } from '@/components/AbsoluteRubric'
import { SubmitBar } from '@/components/SubmitBar'

// Single-case demo. To show a different case, change the index here.
const demoCase = DEMO_CASES[0]

function App() {
  const [state, dispatch] = useReducer(rubricReducer, initialRubricState)

  function handleSubmit() {
    toast.success('Submitted ✓')
    dispatch({ type: 'RESET' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-lg font-semibold tracking-tight">Clinician Evaluation</h1>
          <p className="text-sm text-muted-foreground">
            Review the conversation below and complete the rubric.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-6">
        <PatientContextPanel
          demographics={demoCase.demographics}
          ehrHistory={demoCase.ehr_history}
        />
        <QueryBubble queryText={demoCase.query_text} />
        <ResponsePair
          responseLeft={demoCase.response_left}
          responseRight={demoCase.response_right}
        />
        <SideBySideRubric state={state} dispatch={dispatch} />
        <AbsoluteRubric state={state} dispatch={dispatch} />
      </main>

      <SubmitBar state={state} onSubmit={handleSubmit} />
    </div>
  )
}

export default App
