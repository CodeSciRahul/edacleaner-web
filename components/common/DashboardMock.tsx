'use client'

import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

type ScreenId =
  | 'overview'
  | 'smart-scan'
  | 'startup'
  | 'duplicates'
  | 'storage'
  | 'cleanup'
  | 'monitoring'

interface DashboardMockProps {
  screen: ScreenId
  className?: string
}

/** CSS product UI mock matching EdaCleaner desktop chrome */
export function DashboardMock({ screen, className }: DashboardMockProps) {
  const { t } = useTranslation()
  const navItems = [
    t('mock.nav.overview'),
    t('mock.nav.smartScan'),
    t('mock.nav.cleanup'),
    t('mock.nav.storage'),
    t('mock.nav.performance'),
    t('mock.nav.monitoring'),
  ]

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-background via-surface to-primary/[0.06]',
        className,
      )}
    >
      <div className="absolute inset-0 flex">
        {/* Sidebar */}
        <aside className="hidden w-[22%] flex-col border-r border-border/70 bg-sidebar/80 p-3 sm:flex">
          <div className="mb-4 flex items-center gap-2 px-1">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">
              E
            </span>
            <span className="text-[11px] font-semibold">EDA Cleaner</span>
          </div>
          {navItems.map((item, i) => (
              <div
                key={item}
                className={cn(
                  'mb-1 rounded-lg px-2.5 py-2 text-[10px] font-medium',
                    i === activeIndex(screen)
                      ? 'bg-sidebar-active text-sidebar-active-foreground'
                      : 'text-muted-foreground',
                )}
              >
                {item}
              </div>
            ))}
        </aside>

        {/* Main */}
        <div className="flex-1 p-3 sm:p-4">
          <ScreenContent screen={screen} />
        </div>
      </div>

      {/* Soft orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
    </div>
  )
}

function activeIndex(screen: ScreenId) {
  switch (screen) {
    case 'overview':
      return 0
    case 'smart-scan':
      return 1
    case 'cleanup':
      return 2
    case 'storage':
    case 'duplicates':
      return 3
    case 'startup':
      return 4
    case 'monitoring':
      return 5
    default:
      return 0
  }
}

function ScreenContent({ screen }: { screen: ScreenId }) {
  switch (screen) {
    case 'smart-scan':
      return <SmartScanScreen />
    case 'startup':
      return <StartupScreen />
    case 'duplicates':
      return <DuplicatesScreen />
    case 'storage':
      return <StorageScreen />
    case 'cleanup':
      return <CleanupScreen />
    case 'monitoring':
      return <MonitoringScreen />
    default:
      return <OverviewScreen />
  }
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'primary' | 'success' | 'cyan'
}) {
  const toneClass =
    tone === 'success'
      ? 'text-success'
      : tone === 'cyan'
        ? 'text-accent-cyan'
        : 'text-primary'

  return (
    <div className="rounded-xl border border-border/70 bg-card/80 p-3 shadow-card">
      <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={cn('mt-1 text-lg font-semibold tabular-nums tracking-tight', toneClass)}>
        {value}
      </p>
    </div>
  )
}

function OverviewScreen() {
  const { t } = useTranslation()
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              {t('mock.systemStatus')}
            </p>
            <p className="mt-1 text-sm font-semibold">{t('mock.pcGreatShape')}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {t('mock.reclaimedLifetime')}
            </p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/10">
            <span className="text-lg font-bold text-primary">94</span>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground">
            {t('mock.smartScan')}
          </span>
          <span className="rounded-lg border border-border px-3 py-1.5 text-[10px] font-medium">
            {t('mock.optimize')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Metric label={t('mock.cpu')} value="24%" />
        <Metric label={t('mock.ramFree')} value="8.2 GB" tone="cyan" />
        <Metric label={t('mock.diskFree')} value="186 GB" tone="success" />
      </div>
    </div>
  )
}

function SmartScanScreen() {
  const { t } = useTranslation()
  const areas = [
    { name: t('mock.area.cleanup'), detail: t('mock.area.cleanupDetail') },
    { name: t('mock.area.storage'), detail: t('mock.area.storageDetail') },
    { name: t('mock.area.performance'), detail: t('mock.area.performanceDetail') },
    { name: t('mock.area.security'), detail: t('mock.area.securityDetail') },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{t('mock.smartScan')}</p>
          <p className="text-[10px] text-muted-foreground">{t('mock.oneClick')}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
          {t('mock.complete')}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {areas.map((a) => (
          <div
            key={a.name}
            className="rounded-xl border border-border/70 bg-card p-3 shadow-card"
          >
            <p className="text-[11px] font-medium">{a.name}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{a.detail}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-primary px-4 py-2.5 text-center text-[11px] font-semibold text-primary-foreground shadow-glow">
        {t('mock.runSmartScan')}
      </div>
    </div>
  )
}

function StartupScreen() {
  const { t } = useTranslation()
  const apps = [
    { name: 'Cloud Sync', impact: 'High', on: true },
    { name: 'Chat Helper', impact: 'Medium', on: true },
    { name: 'Updater Service', impact: 'Low', on: false },
    { name: 'Music Tray', impact: 'Medium', on: true },
  ]
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{t('mock.startupApps')}</p>
      {apps.map((app) => (
        <div
          key={app.name}
          className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-3 py-2.5"
        >
          <div>
            <p className="text-[11px] font-medium">{app.name}</p>
            <p className="text-[9px] text-muted-foreground">
              {t('mock.impact', { level: app.impact })}
            </p>
          </div>
          <span
            className={cn(
              'h-5 w-9 rounded-full p-0.5 transition',
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
        </div>
      ))}
    </div>
  )
}

function DuplicatesScreen() {
  const { t } = useTranslation()
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{t('mock.duplicates')}</p>
      {[1, 2, 3].map((g) => (
        <div key={g} className="rounded-xl border border-border/70 bg-card p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium">{t('mock.groupCopies', { n: g })}</p>
            <p className="text-[10px] text-primary">+240 MB</p>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="h-10 flex-1 rounded-lg bg-muted" />
            <div className="h-10 flex-1 rounded-lg bg-muted/70" />
            <div className="h-10 flex-1 rounded-lg bg-muted/50" />
          </div>
        </div>
      ))}
    </div>
  )
}

function StorageScreen() {
  const { t } = useTranslation()
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{t('mock.diskAnalyzer')}</p>
      <div className="rounded-xl border border-border/70 bg-card p-4">
        <div className="flex justify-between text-[10px]">
          <span>System · 512 GB</span>
          <span className="text-success">{t('mock.healthy')}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
          <div className="flex h-full">
            <div className="w-[42%] bg-primary" />
            <div className="w-[18%] bg-accent-cyan" />
            <div className="w-[12%] bg-chart-disk" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[9px] text-muted-foreground">
          <span>{t('mock.videos')} 42%</span>
          <span>{t('mock.docs')} 18%</span>
          <span>{t('mock.apps')} 12%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Metric label={t('mock.used')} value="326 GB" />
        <Metric label={t('mock.available')} value="186 GB" tone="success" />
      </div>
    </div>
  )
}

function CleanupScreen() {
  const { t } = useTranslation()
  const cats = [
    t('mock.junkFiles'),
    t('mock.tempFiles'),
    t('mock.browserCache'),
    t('mock.systemCache'),
    t('mock.recycleBin'),
  ]
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{t('mock.cleanup')}</p>
      {cats.map((c, i) => (
        <div
          key={c}
          className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" />
            <span className="text-[11px] font-medium">{c}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{(i + 1) * 0.8} GB</span>
        </div>
      ))}
    </div>
  )
}

function MonitoringScreen() {
  const { t } = useTranslation()
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{t('mock.monitoring')}</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border/70 bg-card p-3">
          <p className="text-[9px] text-muted-foreground">{t('mock.cpuUsage')}</p>
          <p className="text-xl font-semibold text-primary">24%</p>
          <div className="mt-2 flex h-12 items-end gap-0.5">
            {[40, 55, 35, 70, 45, 30, 50, 42, 38, 60, 28, 44].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-3">
          <p className="text-[9px] text-muted-foreground">{t('mock.memory')}</p>
          <p className="text-xl font-semibold text-accent-cyan">52%</p>
          <div className="mt-2 flex h-12 items-end gap-0.5">
            {[50, 48, 52, 55, 51, 49, 53, 56, 52, 50, 54, 51].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-accent-cyan/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
