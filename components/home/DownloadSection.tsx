'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Apple, Download, Monitor } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { Button } from '@/components/ui/button'
import { downloads } from '@/constants/content'
import { cn } from '@/lib/utils'

function PlatformIcon({ id }: { id: string }) {
  if (id === 'macos') return <Apple className="size-6" strokeWidth={1.5} />
  if (id === 'linux') return <Monitor className="size-6" strokeWidth={1.5} />
  return <Monitor className="size-6" strokeWidth={1.5} />
}

export function DownloadSection() {
  return (
    <SectionWrapper id="download" className="border-t border-border/60 bg-surface/40">
      <SectionHeading
        eyebrow="Download"
        title="Get EdaCleaner for your platform"
        description="Native installers for Windows, macOS, and Linux — same premium experience everywhere."
        className="mb-10"
      />

      <MotionStagger className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
        {downloads.map((item, i) => (
          <MotionItem key={item.id}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              className={cn(
                'flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-card',
                i === 0 && 'border-primary/35 shadow-glow',
              )}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PlatformIcon id={item.id} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.requirement}</p>
              <p className="mt-3 text-xs text-muted-foreground/80">{item.file}</p>
              <Button
                asChild
                variant={i === 0 ? 'glow' : 'outline'}
                className="mt-6 w-full"
                size="lg"
              >
                <Link href={item.href}>
                  <Download strokeWidth={1.75} />
                  Download
                </Link>
              </Button>
            </motion.div>
          </MotionItem>
        ))}
      </MotionStagger>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Free plan included with every download. Upgrade anytime from inside the app.
      </p>
    </SectionWrapper>
  )
}
