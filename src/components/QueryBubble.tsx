import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Props {
  queryText: string
}

// The query, rendered as a chat message from the person asking — NOT as a form
// field and NOT as a markdown blockquote. The purple "P" avatar makes it
// unambiguous that this is the query being posed.
export function QueryBubble({ queryText }: Props) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-10 shrink-0">
        <AvatarFallback className="bg-purple-200 font-semibold text-purple-800">
          P
        </AvatarFallback>
      </Avatar>
      <div className="rounded-lg rounded-tl-none border border-purple-200 bg-purple-50 px-4 py-3">
        <p className="text-[15px] italic leading-relaxed text-purple-950">
          &ldquo;{queryText}&rdquo;
        </p>
      </div>
    </div>
  )
}
