'use client'

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Apple, Download, Loader2, Monitor } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { Button } from '@/components/ui/button'
import { downloads } from '@/constants/content'
import { cn } from '@/lib/utils'
import {
  fetchDownloadUrl,
  fetchLatestVersion,
  formatBytes,
  type LatestVersion,
  type LatestVersionFile,
  type ReleaseArchitecture,
  type ReleasePlatform,
} from '@/lib/api'

function PlatformIcon({ id }: { id: string }) {
  if (id === 'macos') return <Apple className="size-6" strokeWidth={1.5} />
  if (id === 'linux') return <Monitor className="size-6" strokeWidth={1.5} />
  return <Monitor className="size-6" strokeWidth={1.5} />
}

function pickFileForPlatform(
  files: LatestVersionFile[],
  platform: ReleasePlatform,
): LatestVersionFile | undefined {
  const matches = files.filter((file) => file.platform === platform)
  if (matches.length === 0) return undefined

  return (
    matches.find((file) => file.latest) ??
    matches.find((file) => file.architecture === 'x64') ??
    matches[0]
  )
}

function detectPreferredPlatform(): ReleasePlatform {
  if (typeof navigator === 'undefined') return 'windows'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'windows'
}

export function DownloadSection() {
  const [latest, setLatest] = useState<LatestVersion | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loadingLatest, setLoadingLatest] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [preferredPlatform, setPreferredPlatform] = useState<ReleasePlatform>('windows')
  const [, startTransition] = useTransition()

  useEffect(() => {
    setPreferredPlatform(detectPreferredPlatform())

    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchLatestVersion()
        if (!cancelled) {
          setLatest(data)
          setLoadError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Unable to load releases')
        }
      } finally {
        if (!cancelled) setLoadingLatest(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const cards = useMemo(() => {
    return downloads.map((item) => {
      const platform = item.id as ReleasePlatform
      const releaseFile = latest ? pickFileForPlatform(latest.files, platform) : undefined
      return {
        id: item.id,
        name: item.name,
        requirement: item.requirement,
        placeholderFile: item.file,
        platform,
        releaseFile,
      }
    })
  }, [latest])

  const handleDownload = useCallback(
    async (platform: ReleasePlatform, architecture?: ReleaseArchitecture) => {
      setActionError(null)
      setDownloadingId(platform)

      try {
        const payload = await fetchDownloadUrl({
          platform,
          ...(architecture ? { architecture } : {}),
        })

        const anchor = document.createElement('a')
        anchor.href = payload.downloadUrl
        anchor.rel = 'noopener'
        anchor.download = payload.fileName
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      } catch (err) {
        setActionError(
          err instanceof Error ? err.message : 'Download failed. Please try again.',
        )
      } finally {
        startTransition(() => setDownloadingId(null))
      }
    },
    [],
  )

  return (
    <SectionWrapper id="download" className="border-t border-border/60 bg-surface/40">
      <SectionHeading
        eyebrow="Download"
        title="Get EdaCleaner for your platform"
        description="Native installers for Windows, macOS, and Linux — same premium experience everywhere."
        className="mb-10"
      />

      {latest && (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Latest{' '}
          <span className="font-medium text-foreground">v{latest.version}</span>
          {latest.releaseType !== 'stable' ? (
            <span className="ml-2 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {latest.releaseType}
            </span>
          ) : null}
          {latest.releaseNotes?.length > 0 ? (
            <span className="mt-2 block text-xs">{latest.releaseNotes.join(' · ')}</span>
          ) : null}
        </p>
      )}

      {loadingLatest && (
        <p className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading latest installers…
        </p>
      )}

      {loadError && (
        <p className="mb-6 text-center text-sm text-amber-600 dark:text-amber-400">
          Couldn’t reach the release server. Showing platform placeholders — try again shortly.
        </p>
      )}

      {actionError && (
        <p className="mb-6 text-center text-sm text-red-600 dark:text-red-400">{actionError}</p>
      )}

      <MotionStagger className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
        {cards.map((item, i) => {
          const available = Boolean(item.releaseFile)
          const isPreferred = item.platform === preferredPlatform
          const busy = downloadingId === item.platform
          const label = item.releaseFile
            ? `${item.releaseFile.fileName ?? item.placeholderFile}${
                item.releaseFile.fileSize
                  ? ` · ${formatBytes(item.releaseFile.fileSize)}`
                  : ''
              }`
            : `${item.placeholderFile} · Coming soon`

          return (
            <MotionItem key={item.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-card',
                  (isPreferred || i === 0) && available && 'border-primary/35 shadow-glow',
                )}
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <PlatformIcon id={item.id} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.requirement}</p>
                <p className="mt-3 text-xs text-muted-foreground/80">{label}</p>

                <Button
                  variant={available && isPreferred ? 'glow' : 'outline'}
                  className="mt-6 w-full"
                  size="lg"
                  disabled={!available || busy || loadingLatest}
                  onClick={() => {
                    if (!item.releaseFile) return
                    void handleDownload(item.platform, item.releaseFile.architecture)
                  }}
                >
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Download strokeWidth={1.75} />
                  )}
                  {busy ? 'Preparing…' : available ? 'Download' : 'Coming soon'}
                </Button>
              </motion.div>
            </MotionItem>
          )
        })}
      </MotionStagger>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Secure temporary download links · Free plan included with every download
      </p>
    </SectionWrapper>
  )
}
