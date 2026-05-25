import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Button onClick={() => toast.success('Scaffold OK ✓')}>
        Smoke test
      </Button>
    </div>
  )
}

export default App
