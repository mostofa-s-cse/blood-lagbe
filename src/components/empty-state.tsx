import type { LucideIcon } from "lucide-react"

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
