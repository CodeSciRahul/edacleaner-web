const DEFAULT_API_BASE = 'http://localhost:5000/api/v1'

export function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE).replace(/\/$/, '')
}

export type ReleasePlatform = 'windows' | 'macos' | 'linux'
export type ReleaseArchitecture = 'x64' | 'arm64'

export interface LatestVersionFile {
  platform: ReleasePlatform
  architecture: ReleaseArchitecture
  installerType: string
  fileName?: string
  fileSize?: number
  checksum?: string
  latest?: boolean
}

export interface LatestVersion {
  version: string
  buildNumber: number
  releaseType: string
  releaseDate?: string
  releaseNotes: string[]
  files: LatestVersionFile[]
}

export interface DownloadPayload {
  version: string
  releaseType: string
  platform: ReleasePlatform
  architecture: ReleaseArchitecture
  installerType: string
  fileName: string
  fileSize: number
  checksum: string
  downloadUrl: string
  expiresIn: number
}

export type PlanSlug = 'free' | 'pro' | 'premium'
export type BillingInterval = 'month' | 'year'

export interface PublicPlan {
  id: string
  name: string
  slug: PlanSlug | string
  monthlyPrice: number
  currency: string
  billingInterval: BillingInterval | string
  features: string[]
  isTrialAvailable: boolean
  trialDays: number
  priceDisplay: number
  compareAtPriceDisplay: number | null
  discountPercent: number
  savingsDisplay: number | null
}

export interface GuestCheckoutResult {
  mode: 'checkout'
  sessionId: string
  url: string | null
  publishableKey?: string
  guest?: boolean
}

interface ApiSuccess<T> {
  success: boolean
  message?: string
  data: T
}

async function parseApiResponse<T>(res: Response): Promise<T> {
  const json = (await res.json()) as ApiSuccess<T> & { message?: string }

  if (!res.ok || !json.success) {
    throw new Error(json.message ?? `Request failed (${res.status})`)
  }

  return json.data
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  return parseApiResponse<T>(res)
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  return parseApiResponse<T>(res)
}

export function fetchLatestVersion(): Promise<LatestVersion> {
  return apiGet<LatestVersion>('/versions/latest')
}

export function fetchPlans(): Promise<PublicPlan[]> {
  return apiGet<PublicPlan[]>('/plans')
}

export function createGuestCheckout(planId: string): Promise<GuestCheckoutResult> {
  return apiPost<GuestCheckoutResult>('/subscription/guest-checkout', { planId })
}

/** Resolve active paid plan Mongo id for slug + billing cycle, then open Stripe Checkout. */
export async function startGuestCheckout(input: {
  slug: Exclude<PlanSlug, 'free'>
  billingInterval: BillingInterval
}): Promise<string> {
  const plans = await fetchPlans()
  const plan = plans.find(
    (p) => p.slug === input.slug && p.billingInterval === input.billingInterval,
  )

  if (!plan?.id) {
    throw new Error('Selected plan is unavailable')
  }

  const checkout = await createGuestCheckout(plan.id)
  const url = typeof checkout.url === 'string' ? checkout.url.trim() : ''

  if (!url || (!url.startsWith('https://') && !url.startsWith('http://'))) {
    throw new Error('Checkout redirect URL is missing')
  }

  return url
}

export function fetchDownloadUrl(input: {
  platform: ReleasePlatform
  architecture?: ReleaseArchitecture
  installerType?: string
}): Promise<DownloadPayload> {
  const params = new URLSearchParams({ platform: input.platform })
  if (input.architecture) params.set('architecture', input.architecture)
  if (input.installerType) params.set('installerType', input.installerType)
  return apiGet<DownloadPayload>(`/versions/latest/download?${params.toString()}`)
}

export function formatBytes(bytes?: number): string {
  if (bytes == null || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
