import { cn } from '@/lib/utils'

/** Subtle animated background grid — CSS only for performance */
export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div className="eda-grid absolute inset-0 opacity-[0.35] dark:opacity-[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}
