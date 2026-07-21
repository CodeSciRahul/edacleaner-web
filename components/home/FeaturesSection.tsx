'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { useLenis } from '@/components/layout/SmoothScroll'
import {
  featureCategories,
  features,
  type FeatureCategory,
  type FeatureItem,
} from '@/constants/content'
import { cn } from '@/lib/utils'

const categoryTone: Record<FeatureCategory, string> = {
  cleanup: 'from-primary/20 via-primary/5 to-transparent',
  storage: 'from-accent-cyan/20 via-accent-cyan/5 to-transparent',
  performance: 'from-warning/20 via-warning/5 to-transparent',
  insights: 'from-chart-disk/20 via-chart-disk/5 to-transparent',
}

const categoryAccent: Record<FeatureCategory, string> = {
  cleanup: 'bg-primary text-primary-foreground',
  storage: 'bg-accent-cyan text-white',
  performance: 'bg-warning text-white',
  insights: 'bg-chart-disk text-white',
}

export function FeaturesSection() {
  const { scrollTo } = useLenis()
  const [category, setCategory] = useState<FeatureCategory | 'all'>('all')
  const [activeId, setActiveId] = useState(features[0].id)

  const filtered = useMemo(
    () =>
      category === 'all' ? features : features.filter((f) => f.category === category),
    [category],
  )

  const active = filtered.find((f) => f.id === activeId) ?? filtered[0]

  const onCategory = (id: FeatureCategory | 'all') => {
    setCategory(id)
    const next = id === 'all' ? features[0] : features.find((f) => f.category === id)
    if (next) setActiveId(next.id)
  }

  return (
    <SectionWrapper id="features" className="overflow-hidden">
      <SectionHeading
        eyebrow="Features"
        title="A full toolkit — organized the way you clean"
        description="Explore cleanup, storage, performance, and insights — the same modules that ship in the EdaCleaner desktop app."
        className="mb-10"
      />

      {/* Category filters */}
      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Feature categories"
      >
        {featureCategories.map((cat) => {
          const selected = category === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onCategory(cat.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200',
                selected
                  ? 'border-primary/35 bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'border-border/80 bg-card/80 text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Interactive showcase */}
      <div className="grid overflow-hidden rounded-3xl border border-border/80 bg-card shadow-glass lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        {/* Feature list */}
        <div className="border-b border-border/70 lg:border-b-0 lg:border-r">
          <div className="border-b border-border/60 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {category === 'all' ? 'All tools' : featureCategories.find((c) => c.id === category)?.label}
              <span className="ml-2 tabular-nums text-foreground/50">{filtered.length}</span>
            </p>
          </div>
          <ul
            className="max-h-[22rem] space-y-0.5 overflow-y-auto p-2 scrollbar-thin sm:max-h-[28rem]"
            role="listbox"
            aria-label="Features"
          >
            {filtered.map((feature) => (
              <FeatureListItem
                key={feature.id}
                feature={feature}
                active={active?.id === feature.id}
                onSelect={() => setActiveId(feature.id)}
              />
            ))}
          </ul>
        </div>

        {/* Preview panel */}
        <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col p-6 sm:p-8"
              >
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-br',
                    categoryTone[active.category],
                  )}
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        'flex size-14 items-center justify-center rounded-2xl shadow-sm',
                        categoryAccent[active.category],
                      )}
                    >
                      <active.icon className="size-7" strokeWidth={1.75} />
                    </div>
                    {active.highlight ? (
                      <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
                        {active.highlight}
                      </span>
                    ) : null}
                  </div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {active.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {active.description}
                  </p>

                  <div className="relative mt-8 flex-1">
                    <FeatureVisual feature={active} />
                  </div>

                  <div className="relative mt-6">
                    <Magnetic>
                      <Button
                        variant="glow"
                        size="lg"
                        onClick={() => scrollTo('#download')}
                        className="gap-2"
                      >
                        Try it free
                        <ArrowUpRight strokeWidth={1.75} />
                      </Button>
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Compact highlight strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            features.find((f) => f.id === 'smart-scan'),
            features.find((f) => f.id === 'duplicates'),
            features.find((f) => f.id === 'startup'),
            features.find((f) => f.id === 'monitoring'),
          ] as FeatureItem[]
        ).map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.button
              key={feature.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -3 }}
              onClick={() => {
                setCategory(feature.category)
                setActiveId(feature.id)
              }}
              className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 text-left shadow-card transition-colors hover:border-primary/30 hover:shadow-card-hover"
            >
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  'bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{feature.title}</span>
                <span className="block text-xs text-muted-foreground">{feature.highlight}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

function FeatureListItem({
  feature,
  active,
  onSelect,
}: {
  feature: FeatureItem
  active: boolean
  onSelect: () => void
}) {
  const Icon = feature.icon
  return (
    <li>
      <button
        type="button"
        role="option"
        aria-selected={active}
        onClick={onSelect}
        onMouseEnter={onSelect}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200',
          active
            ? 'bg-primary/10 shadow-sm ring-1 ring-primary/20'
            : 'hover:bg-accent/70',
        )}
      >
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors',
            active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground',
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {feature.title}
          </span>
          <span className="block truncate text-[11px] text-muted-foreground">
            {feature.highlight ?? feature.category}
          </span>
        </span>
        {active ? (
          <motion.span
            layoutId="feature-active-dot"
            className="size-1.5 shrink-0 rounded-full bg-primary"
          />
        ) : null}
      </button>
    </li>
  )
}

/** Lightweight visual mock per feature category / id */
function FeatureVisual({ feature }: { feature: FeatureItem }) {
  if (feature.category === 'cleanup') {
    return (
      <div className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-card backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between text-[11px]">
          <span className="font-medium text-foreground">Reclaimable</span>
          <span className="font-semibold text-primary">4.8 GB</span>
        </div>
        <div className="space-y-2">
          {['Junk Files', 'Temp Data', 'Browser Cache', 'System Cache'].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${70 - i * 12}%` }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-16 text-right text-[10px] text-muted-foreground">{label.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (feature.category === 'storage') {
    return (
      <div className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-card backdrop-blur-sm">
        <div className="mb-3 flex justify-between text-[11px]">
          <span className="font-medium">Disk health</span>
          <span className="font-semibold text-success">Healthy</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="bg-primary"
            initial={{ width: 0 }}
            animate={{ width: '42%' }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="bg-accent-cyan"
            initial={{ width: 0 }}
            animate={{ width: '18%' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.div
            className="bg-chart-disk"
            initial={{ width: 0 }}
            animate={{ width: '12%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
          <span>Videos 42%</span>
          <span>Docs 18%</span>
          <span>Apps 12%</span>
        </div>
      </div>
    )
  }

  if (feature.category === 'performance') {
    return (
      <div className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-card backdrop-blur-sm">
        <p className="mb-3 text-[11px] font-medium text-foreground">Startup impact</p>
        {[
          { name: 'Cloud Sync', on: true },
          { name: 'Chat Helper', on: true },
          { name: 'Updater', on: false },
        ].map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="mb-2 flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2 last:mb-0"
          >
            <span className="text-[11px] font-medium">{app.name}</span>
            <span
              className={cn(
                'h-5 w-9 rounded-full p-0.5',
                app.on ? 'bg-primary' : 'bg-muted',
              )}
            >
              <span
                className={cn(
                  'block size-4 rounded-full bg-white shadow-sm transition',
                  app.on && 'translate-x-4',
                )}
              />
            </span>
          </motion.div>
        ))}
      </div>
    )
  }

  // insights
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-card backdrop-blur-sm">
        <p className="text-[10px] text-muted-foreground">Health score</p>
        <motion.p
          className="mt-1 text-3xl font-bold tabular-nums text-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          94
        </motion.p>
      </div>
      <div className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-card backdrop-blur-sm">
        <p className="text-[10px] text-muted-foreground">CPU</p>
        <div className="mt-2 flex h-10 items-end gap-0.5">
          {[40, 55, 35, 70, 45, 30, 50, 42].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-primary/70"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
