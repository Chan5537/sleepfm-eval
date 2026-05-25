import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface Props {
  children: string
  className?: string
}

// Renders response markdown with GFM support (bold, italic, lists, tables,
// and footnote citations like [^1]). react-markdown builds a virtual DOM from
// the AST — no dangerouslySetInnerHTML, so this is XSS-safe by default.
export function Markdown({ children, className }: Props) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none prose-headings:font-semibold',
        // Tame the GFM footnote markers and reference section under prose.
        'prose-sup:text-[0.65em] prose-sup:font-medium',
        '[&_.footnotes]:mt-6 [&_.footnotes]:border-t [&_.footnotes]:pt-3 [&_.footnotes]:text-xs [&_.footnotes]:text-muted-foreground',
        '[&_.footnotes_h2]:sr-only',
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
