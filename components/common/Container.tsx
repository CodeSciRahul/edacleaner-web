import { cn } from '@/lib/utils'
import type { ContainerProps } from '@/types'

const widthMap = {
  default: 'max-w-site',
  narrow: 'max-w-narrow',
} as const

export function Container({
  children,
  className,
  as: Comp = 'div',
  narrow = false,
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        'mx-auto w-full',
        narrow ? widthMap.narrow : widthMap.default,
        'px-[var(--gutter)]',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
