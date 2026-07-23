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

interface ApiSuccess<T> {
  success: boolean
  message?: string
  data: T
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  const json = (await res.json()) as ApiSuccess<T> & { message?: string }

  if (!res.ok || !json.success) {
    throw new Error(json.message ?? `Request failed (${res.status})`)
  }

  return json.data
}

export function fetchLatestVersion(): Promise<LatestVersion> {
  return apiGet<LatestVersion>('/versions/latest')
}

export function fetchDownloadUrl(input: {
  platform: ReleasePlatform
  architecture?: ReleaseArchitecture
}): Promise<DownloadPayload> {
  const params = new URLSearchParams({ platform: input.platform })
  if (input.architecture) params.set('architecture', input.architecture)
  return apiGet<DownloadPayload>(`/versions/latest/download?${params.toString()}`)
}

export function formatBytes(bytes?: number): string {
  if (bytes == null || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
