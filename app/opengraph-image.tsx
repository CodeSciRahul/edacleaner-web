import { ImageResponse } from 'next/og'

export const alt = 'EdaCleaner — Make Your PC Dramatically Faster'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: 'linear-gradient(145deg, #E8EEF7 0%, #F8FAFC 45%, #DBEAFE 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#2563EB',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 32, fontWeight: 650, color: '#0F172A' }}>EDA Cleaner</div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#0F172A',
            maxWidth: 900,
          }}
        >
          Your PC can become dramatically faster
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: '#55657A',
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          One-click Smart Scan · Cleanup · Performance · Windows, macOS & Linux
        </div>
      </div>
    ),
    { ...size },
  )
}
