import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MacWindowProps {
  children: ReactNode
  className?: string
  title?: string
}

/** Large Mac-style window chrome for product mockups */
export function MacWindow({ children, className, title = 'EDA Cleaner' }: MacWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/80 bg-card shadow-glass',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[11px] font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="relative bg-background">{children}</div>
    </div>
  )
}
