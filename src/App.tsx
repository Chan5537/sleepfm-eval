import { DEMO_CASES } from '@/data/demo-cases'
import { PatientContextPanel } from '@/components/PatientContextPanel'
import { QueryBubble } from '@/components/QueryBubble'
import { ResponsePair } from '@/components/ResponsePair'

// Single-case demo. To show a different case, change the index here.
const demoCase = DEMO_CASES[0]

function App() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-lg font-semibold tracking-tight">
            Clinician Evaluation
          </h1>
          <p className="text-sm text-muted-foreground">
            Review the conversation below and complete the rubric.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <PatientContextPanel
          demographics={demoCase.demographics}
          ehrHistory={demoCase.ehr_history}
        />
        <QueryBubble queryText={demoCase.query_text} />
        <ResponsePair
          responseLeft={demoCase.response_left}
          responseRight={demoCase.response_right}
        />
      </main>
    </div>
  )
}

export default App
